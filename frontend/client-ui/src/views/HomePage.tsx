

import React, { useEffect } from 'react'
import { redirect } from 'react-router-dom';
import { useStore } from '../stores/store';
 
interface IProps {

}

const HomePage: React.FC<IProps> = ({ }) => {
    const {userStore} = useStore();
    useEffect(()=>{
    console.log('HomePage...');

    },[])


    return (
        <h1>This is a sample home page!! <button value='Click me!' onClick={() => userStore.login({email: 'uuuu@mail.com', password: '12343'})}>Click me</button></h1>
    )
}

export default HomePage