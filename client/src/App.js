import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Dashboard, Error, Content } from './pages/index'
import { Footer, Navbar } from './components/index'

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" index element={<Dashboard />} />
                <Route path="*" element={<Error />} />
                <Route path="Content" element={<Content />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App
