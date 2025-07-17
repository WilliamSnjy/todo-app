import './App.css'
import Dashboard from './components/Dashboard'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Admin from './Pages/Admin'
import User from './Pages/User'
import ToDo from './Pages/ToDo'
import ProtectedRoute from './utils/protectedRoute'
import AdminRoute from './utils/adminRoute'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path='/todo' element={<ProtectedRoute><ToDo /></ProtectedRoute>} />
        <Route path='/register' element={<AdminRoute><Register /></AdminRoute>} />
        <Route path='/admin' element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path='/user' element={<ProtectedRoute><User /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
