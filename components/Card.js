import Link from "next/link";
import React from "react";

const Card = ({ size, title, slug, date, summary }) => {
  return (
    <article
      className={`flex mb-4 mb-md-5 lg:mb-6 xl:mb-8 w-full ${
        size === "sm" ? "xl:w-5/12" : "xl:w-7/12"
      } even:xl:pl-4 odd:xl:pr-4`}
    >
      <div className="border border-solid border-black p-4 md:p-5 lg:p-6 xl:p-8 bg-white flex-1 rounded">
        <h2
          className="text-center mb-4 text-lg lg:text-2xl line-clamp-1"
          title={title}
        >
          <Link href={`/post/${slug}`}>
            <a>{title}</a>
          </Link>
        </h2>
        <div className="flex justify-center items-center mb-4">
          <div className="bg-black flex w-6 h-px"></div>
          <div className="px-4">
            <time className="text-center text-sm">{date}</time>
          </div>
          <div className="bg-black flex w-6 h-px"></div>
        </div>
        <div className="mb-4 xl:min-h-[72px] xl:max-h-[72px]">
          <p className="text-sm lg:text-base text-gray-500 line-clamp-3">
            {summary}
          </p>
        </div>
        <div className="flex justify-center">
          <Link href={`/post/${slug}`}>
            <a className="text-white bg-black font-bold text-sm lg:text-base py-2 px-4 lg:py-3 lg:px-5 rounded">
              Read more
            </a>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default Card;
