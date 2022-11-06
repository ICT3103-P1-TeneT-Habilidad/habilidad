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
import { Footer, NavbarAuth, Navbar, RBAC } from './components/index'
import { useAppContext } from './context/appContext'
import { allowAllRoles, allowInstructorModeratorOnly, allowInstructorOnly, allowModeratorOnly, allowStudentOnly } from './utils/Constants'

function App() {
    const { user } = useAppContext()

    return (
        <BrowserRouter>
            {user?.accessToken ? <NavbarAuth /> : <Navbar />}
            <Routes>
                <Route path='/' element={<RBAC permissiveRole={allowAllRoles} />}>
                    {/* All */}
                    <Route path="profile" element={<Profile />} />
                </Route>

                <Route path='/' element={<RBAC permissiveRole={allowInstructorOnly} />}>
                    {/* Instructor */}
                    <Route path="createcourse" element={<CreateCourse />} />
                    <Route path="editcourse/:courseId" element={<EditCourse />} />
                </Route>

                <Route path='/' element={<RBAC permissiveRole={allowInstructorModeratorOnly} />}>
                    {/* Instructor & Moderator */}
                    <Route path="viewcourse/:courseId" element={<ViewCourse />} />
                </Route>

                <Route path='/' element={<RBAC permissiveRole={allowModeratorOnly} />}>
                    {/* Moderator */}
                    <Route path="accountmanagement" element={<AccountsPage />} />
                    <Route path="courselist" element={<CourseList />} />
                </Route>

                <Route path='/' element={<RBAC permissiveRole={allowStudentOnly} />}>
                    {/* Student */}
                    <Route path="studentviewcourse/:courseId" element={<StudentViewCourse />} />
                    <Route path="content/:courseId" element={<CourseContent />} />
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
