import axios from 'axios';
import { useEffect, useState } from 'react';
import BlogFeed from '@/components/blog-feed';
import PostCard from '@/components/post-card';
import Post from '@/types/post-type';
import { PostCardSkeleton } from '@/components/skeletons/post-card-skeleton';
import Header from '@/layouts/header-layout';

function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_PATH + '/api/posts')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-light dark:bg-dark">
      <Header />

      {/* Hero Section */}
      <section className="mx-4 mt-6 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-10 text-white md:mx-8 lg:mx-16">
        <h1 className="text-3xl font-bold">Explore Travel Stories ✈️</h1>
        <p className="mt-2 max-w-xl text-sm text-indigo-100">
          Real journeys, honest experiences, and guides from travelers around the world.
        </p>
      </section>

      {/* Content Section */}
      <main className="mx-4 mt-10 md:mx-8 lg:mx-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold dark:text-dark-primary">
            Latest Posts
          </h2>
        </div>

        <BlogFeed />

        {/* Posts Grid */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.length === 0
            ? Array(6)
                .fill(0)
                .map((_, index) => <PostCardSkeleton key={index} />)
            : posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
        </div>
      </main>
    </div>
  );
}

export default HomePage;
