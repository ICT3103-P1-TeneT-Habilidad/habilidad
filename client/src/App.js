import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Dashboard } from './pages/index'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" index element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
