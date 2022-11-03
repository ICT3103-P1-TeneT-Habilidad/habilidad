import { Navigate } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import LoginOtp from './LoginOtp'

const LoginRoute = () => {
    const { loginOtp } = useAppContext()

    return loginOtp ? <LoginOtp /> : <Navigate to="/login" />
}

export default LoginRoute
