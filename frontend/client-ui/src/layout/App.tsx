import { CognitoUser } from '@aws-amplify/auth';
import { Auth } from 'aws-amplify';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ModalContainer from '../common/modals/ModalContainer';
import { User } from '../models/user';
import { useStore } from '../stores/store';
import Dashboard from '../views/Dashboard';
import Employee from '../views/Employee';
import HomePage from '../views/HomePage';
import ListEmployees from '../views/ListEmployees';
import RegisterEmployee from '../views/RegisterEmployee';


function App() {
  const { userStore } = useStore();


  useEffect(() => {

    try{
      if (!userStore.user)
      userStore.getUser()
    }catch(err){
      console.log(err);
      
    }
   

  }, [userStore])



  return (
    <>
      <ModalContainer />
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/list-employee' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default observer(App);
