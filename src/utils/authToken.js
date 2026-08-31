const AUTH_TOKEN_KEY = "bonita_auth_token";

export const getAuthToken = () => sessionStorage.getItem(AUTH_TOKEN_KEY);

export const setAuthToken = (token) => {
  if (token) sessionStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const clearAuthToken = () => sessionStorage.removeItem(AUTH_TOKEN_KEY);

export const authHeaders = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// The OAuth callback puts the token in the URL fragment. Fragments never go
// to the server, which keeps it out of backend access logs and referrers.
export const saveOAuthTokenFromLocation = () => {
  const params = new URLSearchParams(window.location.hash.slice(1));
  const token = params.get("token");

  if (!token) return null;

  setAuthToken(token);
  window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  return token;
};
