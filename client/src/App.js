import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import {
    AccountsPage,
    AllCourses,
    AllTopics,
    CourseContent,
    CoursesByTopic,
    CourseList,
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
    VetCourse,
} from './pages/index'
import { Footer, NavbarAuth, Navbar } from './components/index'
import { useAppContext } from './context/appContext'

function App() {
    const { user } = useAppContext()

    return (
        <BrowserRouter>
            {user?.accessToken ? <NavbarAuth /> : <Navbar />}
            <Routes>
                <Route path="/" element={<ProtectedRoutes />}>
                    <Route path="profile" element={<Profile />} />
                    <Route path="createcourse" element={<CreateCourse />} />
                    <Route path="editcourse/:courseId" element={<EditCourse />} />
                    <Route path="studentviewcourse/:courseId" element={<StudentViewCourse />} />
                    <Route path="content/:courseId" element={<CourseContent />} />
                    <Route path="viewcourse/:courseId" element={<ViewCourse />} />
                    <Route path="accountmanagement" element={<AccountsPage />} />
                    <Route path="courselist" element={<CourseList />} />
                    <Route path='vet/:courseId' element={<VetCourse/>}/>
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
                <Route path="topics/:topicName" element={<CoursesByTopic />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App
