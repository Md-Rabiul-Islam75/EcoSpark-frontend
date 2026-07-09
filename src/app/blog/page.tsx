'use client';

import { useEffect, useState } from 'react';
import BlogCard from '@/components/blog/BlogCard';
import Pagination from '@/components/ui/Pagination';
import Loading from '@/components/ui/Loading';
import { getPosts } from '@/lib/api';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchPosts();
  }, [page]);

  async function fetchPosts() {
    setLoading(true);
    try {
      const response = await getPosts(page, 10);
      const responseData = response.data?.data || response.data;
      setPosts(responseData.data || responseData);
      setTotal(responseData.pagination?.total || 0);
    } catch (error) {
      console.error('Failed to fetch blog posts:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>

      {loading ? (
        <Loading />
      ) : posts.length > 0 ? (
        <>
          <div className="space-y-6">
            {posts.map((post: any) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {total > 10 && (
            <Pagination
              currentPage={page}
              totalPages={Math.ceil(total / 10)}
              onPageChange={setPage}
            />
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No blog posts yet.</p>
        </div>
      )}
    </div>
  );
}
