/**
 * API Client - Centralized HTTP request handler
 * Standardizes all communication with the Rust backend
 */

// Backend base URL - update this to match your Rust server
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

/**
 * Handles both successful and error responses from the backend
 * Ensures consistent error handling across the application
 */
class ApiError extends Error {
  constructor(message, status, details) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

/**
 * Generic GET request wrapper
 * @param {string} endpoint - API endpoint (e.g., '/items')
 * @returns {Promise<Object>} Parsed JSON response
 * @throws {ApiError} If network or server error occurs
 */
export const get = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await handleResponse(response);
  } catch (error) {
    throw new ApiError(
      `Network error on GET ${endpoint}`,
      null,
      error.message
    );
  }
};

/**
 * Generic POST request wrapper
 * @param {string} endpoint - API endpoint (e.g., '/items')
 * @param {Object} payload - Request body data
 * @returns {Promise<Object>} Parsed JSON response
 * @throws {ApiError} If network or server error occurs
 */
export const post = async (endpoint, payload) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return await handleResponse(response);
  } catch (error) {
    throw new ApiError(
      `Network error on POST ${endpoint}`,
      null,
      error.message
    );
  }
};

/**
 * Processes HTTP response and extracts JSON
 * Distinguishes between successful and error responses
 * @private
 */
const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');

  const data = isJson ? await response.json() : await response.text();

  // Success response (2xx status)
  if (response.ok) {
    return data;
  }

  // Error response (4xx, 5xx status)
  const errorMessage = data?.error || data?.message || 'Unknown error from backend';
  throw new ApiError(
    errorMessage,
    response.status,
    data
  );
};

/**
 * Export ApiError for external use
 */
export { ApiError };
