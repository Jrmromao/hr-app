import { CognitoUser } from '@aws-amplify/auth';
import { Auth } from 'aws-amplify';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import RegisterEmployeeForm from '../components/common/forms/RegisterEmployeeForm';
import ModalContainer from '../components/common/modals/ModalContainer';
import { User } from '../models/user';
import PrivateRoutes from '../routes/PrivateRoutes';
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
          <Route element={<PrivateRoutes/>}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/list' element={<Dashboard />} />
            <Route path='/register' element={<RegisterEmployeeForm />} />
            <Route path='/settings' element={<Dashboard />} />
          </Route>
          <Route path='/' index element={<HomePage/>}/>
        </Routes>
        </BrowserRouter>

    </>
  );
}

export default observer(App);
