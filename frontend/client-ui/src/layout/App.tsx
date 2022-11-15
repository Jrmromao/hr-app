import { observer } from 'mobx-react-lite';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ModalContainer from '../common/modals/ModalContainer';
import AuthRoutes from '../routes/AuthRoutes';
import Dashboard from '../views/Dashboard';
import Employee from '../views/Employee';
import HomePage from '../views/HomePage';
import ListEmployees from '../views/ListEmployees';
import RegisterEmployee from '../views/RegisterEmployee';

function App() {
  return (
    <>
      <ModalContainer />
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/employees' element={<Employee />} />
          <Route path='/register-employee' element={<RegisterEmployee />} />
          <Route path='/list-employee' element={<ListEmployees />} />

        </Routes>
      </BrowserRouter>

    </>
  );
}

export default observer(App);
