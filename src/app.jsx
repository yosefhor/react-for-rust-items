/**
 * App - Root component
 * Sets up routing and global layout
 */

import React from 'react';
import { HomePage } from './pages/homePage';
import './App.css';

export const App = () => {
  return (
    <div className="app">
      <HomePage />
    </div>
  );
};

export default App;
