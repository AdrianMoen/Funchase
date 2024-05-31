const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://88.94.73.21/api';
const WS_BASE_URL = process.env.WS_BASE_URL || '//88.94.73.21/ws';
// Get the api base url, and defailt to localhost:8000 if not present

// Export the constant
export default {
  API_BASE_URL, WS_BASE_URL
};