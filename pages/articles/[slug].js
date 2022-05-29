import React from "react";
import ArticleDetailLayout from "../../components/ArticleDetailLayout";
import Sidebar from "../../components/Sidebar";
import { client } from "../../graphql/connection";
import { GET_ALL_SLUGS, GET_SINGLE_POST } from "../../graphql/queries";

export async function getStaticPaths() {
  const { posts } = await client.request(GET_ALL_SLUGS);
  const paths = posts.map((post) => ({ params: { slug: post.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const data = await client.request(GET_SINGLE_POST, { slug });
  const article = data.post;
  return {
    props: {
      article,
    },
    revalidate: 600,
  };
}

const ArticleDetail = ({ article }) => {
  return (
    <main className="flex w-full flex-col lg:flex-row">
      <Sidebar />
      <ArticleDetailLayout
        title={article?.title}
        content={article?.content.html}
        published_at={article?.published_at}
        tags={article?.tags}
        thumbnail={article?.thumbnail.url}
      />
    </main>
  );
};

export default ArticleDetail;
