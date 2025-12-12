import React, { createContext, useState, useEffect } from 'react'
import { getAuth, saveAuth, clearAuth, getUsers } from '../utils/storage'
import { initialUsers } from '../data/users'
import { initialLoans } from '../data/loans'
import { seedInitial } from '../utils/storage'


export const AuthContext = createContext()


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getAuth())
    useEffect(() => {
        seedInitial(initialUsers, initialLoans)
    }, [])
    function login(userObj) {
        setUser(userObj)
        saveAuth(userObj)
    }
    function logout() {
        setUser(null)
        clearAuth()
    }
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}