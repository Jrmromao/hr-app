import { CognitoUser } from '@aws-amplify/auth';
import { Auth } from 'aws-amplify';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ModalContainer from '../components/common/modals/ModalContainer';
import PrivateRoutes from '../routes/PrivateRoutes';
import { useStore } from '../stores/store';
import Dashboard from '../views/Dashboard';
import ManageEmployeeView from '../views/ManageEmployeeView';
import HomePage from '../views/HomePage';
import ManageJobsView from '../views/ManageJobsView';
import ManageCompanyView from '../views/ManageCompanyView';



function App() {
  const { userStore } = useStore();

  useEffect(() => {
    (async () => {

      try {
        if (!userStore.user) {
          await userStore.getUser()
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [userStore]);



  return (
    <>
      <ModalContainer />
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/list' element={<Dashboard />} />
            <Route path='/manage-employees' element={<ManageEmployeeView />} />
            <Route path='/manage-company' element={<ManageCompanyView />} />
            <Route path='/files' element={<ManageEmployeeView />} />
            <Route path='/manage-jobs' element={<ManageJobsView />} />
            <Route path='/settings' element={<Dashboard />} />
          </Route>
          <Route path='/' index element={<HomePage />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default observer(App);
