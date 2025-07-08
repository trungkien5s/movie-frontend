import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {useAuth} from "../../../components/contexts/AuthContext";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";


const AdminLayout = ({ children }) => {
    const { user, isAuthenticated, loading } = useAuth()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const navigate = useNavigate()

    // Check if user is admin (you can modify this logic)
    const isAdmin = user?.is_superuser === true;

    console.log("User",user)
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-black font-bold text-2xl">M</span>
                    </div>
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-red-500 border-t-transparent mx-auto"></div>
                    <p className="text-white mt-4">Đang kiểm tra quyền truy cập...</p>
                </div>
            </div>
        )
    }

    if (!isAuthenticated || !isAdmin) {
        navigate("/auth/sign-in")
        return null
    }

    return (
        <div className="min-h-screen bg-[#F3F4F6]">
            <AdminHeader setSidebarOpen={setSidebarOpen} />
            <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className="lg:pl-64 pt-16">
                <main className="py-4 lg:py-6">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
                </main>
            </div>
        </div>
    )
}

export default AdminLayout;