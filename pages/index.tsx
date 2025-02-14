import { useEffect, useState } from "react";

export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("/api/posts")
            .then((res) => res.json())
            .then((data) => setPosts(data))
            .catch((err) => console.error("Error fetching posts:", err));
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-6">Latest Posts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <div key={post.id} className="border rounded-lg p-4 shadow-lg">
                        <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                        <p className="text-gray-600">{post.excerpt}</p>
                        <a href={`/post/${post.slug}`} className="text-blue-500 mt-2 block">Read More</a>
                    </div>
                ))}
            </div>
        </div>
    );
}
