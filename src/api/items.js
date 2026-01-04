/**
 * Items API - High-level functions for items endpoints
 * Abstracts API client methods for cleaner component usage
 */

import { get, post } from './client';

/**
 * Fetches all items from the backend
 * @returns {Promise<Array>} Array of item objects
 * @example
 * const items = await getItems();
 * // Returns: [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }]
 */
export const getItems = async () => {
  const response = await get('/items');
  // Handle both array response and object with data key
  return Array.isArray(response) ? response : response.data || [];
};

/**
 * Creates a new item on the backend
 * @param {string} name - The name/title of the item
 * @returns {Promise<Object>} Created item with id from backend
 * @example
 * const newItem = await createItem('My new item');
 * // Returns: { id: 3, name: 'My new item' }
 */
export const createItem = async (name) => {
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    throw new Error('Item name must be a non-empty string');
  }

  const response = await post('/items', { name: name.trim() });
  return response;
};
