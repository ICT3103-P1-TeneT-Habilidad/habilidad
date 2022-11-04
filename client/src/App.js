import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import {
    AllCourses,
    CourseContent,
    CreateCourse,
    Dashboard,
    EditCourse,
    Error404,
    Error500,
    ForgetResetPwd,
    Login,
    LoginOtp,
    OtpRoute,
    Profile,
    ProtectedRoutes,
    StudentViewCourse,
    Register,
    ViewCourse,
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
                    <Route path="viewcourse" element={<ViewCourse />} />
                </Route>
                <Route path="/" index element={<Dashboard />} />
                <Route path="*" element={<Error404 />} />
                <Route path="/500" element={<Error500 />} />
                <Route path="/forgetpwd" element={<ForgetResetPwd />} />
                <Route path="/register" element={<Register />} />
                <Route path="/courses" element={<AllCourses />} />
                <Route path="/" element={<OtpRoute />}>
                    <Route path="otp" element={<LoginOtp />} />
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="/editcourse" element={<EditCourse />} />
                <Route path="/studentviewcourse" element={<StudentViewCourse />} />
                <Route path="/content" element={<CourseContent />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App
