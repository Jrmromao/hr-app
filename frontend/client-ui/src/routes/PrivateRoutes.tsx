import { observer } from 'mobx-react-lite';
import { Navigate, Outlet } from 'react-router-dom'
import { useStore } from '../stores/store';
const PrivateRoutes = () => {
  
  const { userStore } = useStore();

return (
    userStore.isLoggedIn ? <Outlet/> : <Navigate to='/'/>
  )
}

export default observer(PrivateRoutes);