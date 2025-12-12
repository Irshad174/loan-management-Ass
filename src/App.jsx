import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import OTP from './pages/OTP/OTP'
import Signup from './pages/Signup/Signup'
import Dashboard from './pages/dashboard/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


export default function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Navigate to='/login' replace />} />
                <Route path='/login' element={<Login />} />
                <Route path='/otp' element={<OTP />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            </Routes>
            <ToastContainer position="top-right" />
        </>
    )
}