const TOKEN_KEY = 'ecospark_token';
const REFRESH_KEY = 'ecospark_refresh_token';

export const tokenStorage = {
  getAccessToken: () => (typeof window === 'undefined' ? null : localStorage.getItem(TOKEN_KEY)),
  setAccessToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clearAccessToken: () => localStorage.removeItem(TOKEN_KEY),
  getRefreshToken: () => (typeof window === 'undefined' ? null : localStorage.getItem(REFRESH_KEY)),
  setRefreshToken: (token: string) => localStorage.setItem(REFRESH_KEY, token),
  clearRefreshToken: () => localStorage.removeItem(REFRESH_KEY),
  clearAll: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },
};
