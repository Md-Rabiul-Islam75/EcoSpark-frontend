'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { getComments, createComment } from '@/lib/api';
import Button from '@/components/ui/Button';

interface CommentSectionProps {
  ideaId: string;
}

export default function CommentSection({ ideaId }: CommentSectionProps) {
  const { isAuthenticated } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [ideaId]);

  async function fetchComments() {
    try {
      const response = await getComments(ideaId, 1, 10);
      const responseData = response.data?.data || response.data;
      setComments(responseData.data || responseData);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  }

  async function handleCommentSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }

    if (!newComment.trim()) return;

    setLoading(true);
    try {
      await createComment(ideaId, newComment);
      setNewComment('');
      await fetchComments();
    } catch (error) {
      console.error('Failed to create comment:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-12 bg-white rounded-lg shadow p-6">
      <h3 className="text-2xl font-bold mb-6">Comments</h3>

      {isAuthenticated ? (
        <form onSubmit={handleCommentSubmit} className="mb-8">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-3"
            rows={4}
          />
          <Button type="submit" disabled={loading || !newComment.trim()}>
            {loading ? 'Posting...' : 'Post Comment'}
          </Button>
        </form>
      ) : (
        <p className="mb-4 text-gray-600">
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
          {' '}to comment.
        </p>
      )}

      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment: any) => (
            <div key={comment.id} className="border-l-4 border-green-600 pl-4 py-2">
              <div className="font-semibold text-gray-800">{comment.author.name}</div>
              <p className="text-gray-600 text-sm">
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mt-2">{comment.content}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">No comments yet. Be the first!</p>
        )}
      </div>
    </section>
  );
}
