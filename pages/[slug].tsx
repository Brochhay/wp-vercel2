import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';

const Post = () => {
  const router = useRouter();
  const { slug } = router.query; // Get the slug from the URL
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!slug) return; // Don't fetch if there's no slug in the URL

    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://freshnew.online/wp-json/wp/v2/posts?slug=${slug}`);
        const data = await response.json();
        setPost(data[0]); // Assuming there is only one post for the slug
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (isLoading) {
    return <div>Loading...</div>; // Loading state
  }

  if (!post) {
    return <div>Post not found!</div>; // Error state if post is not found
  }

  return (
    <div className={`${styles.container} bg-gray-900 text-white min-h-screen`}>
      <Head>
        <title>{post.title.rendered}</title>
        <meta name="description" content={post.excerpt.rendered} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto p-6">
        {/* Featured Image */}
        {post.featured_media && post.featured_media_url && (
          <div className="mb-6">
            <Image
              src={post.featured_media_url}
              alt={post.title.rendered}
              width={800}
              height={450}
              className="rounded-md"
            />
          </div>
        )}

        <h1 className="text-4xl font-bold mb-4 text-yellow-400">{post.title.rendered}</h1>

        {/* Post Content */}
        <div
          className="prose text-gray-300"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        ></div>
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

export default Post;
