/**
 * ItemList Component - Display list of items
 * Renders items with proper empty state handling
 */

import React from 'react';
import './ItemList.css';

/**
 * @param {Array<Object>} items - Array of item objects to display
 * @param {boolean} [loading=false] - Show loading state
 */
export const ItemList = ({ items = [], loading = false }) => {
  // Loading state
  if (loading) {
    return (
      <div className="item-list-container">
        <p className="item-list-empty">Loading items...</p>
      </div>
    );
  }

  // Empty state
  if (!items || items.length === 0) {
    return (
      <div className="item-list-container">
        <p className="item-list-empty">No items yet. Create your first one!</p>
      </div>
    );
  }

  // Render items
  return (
    <div className="item-list-container">
      <ul className="item-list" role="list">
        {items.map((item) => (
          <li key={item.id} className="item-list-item" role="listitem">
            <div className="item-content">
              <span className="item-id">#{item.id}</span>
              <span className="item-name">{item.name}</span>
            </div>
          </li>
        ))}
      </ul>
      <p className="item-count">{items.length} item{items.length !== 1 ? 's' : ''}</p>
    </div>
  );
};
