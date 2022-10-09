import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Dashboard, Error } from './pages/index'
import { Footer, Navbar } from './components/index'

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" index element={<Dashboard />} />
                <Route path="*" element={<Error />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App
