import React from "react";
import Link from "next/link";

const Page404 = () => (
  <div className="nc-Page404">
    <div className="container relative pt-5 pb-16 lg:pb-20 lg:pt-5">
      {/* HEADER */}
      <header className="text-center max-w-2xl mx-auto space-y-2">
        <img
          src={"/not-found.png"}
          alt="not-found"
          className=" border-4 border-black"
        />
        <span className="block text-sm text-neutral-800 sm:text-base dark:text-neutral-200 tracking-wider font-medium">
          {`THE PAGE YOU WERE LOOKING FOR DOESN'T EXIST.`}{" "}
        </span>
        <div className="pt-8">
          <Link href="/">
            <button>Return Home Page</button>
          </Link>
        </div>
      </header>
    </div>
  </div>
);

export default Page404;
