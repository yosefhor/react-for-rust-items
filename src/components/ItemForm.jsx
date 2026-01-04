/**
 * ItemForm Component - Form for creating new items
 * Controlled input with validation and submit handling
 */

import React, { useState } from 'react';
import './ItemForm.css';

/**
 * @param {Function} onSubmit - Callback when form is submitted with item name
 * @param {boolean} [loading=false] - Disable submit button while loading
 */
export const ItemForm = ({ onSubmit, loading = false }) => {
  const [inputValue, setInputValue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Validate: item name cannot be empty
  const isValid = inputValue.trim().length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isValid) {
      setSubmitted(true);
      return;
    }

    // Call parent handler
    const success = await onSubmit(inputValue);
    
    // Reset form only on successful submission
    if (success) {
      setInputValue('');
      setSubmitted(false);
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    // Clear validation error as user types
    if (submitted && e.target.value.trim().length > 0) {
      setSubmitted(false);
    }
  };

  return (
    <form className="item-form" onSubmit={handleSubmit}>
      <div className="item-form-group">
        <label htmlFor="item-input" className="item-form-label">
          Add a new item:
        </label>
        <div className="item-form-input-wrapper">
          <input
            id="item-input"
            type="text"
            className={`item-form-input ${submitted && !isValid ? 'error' : ''}`}
            placeholder="Enter item name..."
            value={inputValue}
            onChange={handleChange}
            disabled={loading}
            maxLength={100}
            aria-invalid={submitted && !isValid}
          />
          <button
            type="submit"
            className="item-form-submit"
            disabled={loading || !isValid}
            aria-busy={loading}
          >
            {loading ? 'Adding...' : 'Add Item'}
          </button>
        </div>
        {submitted && !isValid && (
          <p className="item-form-error" role="alert">
            Please enter an item name
          </p>
        )}
      </div>
    </form>
  );
};
