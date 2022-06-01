import Sidebar from "../components/Sidebar";
import { client } from "../graphql/connection";
import { GET_ALL_POSTS } from "../graphql/queries";
import ArticlesLayout from "../components/ArticlesLayout";

export async function getStaticProps() {
  const { posts } = await client.request(GET_ALL_POSTS);

  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
}

export default function Home({ posts }) {
  return (
    <main className="flex w-full flex-col lg:flex-row">
      <Sidebar />
      <ArticlesLayout title="Tüm Yazılar" hasFilter={false} content={posts} />
    </main>
  );
}
