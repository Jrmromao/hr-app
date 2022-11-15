import React from 'react'
import { Outlet } from 'react-router-dom';
import { useStore } from '../stores/store';
import HomePage from '../views/HomePage';

const AuthRoutes = () => {

    const { userStore } = useStore();

  return userStore.isLoggedIn ? <Outlet/> : <HomePage />
}

export default AuthRoutes