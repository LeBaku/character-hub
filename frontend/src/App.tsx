import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Character from './pages/Characters'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/characters" element={<Character />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default App