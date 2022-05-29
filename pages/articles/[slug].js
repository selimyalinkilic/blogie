import React from "react";
import ArticleDetailLayout from "../../components/ArticleDetailLayout";
import Sidebar from "../../components/Sidebar";

const ArticleDetail = ({ article }) => {
  return (
    <div>
      <Sidebar />
      <ArticleDetailLayout
        content={article.html}
        title="Title"
        published_at="2022-01-01"
        thumbnail="https://media.graphassets.com/thCGLWqRYKIkb8DK4YjL"
      />
    </div>
  );
};

export default ArticleDetail;
