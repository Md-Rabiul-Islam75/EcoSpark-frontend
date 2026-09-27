'use client';

import { useState } from 'react';
import { createIdea, submitIdea, uploadIdeaImage, uploadIdeaImageUrl } from '@/lib/api';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface CreateIdeaFormProps {
  categories: any[];
  onSuccess: (message: string) => void;
}

export default function CreateIdeaForm({
  categories,
  onSuccess,
}: CreateIdeaFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    problemStatement: '',
    proposedSolution: '',
    description: '',
    categoryId: '',
    imageUrl: '',
    isPaid: false,
    price: '',
  });

  async function handleSubmit(e: React.FormEvent, submit: boolean = false) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let imageUrl = formData.imageUrl.trim();
      if (imageFile) {
        const uploadResponse = await uploadIdeaImage(imageFile);
        const uploadData = uploadResponse.data?.data || uploadResponse.data;
        imageUrl = uploadData.url;
      } else if (imageUrl) {
        const uploadResponse = await uploadIdeaImageUrl(imageUrl);
        const uploadData = uploadResponse.data?.data || uploadResponse.data;
        imageUrl = uploadData.url;
      }

      const ideaData = {
        title: formData.title,
        problemStatement: formData.problemStatement,
        proposedSolution: formData.proposedSolution,
        description: formData.description,
        categoryId: formData.categoryId,
        images: imageUrl ? [imageUrl] : [],
        isPaid: formData.isPaid,
        status: 'DRAFT' as const,
        ...(formData.isPaid ? { price: parseFloat(formData.price) } : {}),
      };

      const response = await createIdea(ideaData);
      const responseData = response.data?.data || response.data;

      if (submit) {
        await submitIdea(responseData.id);
      }

      onSuccess(submit ? 'Idea submitted for review' : 'Idea saved as draft');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create idea');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-6 rounded-[28px] bg-white p-0">
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
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
          className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-[#4F7A5A] focus:ring-2 focus:ring-[#4F7A5A]/20"
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
          className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#4F7A5A] focus:ring-2 focus:ring-[#4F7A5A]/20"
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
          className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#4F7A5A] focus:ring-2 focus:ring-[#4F7A5A]/20"
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
          className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#4F7A5A] focus:ring-2 focus:ring-[#4F7A5A]/20"
          rows={5}
        />
      </div>

      <Input
        label="Cover Image URL (optional)"
        type="url"
        placeholder="https://example.com/your-idea-image.jpg"
        value={formData.imageUrl}
        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
      />

      <div>
        <label className="mb-2 block font-medium text-gray-700" htmlFor="cover-image">
          Or select a cover image (max 5 MB)
        </label>
        <input
          id="cover-image"
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          className="block w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm"
        />
        {imageFile && <p className="mt-2 text-sm text-gray-600">Selected: {imageFile.name}</p>}
      </div>

      <div className="rounded-2xl border border-[#E7ECE5] bg-[#F8FAF5] p-4">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="isPaid"
            checked={formData.isPaid}
            onChange={(e) =>
              setFormData({ ...formData, isPaid: e.target.checked })
            }
            className="mt-1 h-4 w-4 rounded border-gray-300 text-[#4F7A5A] focus:ring-[#4F7A5A]"
          />
          <label htmlFor="isPaid" className="text-gray-700">
            <span className="block font-semibold text-[#16281F]">Make this a paid idea</span>
            <span className="mt-1 block text-sm text-[#6B7A70]">Use this for premium ideas that require payment access.</span>
          </label>
        </div>
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

      <div className="flex flex-col gap-4 sm:flex-row">
        <Button
          type="submit"
          onClick={(e) => handleSubmit(e, false)}
          disabled={loading}
          variant="outline"
          className="rounded-2xl px-6 py-3"
        >
          Save as Draft
        </Button>
        <Button
          type="submit"
          onClick={(e) => handleSubmit(e, true)}
          disabled={loading}
          className="rounded-2xl px-6 py-3"
        >
          {loading ? 'Creating...' : 'Submit for Review'}
        </Button>
      </div>
    </form>
  );
}
