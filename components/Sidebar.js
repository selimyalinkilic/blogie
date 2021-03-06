import { useState, useEffect } from "react";
import Link from "next/link";
import { MdSearch, MdBookmark, MdMenu, MdClose } from "react-icons/md";
import { ImLinkedin, ImTwitter, ImInstagram } from "react-icons/im";
import { GET_ALL_CATEGORIES, GET_ALL_TAGS } from "../graphql/queries";
import { client } from "../graphql/connection";
const fetchCategories = async () => {
  const { categories } = await client.request(GET_ALL_CATEGORIES);
  return categories;
};
const fetchTags = async ($orderBy, $limit) => {
  const { tags } = await client.request(GET_ALL_TAGS, {
    orderBy: $orderBy,
    limit: $limit,
  });
  return tags;
};
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tags, setTags] = useState([]);
  const [isTagsLoading, setIsTagsLoading] = useState(true);
  const [isTagsOrderBy, setIsTagsOrderBy] = useState("published_at_DESC");
  const [isTagsLimit, setIsTagsLimit] = useState(10);
  const toggle = () => setIsOpen(!isOpen);
  useEffect(() => {
    fetchCategories()
      .then((categories) => {
        setCategories(categories);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
    fetchTags(isTagsOrderBy, isTagsLimit)
      .then((tags) => {
        setTags(tags);
        setIsTagsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsTagsLoading(false);
      });
  }, [isTagsOrderBy, isTagsLimit]);
  return (
    <div className="w-full lg:w-auto">
      <div className="p-4 md:p-5 flex w-full flex justify-between items-center lg:hidden">
        <button
          className="flex items-center justify-center p-2 lg:p-0 bg-black text-white text-2xl rounded"
          onClick={toggle}
        >
          <MdMenu />
        </button>
        <Link href="/">
          <a className="bg-black p-2 rounded flex items-center justify-center text-white text-2xl">
            <MdBookmark />
          </a>
        </Link>
      </div>
      <div
        className={`w-72 xl:w-80 h-screen bg-white fixed shadow-lg top-0 transition-all duration-200 lg:transition-none ${
          isOpen ? "left-0" : "-left-72 lg:left-0"
        }`}
      >
        <div className="p-4 md:p-5 lg:p-6">
          <div className="flex items-center justify-between">
            <Link href="/">
              <a className="bg-black p-2 rounded hidden lg:flex items-center justify-center text-white text-2xl">
                <MdBookmark />
              </a>
            </Link>
            <button
              type="button"
              className="flex items-center justify-center lg:p-1.5 rounded lg:hover:bg-black text-black lg:hover:text-white lg:transition-all duration-200 text-2xl lg:text-xl"
            >
              <MdSearch />
            </button>
            <button
              type="button"
              className="flex items-center lg:hidden justify-center text-black text-2xl"
              onClick={toggle}
            >
              <MdClose />
            </button>
          </div>
        </div>
        <div className="px-4 md:px-5 lg:px-6">
          <hr className="border-gray-400" />
        </div>
        <div className="p-4 md:p-5 lg:p-4">
          <div className="flex flex-col max-h-64 overflow-y-auto no-scrollbar">
            {isLoading && (
              <div className="text-center text-gray-500">Loading...</div>
            )}
            {!isLoading &&
              categories.map((category) => (
                <Link href={`/categories/${category.slug}`} key={category.id}>
                  <a className="rounded lg:hover:bg-black text-black lg:hover:text-white lg:transition-all duration-200 text-lg lg:p-2">
                    {category.title}
                  </a>
                </Link>
              ))}
          </div>
        </div>
        <div className="px-4 md:px-5 lg:px-6">
          <hr className="border-gray-400" />
        </div>
        <div className="p-4 md:p-5 lg:p-6">
          <div className="flex flex-wrap max-h-72 overflow-y-auto no-scrollbar">
            {isTagsLoading && (
              <div className="text-center text-gray-500">Loading...</div>
            )}
            {!isTagsLoading &&
              tags.map((tag) => (
                <Link href={`/tags/${tag.slug}`} key={tag.id}>
                  <a className="text-xs leading-none text-white whitespace-nowrap mr-1.5 mb-1.5 p-1.5 rounded bg-black lg:hover:underline">
                    #{tag.title}
                  </a>
                </Link>
              ))}
          </div>
        </div>
        <div className="px-6 py-6 absolute bottom-0 left-0 flex items-center justify-center w-full">
          <Link href="/">
            <a className="text-xl mr-3 text-black" target="_blank">
              <ImLinkedin />
            </a>
          </Link>
          <Link href="/">
            <a className="text-xl mr-3 text-black" target="_blank">
              <ImTwitter />
            </a>
          </Link>
          <Link href="/">
            <a className="text-xl mr-3 text-black" target="_blank">
              <ImInstagram />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
