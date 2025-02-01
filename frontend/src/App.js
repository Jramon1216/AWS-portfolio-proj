import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';

import './App.css';
import UserInputPage from './views/UserInputPage';
import ProfilePage from './views/ProfilePage';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/user-input-form" />} />
          <Route path="/user-input-form" element={< UserInputPage/>} />
          <Route path="/profile-page/getUser" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
