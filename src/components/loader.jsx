/**
 * Loader Component - Loading indicator
 * Simple, reusable spinner displayed during async operations
 */

import React from 'react';
import './Loader.css';

/**
 * @param {boolean} [visible=true] - Whether to display the loader
 * @param {string} [message='Loading...'] - Text to display with spinner
 */
export const Loader = ({ visible = true, message = 'Loading...' }) => {
  if (!visible) return null;

  return (
    <div className="loader-container" aria-live="polite" role="status">
      <div className="loader-spinner" />
      <p className="loader-message">{message}</p>
    </div>
  );
};
