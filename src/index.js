import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Header from './Header';
import Footer from './Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<div className="main-container">
      <Header />
     <App/>
      <Footer />
    </div>


);

