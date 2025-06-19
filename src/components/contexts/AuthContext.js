
import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // Check for existing user session on app load
    useEffect(() => {
        const checkAuthStatus = () => {
            try {
                const storedUser = localStorage.getItem("user")
                const storedToken = localStorage.getItem("access_token")

                if (storedUser && storedToken) {
                    const userData = JSON.parse(storedUser)
                    setUser(userData)
                }
            } catch (error) {
                console.error("Error loading user from localStorage:", error)
                // Clear invalid data
                localStorage.removeItem("user")
                localStorage.removeItem("access_token")
            } finally {
                setLoading(false)
            }
        }

        checkAuthStatus()
    }, [])

    const login = (userData) => {
        setUser(userData)
        // Store user data in localStorage
        localStorage.setItem("access_token", userData.access_token)
        localStorage.setItem("user", JSON.stringify(userData))
    }

    const logout = () => {
        setUser(null)
        // Clear localStorage
        localStorage.removeItem("access_token")
        localStorage.removeItem("user")
    }

    const value = {
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
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
