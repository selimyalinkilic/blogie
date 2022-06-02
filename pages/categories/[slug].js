import React from "react";
import Sidebar from "../../components/Sidebar";
import { client } from "../../graphql/connection";
import ArticlesLayout from "../../components/ArticlesLayout";
import {
  GET_ALL_CATEGORY_SLUGS,
  GET_POSTS_BY_CATEGORY,
} from "../../graphql/queries";
export async function getStaticPaths() {
  const { categories } = await client.request(GET_ALL_CATEGORY_SLUGS);
  const paths = categories.map((category) => ({
    params: { slug: category.slug },
  }));
  return { paths, fallback: false };
}
export async function getStaticProps({ params }) {
  const slug = params.slug;
  const data = await client.request(GET_POSTS_BY_CATEGORY, {
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
export default function Categories({ posts, slug }) {
  const [category, setCategory] = React.useState(null);
  React.useEffect(() => {
    setCategory(slug_to_title(slug));
  }, [slug]);
  return (
    <main className="flex w-full flex-col lg:flex-row">
      <Sidebar />
      <ArticlesLayout title={category} hasFilter={false} content={posts} />
    </main>
  );
}
