/**
 * HomePage - Main application screen
 * Orchestrates data fetching and component composition
 * Manages overall application state and error handling
 */

import React, { useEffect } from 'react';
import { ItemList } from '../components/ItemList';
import { ItemForm } from '../components/ItemForm';
import { Loader } from '../components/Loader';
import { ErrorBanner } from '../components/ErrorBanner';
import { useItems } from '../hooks/useItems';
import './HomePage.css';

export const HomePage = () => {
  const { items, loading, error, fetchItems, createNewItem, clearError } = useItems();

  // Fetch items on component mount
  useEffect(() => {
    console.log('HomePage mounted, fetching items...');
    fetchItems();
  }, [fetchItems]);

  /**
   * Handles form submission for creating a new item
   * Delegates to hook, which handles API call and state update
   */
  const handleAddItem = async (itemName) => {
    console.log('Creating item:', itemName);
    return await createNewItem(itemName);
  };

  return (
    <div className="home-page">
      {/* Page header */}
      <header className="page-header">
        <h1 className="page-title">Items Manager</h1>
        <p className="page-subtitle">Manage your items with the Rust backend</p>
      </header>

      {/* Main content */}
      <main className="page-content">
        {/* Show error banner if there's an error */}
        <ErrorBanner
          message={error}
          onDismiss={clearError}
          visible={!!error}
        />

        {/* Show loader while fetching initial data */}
        <Loader visible={loading && items.length === 0} message="Loading items..." />

        {/* Show list and form when not loading initial fetch */}
        {!loading || items.length > 0 ? (
          <div className="page-sections">
            {/* Items list section */}
            <section className="items-section">
              <h2 className="section-title">Items</h2>
              <ItemList items={items} loading={false} />
            </section>

            {/* Form section */}
            <section className="form-section">
              <h2 className="section-title">Add New Item</h2>
              <ItemForm onSubmit={handleAddItem} loading={loading} />
            </section>
          </div>
        ) : null}
      </main>
    </div>
  );
};
