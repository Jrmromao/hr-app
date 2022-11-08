import { join } from 'node:path/win32';
import React from 'react';
import { BrowserRouter, Route, Router, Routes, useLocation } from 'react-router-dom';
import HomePage from '../views/HomePage';
import Login from '../views/Login';

function App() {
  return (

    <BrowserRouter>
    <Routes>
      <Route index element={<HomePage />}/>
      <Route path='login' element={<Login />}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
