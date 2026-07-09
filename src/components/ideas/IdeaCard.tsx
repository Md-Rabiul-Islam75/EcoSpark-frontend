import Link from 'next/link';
import Image from 'next/image';

interface IdeaCardProps {
  idea: {
    id: string;
    title: string;
    slug: string;
    description: string;
    images?: string[];
    category: { name: string };
    author: { name: string };
    _count: { votes: number; comments: number };
    isPaid: boolean;
  };
}

export default function IdeaCard({ idea }: IdeaCardProps) {
  const imageUrl = idea.images?.[0] || 'https://via.placeholder.com/300x200';

  return (
    <Link href={`/idea/${idea.id}`}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden hover:scale-105 transform">
        <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
          <img
            src={imageUrl}
            alt={idea.title}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          {idea.isPaid && (
            <span className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-lg">
              💰 PAID
            </span>
          )}
        </div>

        <div className="p-6">
          <div className="mb-3 flex items-center justify-between">
            <span className="inline-block bg-gradient-to-r from-green-600 to-green-700 text-white text-xs px-3 py-1 rounded-full font-bold shadow-sm">
              🏷️ {idea.category.name}
            </span>
          </div>

          <h3 className="text-lg font-bold mb-2 line-clamp-2 text-gray-900 hover:text-green-700">{idea.title}</h3>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {idea.description}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100">
            <span className="font-medium">👤 {idea.author.name}</span>
            <div className="flex space-x-4 font-semibold text-gray-700">
              <span className="flex items-center gap-1">👍 {idea._count.votes}</span>
              <span className="flex items-center gap-1">💬 {idea._count.comments}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-end">
            <span className="text-green-600 font-bold text-lg">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
