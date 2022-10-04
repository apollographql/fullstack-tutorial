import React, { Fragment } from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom'

import Launch from './launch';
import Launches from './launches';
import Cart from './cart';
import Profile from './profile';
import { Footer, PageContainer } from '../components';

export default function Pages() {
  return (
    <Fragment>
      <PageContainer>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Launches/>}/>
          <Route path="launch/:launchId" element={<Launch/>} />
          <Route path="cart" element={<Cart/>} />
          <Route path="profile" element={<Profile/>} />
        </Routes>
        </BrowserRouter>
      </PageContainer>
      <Footer />
    </Fragment>
  );
}
