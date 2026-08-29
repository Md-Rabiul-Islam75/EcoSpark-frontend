const TOKEN_KEY = 'ecospark_token';
const LEGACY_TOKEN_KEY = 'accessToken';
const REFRESH_KEY = 'ecospark_refresh_token';
const LEGACY_REFRESH_KEY = 'refreshToken';

const readToken = (primaryKey: string, legacyKey: string) => {
  if (typeof window === 'undefined') return null;

  return localStorage.getItem(primaryKey) || localStorage.getItem(legacyKey);
};

export const tokenStorage = {
  getAccessToken: () => readToken(TOKEN_KEY, LEGACY_TOKEN_KEY),
  setAccessToken: (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(LEGACY_TOKEN_KEY, token);
  },
  clearAccessToken: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(LEGACY_TOKEN_KEY);
  },
  getRefreshToken: () => readToken(REFRESH_KEY, LEGACY_REFRESH_KEY),
  setRefreshToken: (token: string) => {
    localStorage.setItem(REFRESH_KEY, token);
    localStorage.setItem(LEGACY_REFRESH_KEY, token);
  },
  clearRefreshToken: () => {
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(LEGACY_REFRESH_KEY);
  },
  clearAll: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(LEGACY_TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(LEGACY_REFRESH_KEY);
  },
};
