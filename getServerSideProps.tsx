import { GetServerSideProps } from 'next';

const Home = ({ posts }) => {
  return (
    <div>
      <h1>All Posts</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title.rendered}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </div>
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('https://freshnew.online/wp-json/wp/v2/posts');
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
};

export default Home;
