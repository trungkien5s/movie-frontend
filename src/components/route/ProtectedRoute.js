
import { useEffect } from "react"
import {useAuth} from "../contexts/AuthContext";
import {useNavigate} from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            console.log("User not authenticated, redirecting to sign-in")
            navigate("/sign-in")
        }
    }, [isAuthenticated, loading, navigate])

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-yellow-500 border-t-transparent mx-auto"></div>
                    <p className="text-white mt-4">Đang kiểm tra quyền truy cập...</p>
                </div>
            </div>
        )
    }

    if (!isAuthenticated) {
        return null // Will redirect in useEffect
    }

    return children
}
