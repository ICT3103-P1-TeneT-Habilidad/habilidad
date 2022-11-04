import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import {
    AccountsPage,
    AllCourses,
    AllTopics,
    CourseContent,
    CoursesByTopic,
    CreateCourse,
    Dashboard,
    EditCourse,
    Error404,
    Error500,
    ForgetResetPwd,
    LoginOtp,
    LoginPage,
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
                    <Route path="editcourse/:courseId" element={<EditCourse />} />
                    <Route path="studentviewcourse" element={<StudentViewCourse />} />
                    <Route path="content" element={<CourseContent />} />
                    <Route path="/topics/:topicName" element={<CoursesByTopic />} />
                    <Route path="viewcourse/:courseId" element={<ViewCourse />} />
                    <Route path="accountmanagement" element={<AccountsPage />} />
                </Route>
                <Route path="/" index element={<Dashboard />} />
                <Route path="*" element={<Error404 />} />
                <Route path="/500" element={<Error500 />} />
                <Route path="/forgetpwd" element={<ForgetResetPwd />} />
                <Route path="/register" element={<Register />} />
                <Route path="/allcourses" element={<AllCourses />} />
                <Route path="/alltopics" element={<AllTopics />} />
                <Route path="/" element={<OtpRoute />}>
                    <Route path="otp" element={<LoginOtp />} />
                </Route>
                <Route path="/login" element={<LoginPage />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App
