// GitHub data layer — server-side only.
// Fetches contribution calendar, pinned repos, recently-pushed repos, profile
// stats (one GraphQL call) and the public activity feed (REST). All fetchers
// fail soft: on any error they return null so the UI can fall back gracefully.
//
// Requires a GITHUB_TOKEN env var. For orgs + private contribution counts the
// token needs `repo`, `read:org` and `read:user` scopes (and "Include private
// contributions on my profile" enabled). Falls back gracefully with less.
// The token is only ever read on the server.

// Default profile handle; override with the GITHUB_USERNAME env var if needed.
export const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "ayush-amin";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GRAPHQL_ENDPOINT = "https://api.github.com/graphql";
const REST_BASE = "https://api.github.com";
// Revalidate every hour so GitHub is hit at most once/hour, not per visitor.
const REVALIDATE_SECONDS = 3600;
// Bound each outbound request so a network stall can't block render/ISR.
const REQUEST_TIMEOUT_MS = 10_000;

export interface ContributionDay {
  date: string;
  count: number;
  weekday: number;
}

export interface ContributionWeek {
  days: ContributionDay[];
}

export interface ContributionData {
  total: number;
  year: number;
  weeks: ContributionWeek[];
}

export interface LanguageSlice {
  name: string;
  color: string | null;
  size: number;
}

export interface Repo {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  primaryLanguage: { name: string; color: string | null } | null;
  forkCount: number;
  topics: string[];
  languages: LanguageSlice[];
  pushedAt?: string;
}

export interface ProfileStats {
  name: string | null;
  login: string;
  avatarUrl: string;
  bio: string | null;
  followers: number;
  following: number;
  publicRepos: number;
  totalContributions: number;
  totalCommits: number;
  totalPullRequests: number;
  // Private contributions folded into the calendar total (requires `repo` scope
  // + "Include private contributions"). 0 when the token can't see them.
  privateContributions: number;
}

export interface Organization {
  login: string;
  name: string | null;
  avatarUrl: string;
  url: string;
}

export interface ActivityEvent {
  id: string;
  type: string;
  repo: string;
  repoUrl: string;
  createdAt: string;
  detail: string;
}

export interface GitHubData {
  profile: ProfileStats | null;
  contributions: ContributionData | null;
  pinned: Repo[];
  recent: Repo[];
  events: ActivityEvent[];
  topLanguages: LanguageSlice[];
  organizations: Organization[];
}

const PROFILE_QUERY = /* GraphQL */ `
  query ($login: String!, $from: DateTime) {
    user(login: $login) {
      name
      login
      avatarUrl
      bio
      followers { totalCount }
      following { totalCount }
      repositories(privacy: PUBLIC) { totalCount }
      organizations(first: 12) {
        nodes {
          login
          name
          avatarUrl
          url
        }
      }
      contributionsCollection {
        totalCommitContributions
        totalPullRequestContributions
        restrictedContributionsCount
      }
      calendar: contributionsCollection(from: $from) {
        restrictedContributionsCount
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              weekday
            }
          }
        }
      }
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            homepageUrl
            forkCount
            primaryLanguage { name color }
            repositoryTopics(first: 6) { nodes { topic { name } } }
            languages(first: 6, orderBy: { field: SIZE, direction: DESC }) {
              edges { size node { name color } }
            }
          }
        }
      }
      recentRepos: repositories(
        first: 6
        privacy: PUBLIC
        isFork: false
        orderBy: { field: PUSHED_AT, direction: DESC }
      ) {
        nodes {
          name
          description
          url
          homepageUrl
          forkCount
          pushedAt
          primaryLanguage { name color }
          repositoryTopics(first: 6) { nodes { topic { name } } }
          languages(first: 6, orderBy: { field: SIZE, direction: DESC }) {
            edges { size node { name color } }
          }
        }
      }
    }
  }
`;

function mapRepo(node: any): Repo {
  return {
    name: node.name,
    description: node.description ?? null,
    url: node.url,
    homepageUrl: node.homepageUrl || null,
    forkCount: node.forkCount ?? 0,
    primaryLanguage: node.primaryLanguage
      ? { name: node.primaryLanguage.name, color: node.primaryLanguage.color }
      : null,
    topics:
      node.repositoryTopics?.nodes?.map((n: any) => n.topic.name).filter(Boolean) ??
      [],
    languages:
      node.languages?.edges?.map((e: any) => ({
        name: e.node.name,
        color: e.node.color ?? null,
        size: e.size ?? 0,
      })) ?? [],
    pushedAt: node.pushedAt,
  };
}

function aggregateLanguages(repos: Repo[]): LanguageSlice[] {
  // Pinned and recent lists can overlap; dedupe by repo URL so a repo in both
  // doesn't double-count its language bytes and skew the breakdown.
  const seen = new Set<string>();
  const uniqueRepos = repos.filter((repo) => {
    if (seen.has(repo.url)) return false;
    seen.add(repo.url);
    return true;
  });

  const totals = new Map<string, { color: string | null; size: number }>();
  for (const repo of uniqueRepos) {
    for (const lang of repo.languages) {
      const existing = totals.get(lang.name);
      if (existing) {
        existing.size += lang.size;
      } else {
        totals.set(lang.name, { color: lang.color, size: lang.size });
      }
    }
  }
  return Array.from(totals.entries())
    .map(([name, v]) => ({ name, color: v.color, size: v.size }))
    .sort((a, b) => b.size - a.size)
    .slice(0, 6);
}

