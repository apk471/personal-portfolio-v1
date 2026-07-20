import dynamic from "next/dynamic";
import Intro from "@/components/Intro";
import { CustomDock } from "@/components/CustomDock";
import WorkExperience from "@/components/WorkExperience";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import ContributionGraph from "@/components/github/ContributionGraph";
import PinnedRepos from "@/components/github/PinnedRepos";
import CurrentlyWorking from "@/components/github/CurrentlyWorking";
import GitHubStats from "@/components/github/GitHubStats";
import Organizations from "@/components/github/Organizations";
import ContactForm from "@/components/ContactForm";
import { getGitHubData } from "@/lib/github";

const Meteors = dynamic(() => import("@/components/magicui/meteors"), {
  ssr: false,
});

// Regenerate the page (and its GitHub data) at most once per hour.
export const revalidate = 3600;

export default async function Home() {
  const github = await getGitHubData();

  return (
    <main className="relative mx-auto flex min-h-screen flex-col gap-8 overflow-hidden p-10 sm:w-full md:gap-12 md:p-24 lg:w-7/12">
      <div className="light-mode-fade-bottom dark:fade-bottom pointer-events-none fixed inset-0 z-10 bg-white/10 dark:bg-black/10" />
      <CustomDock />

      <Intro />
      <WorkExperience />
      <Education />
      <Skills />
      <ContributionGraph data={github.contributions} />
      <GitHubStats
        profile={github.profile}
        topLanguages={github.topLanguages}
        events={github.events}
      />
      <Organizations organizations={github.organizations} />
      <PinnedRepos repos={github.pinned} />
      <CurrentlyWorking repos={github.recent} />
      <ContactForm />
      {/* <Meteors number={20} /> */}
    </main>
  );
}
