/**
 * useItems Hook - Encapsulates all items-related logic
 * Manages fetching, creating, and error handling for items
 * Promotes code reusability and clean component separation
 */

import { useState, useCallback } from 'react';
import { getItems as fetchItemsAPI, createItem as createItemAPI } from '../api/items';

/**
 * Initial state structure for clarity and consistency
 */
const initialState = {
  items: [],
  loading: false,
  error: null,
};

/**
 * Custom hook for items management
 * Provides methods and state for fetching and creating items
 * 
 * @returns {Object} Object containing:
 *   - items: Array of item objects
 *   - loading: Boolean indicating if a request is in progress
 *   - error: String error message or null if no error
 *   - fetchItems: Function to fetch all items from backend
 *   - createNewItem: Function to create a new item
 *   - clearError: Function to clear the current error
 */
export const useItems = () => {
  const [state, setState] = useState(initialState);

  /**
   * Fetches all items from the backend
   * Sets loading state, handles success and error cases
   */
  const fetchItems = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await fetchItemsAPI();
      setState(prev => ({
        ...prev,
        items: data,
        loading: false,
        error: null,
      }));
    } catch (err) {
      const errorMessage = err.message || 'Failed to fetch items';
      console.error('Fetch error:', err);
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
    }
  }, []);

  /**
   * Creates a new item on the backend
   * Optimistically adds to local state, falls back to refetch on error
   * 
   * @param {string} name - Item name to create
   * @returns {Promise<boolean>} True if successful, false otherwise
   */
  const createNewItem = useCallback(async (name) => {
    try {
      const newItem = await createItemAPI(name);
      
      // Optimistically update state with new item
      setState(prev => ({
        ...prev,
        items: [...prev.items, newItem],
        error: null,
      }));
      
      return true;
    } catch (err) {
      const errorMessage = err.message || 'Failed to create item';
      console.error('Create error:', err);
      setState(prev => ({
        ...prev,
        error: errorMessage,
      }));
      return false;
    }
  }, []);

  /**
   * Clears the current error message
   * Useful for dismissing error banners in UI
   */
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    items: state.items,
    loading: state.loading,
    error: state.error,
    fetchItems,
    createNewItem,
    clearError,
  };
};
