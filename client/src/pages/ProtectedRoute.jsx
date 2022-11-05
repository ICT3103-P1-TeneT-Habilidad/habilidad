import { Outlet, Navigate } from 'react-router-dom'
import { useAppContext } from '../context/appContext'

const ProtectedRoutes = () => {
    const { user } = useAppContext()

    return user?.accessToken ? <Outlet /> :  <Navigate to="/login" />
}

export default ProtectedRoutes
