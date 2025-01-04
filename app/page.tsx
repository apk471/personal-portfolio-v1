import dynamic from "next/dynamic";
import Intro from "@/components/Intro";
import { CustomDock } from "@/components/CustomDock";
import WorkExperience from "@/components/WorkExperience";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Videos from "@/components/Videos";
import ContactMe from "@/components/ContactMe";
import ContactForm from "@/components/ContactForm";

const Meteors = dynamic(() => import("@/components/magicui/meteors"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="relative mx-auto flex min-h-screen flex-col gap-8 overflow-hidden p-10 sm:w-full md:gap-12 md:p-24 lg:w-7/12">
      <div className="light-mode-fade-bottom dark:fade-bottom pointer-events-none fixed inset-0 z-10 bg-white/10 dark:bg-black/10" />
      <CustomDock />

      <Intro />
      <WorkExperience />
      <Education />
      <Skills />
      <Projects />
      <ContactForm />
      <Meteors number={20} />
    </main>
  );
}
