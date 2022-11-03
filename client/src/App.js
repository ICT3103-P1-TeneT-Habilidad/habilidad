import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import {
    AllCourses,
    CreateCourse,
    Dashboard,
    Error404,
    Error500,
    ForgetResetPwd,
    Login,
    LoginOtp,
    LoginRoute,
    Register,
    Profile,
    ProtectedRoutes,
} from './pages/index'
import { Footer, Navbar } from './components/index'

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<ProtectedRoutes />}>
                    <Route path="profile" element={<Profile />} />
                    <Route path="createcourse" element={<CreateCourse />} />
                </Route>
                <Route path="/" index element={<Dashboard />} />
                <Route path="*" element={<Error404 />} />
                <Route path="/500" element={<Error500 />} />
                <Route path="/forgetpwd" element={<ForgetResetPwd />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/courses" element={<AllCourses />} />
                <Route path="/" element={<LoginRoute />}>
                    <Route path="otp" element={<LoginOtp />} />
                </Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App
