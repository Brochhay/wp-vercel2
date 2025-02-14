import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const router = useRouter();
  const wordpressAPIUrl = https://freshnew.online/wp-json/wp/v2/posts?page=${page}; // Add pagination to API URL

  useEffect(() => {
    fetch(wordpressAPIUrl)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error('Error fetching posts from WordPress:', err));
  }, [page]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleHomeClick = () => {
    router.push('/'); // Navigate to the home page
  };

  return (
    <div className={${styles.container} bg-gray-900 text-white min-h-screen}>
      <Head>
        <title>Animal</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleHomeClick}
            className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-300 transition duration-300"
          >
            Home
          </button>
          <h1 className="text-4xl font-bold text-center text-yellow-400">Latest Posts</h1>
          <button
            onClick={handleNextPage}
            className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-300 transition duration-300"
          >
            Next Page
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="border border-gray-700 rounded-lg p-4 shadow-lg hover:bg-gray-800 transition duration-300">
              {/* Featured Image */}
              {post.featured_media && (
                <div className="mb-4">
                  <Image
                    src={post.featured_media_url || '/default-thumbnail.jpg'}
                    alt={post.title.rendered}
                    width={500}
                    height={300}
                    className="rounded-md"
                  />
                </div>
              )}
              <h2 className="text-2xl font-semibold mb-2 text-yellow-300">{post.title.rendered}</h2>
              <p className="text-gray-400" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></p>
              <a href={/post/${post.slug}} className="text-blue-500 mt-2 block hover:text-blue-400 transition duration-200">Read More</a>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-gray-800 p-4 mt-12 text-center text-gray-400">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center space-x-2"
        >
          Powered by Chhay{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
