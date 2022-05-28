import React from "react";
import Card from "./Card";

const contentStyle = (contents, classList, newClassList) => {
  contents.forEach(() => {
    classList.forEach(() => {
      classList.reverse().forEach((classs) => {
        newClassList.push(classs);
      });
    });
  });
};

const ArticlesLayout = ({ title, hasFilter, content }) => {
  const [active, setActive] = React.useState(["newest"]);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [message, setMessage] = React.useState("");
  let classList = ["sm", "lg"];
  let newClassList = [];
  if (data) contentStyle(data, classList, newClassList);
  const handleClick = (e) => {
    const { id } = e.target;
    const isActive = active.includes(id);
    setActive(isActive ? active.filter((item) => item !== id) : [id]);
  };

  React.useEffect(() => {
    if (content) {
      setData(content);
      setLoading(false);
    } else {
      setMessage("No data found");
      setLoading(false);
    }
  }, [content]);

  return (
    <div className="flex flex-col items-center lg:items-start lg:ml-72 xl:ml-80 px-4 md:px-5 lg:p-8 w-full">
      <h2 className="text-3xl lg:text-4xl">{title || "-"}</h2>
      {hasFilter && data && data.length > 0 && (
        <div className="flex items-center mt-4 mt:md-5 lg:mt-6">
          <button
            className={`text-base text-black pb-1 border-b-2 ${
              active.includes("newest")
                ? "opacity-100 border-black"
                : "opacity-60 border-transparent"
            }`}
            onClick={handleClick}
            id="newest"
          >
            Newest
          </button>
          <span className="px-2 text-black opacity-50 text-base pb-1">-</span>
          <button
            className={`text-base text-black pb-1 border-b-2 ${
              active.includes("oldest")
                ? "opacity-100 border-black"
                : "opacity-60 border-transparent"
            }`}
            id="oldest"
            onClick={handleClick}
          >
            Oldest
          </button>
        </div>
      )}
      <div className="flex flex-wrap w-full justify-center mt-6 md:mt-8 lg:mt-12">
        {loading && <div className="text-center text-base">Loading...</div>}
        {data &&
          data.length > 0 &&
          data.map((item, index) => (
            <Card key={index} {...item} size={newClassList.pop()} />
          ))}
        {message && <h3 className="text-center text-3xl">{message}</h3>}
      </div>
    </div>
  );
};

export default ArticlesLayout;
