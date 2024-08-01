// src/js/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import "../styles/index.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

// Import your own components
import Home from './component/home.jsx';

// Render your React application
ReactDOM.createRoot(document.getElementById('app')).render(<Home />);
