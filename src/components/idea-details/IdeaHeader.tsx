interface IdeaHeaderProps {
  idea: {
    title: string;
    category: { name: string };
    author: { name: string };
    createdAt: string;
    isPaid: boolean;
    status: string;
  };
}

export default function IdeaHeader({ idea }: IdeaHeaderProps) {
  const date = new Date(idea.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="border-b pb-6">
      <div className="flex items-center justify-between mb-4">
        <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
          {idea.category.name}
        </span>
        {idea.isPaid && (
          <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
            💰 Paid Idea
          </span>
        )}
      </div>

      <h1 className="text-4xl font-bold mb-4">{idea.title}</h1>

      <div className="flex items-center text-gray-600 text-sm">
        <span>By <strong>{idea.author.name}</strong></span>
        <span className="mx-2">•</span>
        <span>{date}</span>
        <span className="mx-2">•</span>
        <span className="inline-block bg-gray-200 px-2 py-1 rounded">
          {idea.status}
        </span>
      </div>
    </div>
  );
}
