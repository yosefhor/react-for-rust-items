/**
 * ErrorBanner Component - Error message display
 * Consistently shows error messages with dismiss capability
 */

import React from 'react';
import './ErrorBanner.css';

/**
 * @param {string} message - Error message to display
 * @param {Function} onDismiss - Callback when user clicks dismiss
 * @param {boolean} [visible=true] - Whether to show the banner
 */
export const ErrorBanner = ({ message, onDismiss, visible = true }) => {
  if (!visible || !message) return null;

  return (
    <div className="error-banner" role="alert">
      <div className="error-banner-content">
        <span className="error-icon">⚠️</span>
        <p className="error-message">{message}</p>
        <button
          className="error-dismiss-btn"
          onClick={onDismiss}
          aria-label="Dismiss error"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
