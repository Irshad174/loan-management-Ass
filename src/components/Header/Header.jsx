import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import "./Header.css"

export default function Header() {
    const { user, logout } = useContext(AuthContext)
    const navigate = useNavigate()

    function doLogout() {
        logout()
        toast.success('Logged out')
        navigate('/login')
    }

    return (
        <div className="header">
            <div>
                <h3 className="logo">Loan Mini App</h3>
                <div className="welcome">Welcome, <strong>{user?.name}</strong></div>
            </div>

            <button className="logout-btn" onClick={doLogout}>Logout</button>
        </div>
    )
}
