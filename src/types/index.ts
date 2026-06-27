export type Role = 'MEMBER' | 'ADMIN';
export type IdeaStatus = 'DRAFT' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  profileImage?: string | null;
  bio?: string | null;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  _count?: { ideas: number };
};

export type Idea = {
  id: string;
  title: string;
  slug: string;
  problemStatement: string;
  proposedSolution: string;
  description: string;
  images: string[];
  status: IdeaStatus;
  visibility: 'FREE' | 'PAID';
  isPaid: boolean;
  price?: string | number | null;
  feedback?: string | null;
  isUnlocked?: boolean;
  voteCount?: number;
  createdAt: string;
  updatedAt: string;
  author: { id: string; name: string; email?: string; profileImage?: string | null };
  category: { id: string; name: string; slug: string };
  _count?: { votes: number; comments: number; payments?: number };
};

export type PaginatedResponse<T> = {
  items: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
};
