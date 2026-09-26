import axios from 'axios';
import { API_BASE_URL } from './constants';
import { tokenStorage } from './storage';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = tokenStorage.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = tokenStorage.getRefreshToken();
      if (refreshToken) {
        try {
          const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, { refreshToken });
          tokenStorage.setAccessToken(data.data.accessToken);
          tokenStorage.setRefreshToken(data.data.refreshToken);
          originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;
          return api(originalRequest);
        } catch {
          tokenStorage.clearAll();
        }
      }
    }
    return Promise.reject(error);
  },
);

// Auth APIs
export const register = (data: any) => api.post('/auth/register', data);
export const login = (email: string, password: string) =>
  api.post('/auth/login', { email, password });
export const logout = () => api.post('/auth/logout');
export const refreshToken = (token: string) =>
  api.post('/auth/refresh-token', { refreshToken: token });

// User APIs
export const getUser = () => api.get('/users/profile');
export const updateProfile = (data: any) => api.patch('/users/profile', data);
export const getUserStats = () => api.get('/users/stats');

// Idea APIs
export const getApprovedIdeas = (page: number = 1, limit: number = 12, filters?: any) =>
  api.get('/ideas', {
    params: {
      page,
      limit,
      ...filters,
    },
  });

export const getIdea = (ideaId: string) => api.get(`/ideas/${ideaId}`);
export const createIdea = (data: any) => api.post('/ideas', data);
export const uploadIdeaImage = (file: File) => {
  const formData = new FormData();
  formData.append('image', file);
  return api.post('/ideas/upload', formData);
};
export const updateIdea = (ideaId: string, data: any) => api.patch(`/ideas/${ideaId}`, data);
export const deleteIdea = (ideaId: string) => api.delete(`/ideas/${ideaId}`);
export const submitIdea = (ideaId: string) => api.patch(`/ideas/${ideaId}/submit`);
export const getUserIdeas = (page: number = 1, limit: number = 10) =>
  api.get('/ideas/user', { params: { page, limit } });

// Category APIs
export const getCategories = () => api.get('/categories');
export const createCategory = (data: { name: string; description?: string }) =>
  api.post('/categories', data);
export const updateCategory = (categoryId: string, data: { name?: string; description?: string }) =>
  api.patch(`/categories/${categoryId}`, data);
export const deleteCategory = (categoryId: string) => api.delete(`/categories/${categoryId}`);
export const getCategory = (slug: string, page: number = 1, limit: number = 12) =>
  api.get(`/categories/${slug}`, { params: { page, limit } });

// Vote APIs
export const voteIdea = (ideaId: string, voteType: 'UP' | 'DOWN') =>
  api.post(`/ideas/${ideaId}/votes`, { type: voteType });
export const getVotes = (ideaId: string) => api.get(`/ideas/${ideaId}/votes`);

// Comment APIs
export const createComment = (ideaId: string, content: string, parentId?: string) =>
  api.post(`/ideas/${ideaId}/comments`, { content, parentId });
export const getComments = (ideaId: string, page: number = 1, limit: number = 10) =>
  api.get(`/ideas/${ideaId}/comments`, { params: { page, limit } });
export const updateComment = (commentId: string, content: string) =>
  api.patch(`/comments/${commentId}`, { content });
export const deleteComment = (commentId: string) => api.delete(`/comments/${commentId}`);

// Payment APIs
export const createPaymentSession = (ideaId: string) =>
  api.post('/payments/checkout', { ideaId });
export const getUserPayments = () => api.get('/payments/purchased');

// Newsletter APIs
export const subscribeNewsletter = (email: string) =>
  api.post('/newsletter/subscribe', { email });
export const unsubscribeNewsletter = (email: string) =>
  api.post('/newsletter/unsubscribe', { email });

// Blog APIs
export const getPosts = (page: number = 1, limit: number = 10) =>
  api.get('/blogs', { params: { page, limit } });
export const getPost = (slug: string) => api.get(`/blogs/${slug}`);
export const createPost = (data: any) => api.post('/blogs', data);
export const updatePost = (postId: string, data: any) => api.patch(`/blogs/${postId}`, data);
export const deletePost = (postId: string) => api.delete(`/blogs/${postId}`);
export const publishPost = (postId: string) => api.post(`/blogs/${postId}/publish`);

// Admin APIs
export const getAllIdeas = (page: number = 1, limit: number = 20, filters?: any) =>
  api.get('/admin/ideas', {
    params: {
      page,
      limit,
      ...filters,
    },
  });

export const approveIdea = (ideaId: string) =>
  api.post(`/admin/ideas/${ideaId}/approve`);
export const rejectIdea = (ideaId: string, feedback: string) =>
  api.post(`/admin/ideas/${ideaId}/reject`, { feedback });
export const featureIdea = (ideaId: string) =>
  api.post(`/admin/ideas/${ideaId}/feature`);
export const getDashboardStats = () => api.get('/admin/stats');
export const getTopVotedIdeas = (limit: number = 5) =>
  api.get('/ideas', { params: { page: 1, limit, sortBy: 'topVoted' } });
export const getAllUsers = (page: number = 1, limit: number = 20) =>
  api.get('/admin/users', { params: { page, limit } });
export const updateUser = (userId: string, data: { role?: 'ADMIN' | 'MEMBER'; isActive?: boolean }) =>
  api.patch(`/admin/users/${userId}`, data);
export const deactivateUser = (userId: string) =>
  updateUser(userId, { isActive: false });
export const activateUser = (userId: string) =>
  updateUser(userId, { isActive: true });
