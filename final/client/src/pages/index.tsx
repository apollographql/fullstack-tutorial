import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Launch from './launch';
import Launches from './launches';
import Cart from './cart';
import Profile from './profile';
import { Footer, PageContainer } from '../components';

export default function Pages() {
  return (
    <Router>
      <PageContainer>
        <Routes>
          <Route path="/" element={<Launches />} />
          <Route path="launch/:launchId" element={<Launch />} />
          <Route path="cart" element={<Cart />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </PageContainer>
      <Footer />
    </Router>
  );
}
