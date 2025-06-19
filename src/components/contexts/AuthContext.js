"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    // Check for existing user session on app load
    useEffect(() => {
        const checkAuthStatus = () => {
            try {
                const storedUser = localStorage.getItem("user")
                const storedToken = localStorage.getItem("access_token")

                if (storedUser && storedToken) {
                    const userData = JSON.parse(storedUser)
                    setUser(userData)
                    setIsAuthenticated(true)
                    console.log("User loaded from localStorage:", userData)
                }
            } catch (error) {
                console.error("Error loading user from localStorage:", error)
                // Clear invalid data
                localStorage.removeItem("user")
                localStorage.removeItem("access_token")
                setUser(null)
                setIsAuthenticated(false)
            } finally {
                setLoading(false)
            }
        }

        checkAuthStatus()
    }, [])

    const login = (userData) => {
        console.log("Login called with:", userData)

        // Create user object with proper structure
        const userInfo = {
            username: userData.username,
            email: userData.username, // Assuming username is email
            name: userData.username.split("@")[0] || userData.username, // Extract name from email
            access_token: userData.access_token,
            id: userData.id || Date.now(), // Generate ID if not provided
        }

        setUser(userInfo)
        setIsAuthenticated(true)

        // Store user data in localStorage
        localStorage.setItem("access_token", userData.access_token)
        localStorage.setItem("user", JSON.stringify(userInfo))

        console.log("User logged in successfully:", userInfo)
    }

    const logout = () => {
        console.log("Logout called")
        setUser(null)
        setIsAuthenticated(false)

        // Clear localStorage
        localStorage.removeItem("access_token")
        localStorage.removeItem("user")

        console.log("User logged out successfully")
    }

    const value = {
        user,
        loading,
        login,
        logout,
        isAuthenticated,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
