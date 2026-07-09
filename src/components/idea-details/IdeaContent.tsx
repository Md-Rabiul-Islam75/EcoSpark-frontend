interface IdeaContentProps {
  idea: {
    title: string;
    problemStatement: string;
    proposedSolution: string;
    description: string;
    images: string[];
  };
}

export default function IdeaContent({ idea }: IdeaContentProps) {
  return (
    <div className="space-y-8">
      {idea.images && idea.images.length > 0 && (
        <div className="h-96 bg-gray-200 rounded-lg overflow-hidden">
          <img
            src={idea.images[0]}
            alt={idea.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <section>
        <h2 className="text-2xl font-bold mb-4">The Problem</h2>
        <p className="text-gray-700 leading-relaxed">{idea.problemStatement}</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">The Solution</h2>
        <p className="text-gray-700 leading-relaxed">{idea.proposedSolution}</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Details</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{idea.description}</p>
      </section>

      {idea.images && idea.images.length > 1 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Gallery</h2>
          <div className="grid grid-cols-2 gap-4">
            {idea.images.slice(1).map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Gallery ${idx}`}
                className="rounded-lg h-64 object-cover"
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
