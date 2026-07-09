import Link from 'next/link';

interface BlogCardProps {
  post: {
    id: string;
    title: string;
    slug: string;
    content: string;
    coverImage?: string;
    author: { name: string };
    createdAt: string;
  };
}

export default function BlogCard({ post }: BlogCardProps) {
  const excerpt = post.content
    .replace(/<[^>]*>/g, '')
    .substring(0, 200)
    .concat('...');
  const date = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
        {post.coverImage && (
          <div className="h-48 bg-gray-200 overflow-hidden">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>

          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{excerpt}</p>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>by {post.author.name}</span>
            <span>{date}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
