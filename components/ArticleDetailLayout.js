import Image from "next/image";
import React from "react";
import { MdWest } from "react-icons/md";
import Router from "next/router";
import Link from "next/link";
import parse from "html-react-parser";

const ArticleDetailLayout = ({
  content,
  title,
  published_at,
  thumbnail,
  tags,
}) => {
  const [data, setData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const [message, setMessage] = React.useState("");
  React.useEffect(() => {
    if (content) {
      setData(content);
      setIsLoading(false);
    } else {
      setMessage("No data found");
      setIsLoading(false);
    }
  }, [content]);
  return (
    <div className="flex flex-col items-center lg:ml-72 xl:ml-80 px-4 md:px-5 lg:p-8 w-full relative">
      <button
        className="absolute left-4 md:left-5 lg:left-8 top-2 lg:top-7 flex items-center justify-center lg:p-1.5 rounded lg:hover:bg-black text-black lg:hover:text-white lg:transition-all duration-200 text-2xl lg:text-xl"
        onClick={() => Router.back()}
      >
        <MdWest />
      </button>
      {isLoading && (
        <div className="text-center text-base w-100">Loading...</div>
      )}
      {data && data.length > 0 && (
        <div className="flex flex-col max-w-[960px]">
          <h1 className="text-center text-3xl lg:text-4xl mx-auto px-8">
            {title}
          </h1>
          <time className="text-center text-gray-500 text-base mt-4 mx-auto">
            {published_at}
          </time>
          <div className="my-6 lg:my-8 w-full">
            <Image
              src={
                thumbnail ||
                "https://media.graphassets.com/thCGLWqRYKIkb8DK4YjL"
              }
              className="rounded"
              title={title}
              alt={title}
              width={960}
              height={540}
            />
          </div>
          <article className="prose prose-slate max-w-none prose-base lg:prose-lg prose-img:rounded prose-headings:mb-4 w-full mt-2">
            {parse(data)}
          </article>
          {tags && tags.length > 0 && (
            <div className="flex items-center mt-10">
              <span className="text-lg text-black font-normal mr-2 mb-1.5">
                Tags :
              </span>
              <div className="flex flex-wrap">
                {tags.map((tag) => (
                  <Link href={`/tags/${tag.slug}`} key={tag.id}>
                    <a className="text-sm leading-none text-white whitespace-nowrap mr-1.5 mb-1.5 p-1.5 rounded bg-black lg:hover:underline first:ml-0">
                      #{tag.title}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {message && (
        <div className="text-center text-3xl w-100 mt-10 lg:mt-20">
          {message}
        </div>
      )}
    </div>
  );
};

export default ArticleDetailLayout;
