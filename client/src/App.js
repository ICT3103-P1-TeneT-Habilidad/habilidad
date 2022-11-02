import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { AllCourses, Dashboard, Error404, Error500, ForgetResetPwd, Login, Register, Profile, CreateCourse } from './pages/index'
import { Footer, Navbar } from './components/index'

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" index element={<Dashboard />} />
                <Route path="*" element={<Error404 />} />
                <Route path="/500" element={<Error500 />} />
                <Route path="/pwd" element={<ForgetResetPwd />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/courses" element={<AllCourses />} />
                <Route path="/createcourse" element={<CreateCourse />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App
