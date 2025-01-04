import Image from "next/image";
import ProfilePic from "@/app/images/ayush.png";

export default function Intro() {
  return (
    <div className="-z-10 flex w-full flex-col-reverse items-center justify-between gap-14 lg:flex-row">
      <div className="flex w-full flex-col gap-2 lg:w-4/5">
        <h1 className="mb-4 text-4xl font-bold">Hi! I&apos;m Ayush Amin.</h1>
        <p className="text-base text-gray-800 dark:text-gray-300">
          A diligent and dedicated individual, I am currently pursuing a B.Tech
          degree with a major in Computer Science at VIT University&apos;s Vellore
          campus. My focus lies in enhancing my technical skills, particularly
          in Java, Python, Data Structures and Algorithms, Web Development ,
          Generative AI.
        </p>
      </div>
      <div className="flex items-center justify-center md:mb-0">
        <Image
          src={ProfilePic}
          alt="Ayush"
          width={160}
          height={160}
          className="rounded-full border-2 border-gray-100 object-cover"
        />
      </div>
    </div>
  );
}
