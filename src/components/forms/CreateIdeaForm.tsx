'use client';

import { useState } from 'react';
import { createIdea, submitIdea } from '@/lib/api';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface CreateIdeaFormProps {
  categories: any[];
  onSuccess: () => void;
}

export default function CreateIdeaForm({
  categories,
  onSuccess,
}: CreateIdeaFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    problemStatement: '',
    proposedSolution: '',
    description: '',
    categoryId: '',
    images: [] as string[],
    isPaid: false,
    price: '',
  });

  async function handleSubmit(e: React.FormEvent, submit: boolean = false) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const ideaData = {
        ...formData,
        images: formData.images || ['https://via.placeholder.com/600x400'],
        price: formData.isPaid ? parseFloat(formData.price) : null,
      };

      const response = await createIdea(ideaData);
      const responseData = response.data?.data || response.data;

      if (submit) {
        await submitIdea(responseData.id);
      }

      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create idea');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-6 bg-white p-6 rounded-lg shadow">
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <Input
        label="Idea Title"
        value={formData.title}
        onChange={(e) =>
          setFormData({ ...formData, title: e.target.value })
        }
        required
      />

      <div>
        <label className="mb-2 block font-medium text-gray-700">
          Category *
        </label>
        <select
          value={formData.categoryId}
          onChange={(e) =>
            setFormData({ ...formData, categoryId: e.target.value })
          }
          required
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block font-medium text-gray-700">
          Problem Statement *
        </label>
        <textarea
          value={formData.problemStatement}
          onChange={(e) =>
            setFormData({ ...formData, problemStatement: e.target.value })
          }
          required
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          rows={3}
        />
      </div>

      <div>
        <label className="mb-2 block font-medium text-gray-700">
          Proposed Solution *
        </label>
        <textarea
          value={formData.proposedSolution}
          onChange={(e) =>
            setFormData({ ...formData, proposedSolution: e.target.value })
          }
          required
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          rows={3}
        />
      </div>

      <div>
        <label className="mb-2 block font-medium text-gray-700">
          Detailed Description *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          rows={5}
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isPaid"
          checked={formData.isPaid}
          onChange={(e) =>
            setFormData({ ...formData, isPaid: e.target.checked })
          }
          className="mr-2"
        />
        <label htmlFor="isPaid" className="text-gray-700">
          Make this a paid idea
        </label>
      </div>

      {formData.isPaid && (
        <Input
          label="Price (USD)"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: e.target.value })
          }
          required
        />
      )}

      <div className="flex gap-4">
        <Button
          type="submit"
          onClick={(e) => handleSubmit(e, false)}
          disabled={loading}
          variant="outline"
        >
          Save as Draft
        </Button>
        <Button
          type="submit"
          onClick={(e) => handleSubmit(e, true)}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Submit for Review'}
        </Button>
      </div>
    </form>
  );
}
