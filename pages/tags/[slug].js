import React from "react";
import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import { client } from "../../graphql/connection";
import ArticlesLayout from "../../components/ArticlesLayout";
import { GET_ALL_TAG_SLUGS, GET_POSTS_BY_TAG } from "../../graphql/queries";
export async function getStaticPaths() {
  const { tags } = await client.request(GET_ALL_TAG_SLUGS);
  const paths = tags.map((tag) => ({
    params: { slug: tag.slug },
  }));
  return { paths, fallback: false };
}
export async function getStaticProps({ params }) {
  const slug = params.slug;
  const data = await client.request(GET_POSTS_BY_TAG, {
    slug,
  });
  const posts = data.posts;
  return {
    props: {
      posts,
      slug,
    },
    revalidate: 600,
  };
}
const slug_to_title = (slug) => {
  return slug.replace(/-/g, " ").replace();
};
export default function Tags({ posts, slug }) {
  const [tag, setTag] = React.useState(null);
  React.useEffect(() => {
    setTag(slug_to_title(slug));
  }, [slug]);
  return (
    <main className="flex w-full flex-col lg:flex-row">
      <Sidebar />
      <ArticlesLayout title={tag} hasFilter={false} content={posts} />
    </main>
  );
}
