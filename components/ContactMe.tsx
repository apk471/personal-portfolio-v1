import Link from "next/link";
import React from "react";

function ContactMe() {
  return (
    <div className="flex flex-col gap-4 mb-20">
      <h1 className="text-2xl font-bold">Contact Me</h1>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Want to chat? Just email me directly at{" "}
        <Link
          href="mailto:ayushnamin@gmail.com"
          className="text-blue-500"
        >
          ayushnamin@gmail.com
        </Link>
      </p>
    </div>
  );
}

export default ContactMe;
