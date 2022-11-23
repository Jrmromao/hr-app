import { observer } from "mobx-react-lite";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import BasicLayout from "../layout/BasicLayout";
import MainLayout from "../layout/MainLayout";
// import AboutYou from "../components/AboutYou";
// import DashboardStatus from "../components/DashboardStatus";
// import ManageMenu from "../components/ManageMenu";
import { useStore } from "../stores/store";

export default observer(function Dashboard() {
    const { userStore, employeeStore } = useStore();
    const history = useNavigate();
    const [list, setList] = useState('')
    const [create, setCreate] = useState('')
    const [update, setUpdate] = useState('')
    const [del, setDel] = useState('')

    useEffect(() => {

       employeeStore.list().then(res => setList(res))
       employeeStore.create().then(res => setCreate(res))
       employeeStore.update().then(res => setUpdate(res))
       employeeStore.delete().then(res => setDel(res))

    }, [employeeStore, setList, setUpdate, setCreate, setDel])

    return (
        <MainLayout>
        {list} <br/>
        {create}<br/>
        {update}<br/>
        {del}<br/>
        </MainLayout>
    )
});