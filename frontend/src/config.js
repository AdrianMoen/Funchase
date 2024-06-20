const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://funchase.xyz/api';
const WS_BASE_URL = process.env.WS_BASE_URL || '//funchase.xyz/ws';
// Get the api base url, and defailt to localhost:8000 if not present

// Export the constant
export default {
  API_BASE_URL, WS_BASE_URL
};