async function fetchProfileGraphQL(): Promise<{
  profile: ProfileStats | null;
  contributions: ContributionData | null;
  pinned: Repo[];
  recent: Repo[];
  organizations: Organization[];
}> {
  if (!GITHUB_TOKEN) {
    return {
      profile: null,
      contributions: null,
      pinned: [],
      recent: [],
      organizations: [],
    };
  }
  try {
    const res = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: PROFILE_QUERY,
        variables: {
          login: GITHUB_USERNAME,
          // Scope the contribution calendar to the current calendar year
          // (Jan 1 → now) instead of GitHub's default rolling 12 months.
          from: new Date(
            Date.UTC(new Date().getUTCFullYear(), 0, 1)
          ).toISOString(),
        },
      }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok)
      return { profile: null, contributions: null, pinned: [], recent: [], organizations: [] };

    const json = await res.json();
    const user = json?.data?.user;
    if (!user)
      return { profile: null, contributions: null, pinned: [], recent: [], organizations: [] };

    const cc = user.contributionsCollection;
    const cal = user.calendar?.contributionCalendar;

    const profile: ProfileStats = {
      name: user.name ?? null,
      login: user.login,
      avatarUrl: user.avatarUrl,
      bio: user.bio ?? null,
      followers: user.followers?.totalCount ?? 0,
      following: user.following?.totalCount ?? 0,
      publicRepos: user.repositories?.totalCount ?? 0,
      totalContributions: cal?.totalContributions ?? 0,
      totalCommits: cc?.totalCommitContributions ?? 0,
      totalPullRequests: cc?.totalPullRequestContributions ?? 0,
      privateContributions: user.calendar?.restrictedContributionsCount ?? 0,
    };

    const organizations: Organization[] = (user.organizations?.nodes ?? []).map(
      (o: any) => ({
        login: o.login,
        name: o.name ?? null,
        avatarUrl: o.avatarUrl,
        url: o.url,
      })
    );

    const contributions: ContributionData | null = cal
      ? {
          total: cal.totalContributions ?? 0,
          year: new Date().getUTCFullYear(),
          weeks: (cal.weeks ?? []).map((w: any) => ({
            days: (w.contributionDays ?? []).map((d: any) => ({
              date: d.date,
              count: d.contributionCount ?? 0,
              weekday: d.weekday ?? 0,
            })),
          })),
        }
      : null;

    const pinned: Repo[] = (user.pinnedItems?.nodes ?? []).map(mapRepo);
    const recent: Repo[] = (user.recentRepos?.nodes ?? []).map(mapRepo);

    return { profile, contributions, pinned, recent, organizations };
  } catch {
    return { profile: null, contributions: null, pinned: [], recent: [], organizations: [] };
  }
}

function describeEvent(event: any): ActivityEvent | null {
  const repo = event?.repo?.name ?? "";
  const repoUrl = repo ? `https://github.com/${repo}` : "";
  const base = {
    id: event.id,
    type: event.type,
    repo,
    repoUrl,
    createdAt: event.created_at,
  };
  switch (event.type) {
    case "PushEvent": {
      const commits = event.payload?.commits?.length ?? event.payload?.size ?? 0;
      return {
        ...base,
        detail: `Pushed ${commits} commit${commits === 1 ? "" : "s"}`,
      };
    }
    case "PullRequestEvent": {
      const action = event.payload?.action ?? "updated";
      const merged = event.payload?.pull_request?.merged;
      return {
        ...base,
        detail: merged ? "Merged a pull request" : `${action} a pull request`,
      };
    }
    case "CreateEvent": {
      const refType = event.payload?.ref_type ?? "repository";
      return { ...base, detail: `Created ${refType}` };
    }
    case "IssuesEvent":
      return { ...base, detail: `${event.payload?.action ?? "updated"} an issue` };
    case "ReleaseEvent":
      return { ...base, detail: "Published a release" };
    case "ForkEvent":
      return { ...base, detail: "Forked a repository" };
    case "WatchEvent":
      return null; // starring — intentionally skipped
    default:
      return null;
  }
}

async function fetchEvents(): Promise<ActivityEvent[]> {
  try {
    const res = await fetch(
      `${REST_BASE}/users/${GITHUB_USERNAME}/events/public?per_page=30`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
        },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
        next: { revalidate: REVALIDATE_SECONDS },
      }
    );
    if (!res.ok) return [];
    const events = await res.json();
    if (!Array.isArray(events)) return [];
    return events
      .map(describeEvent)
      .filter((e): e is ActivityEvent => e !== null)
      .slice(0, 8);
  } catch {
    return [];
  }
}

export async function getGitHubData(): Promise<GitHubData> {
  const [graph, events] = await Promise.all([
    fetchProfileGraphQL(),
    fetchEvents(),
  ]);

  const topLanguages = aggregateLanguages([...graph.pinned, ...graph.recent]);

  return {
    profile: graph.profile,
    contributions: graph.contributions,
    pinned: graph.pinned,
    recent: graph.recent,
    events,
    topLanguages,
    organizations: graph.organizations,
  };
}
