import { Navigate } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import LoginOtp from './LoginOtp'

const OtpRoute = () => {
    const { loginOtp, user } = useAppContext()

    return loginOtp || user ? <LoginOtp /> : <Navigate to="/login" />
}

export default OtpRoute
