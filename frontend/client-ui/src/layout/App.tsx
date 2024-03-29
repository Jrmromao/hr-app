import {CognitoUser} from '@aws-amplify/auth';
import {Auth} from 'aws-amplify';
import {observer} from 'mobx-react-lite';
import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ModalContainer from '../components/common/modals/ModalContainer';
import PrivateRoutes from '../routes/PrivateRoutes';
import {useStore} from '../stores/store';
import Dashboard from '../views/Dashboard';
import ManageEmployeeView from '../views/ManageEmployeeView';
import HomePage from '../views/HomePage';
import ManageJobsView from '../views/ManageJobsView';
import ManageCompanyView from '../views/ManageCompanyView';
import WorkflowsView from '../views/WorkflowsView';
import TimeOffView from '../views/TimeOffView';
import DocumentsView from '../views/DocumentsView';
import WorkScheduleView from '../views/WorkScheduleView';
import WorkplacesView from '../views/WorkplacesView';
import ActiveLogView from '../views/ActiveLogView';
import toast, {Toaster} from 'react-hot-toast';
import ProfileView from "../views/ProfileView";


function App() {
    const {userStore} = useStore();

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

            <ModalContainer/>
            <BrowserRouter>
                <Routes>
                    <Route element={<PrivateRoutes/>}>
                        <Route path='dashboard' element={<ProfileView/>}/>
                        <Route path='profile' element={<ProfileView/>}/>
                        <Route path='manage-employees' element={<ManageEmployeeView/>}/>
                        <Route path='manage-company' element={<ManageCompanyView/>}/>
                        <Route path='manage-company/work-schedule' element={<WorkScheduleView/>}/>
                        <Route path='manage-company/active-log' element={<ActiveLogView/>}/>
                        <Route path='manage-company/time-off' element={<TimeOffView/>}/>
                        <Route path='manage-company/documents' element={<DocumentsView/>}/>
                        <Route path='manage-company/workflows' element={<WorkflowsView/>}/>
                        <Route path='manage-company/workplaces' element={<WorkplacesView/>}/>
                        <Route path='files' element={<ManageEmployeeView/>}/>
                        <Route path='manage-jobs' element={<ManageJobsView/>}/>
                        <Route path='settings' element={<Dashboard/>}/>
                    </Route>
                    <Route index element={<HomePage/>}/>
                </Routes>
            </BrowserRouter>

        </>
    );
}

export default observer(App);
