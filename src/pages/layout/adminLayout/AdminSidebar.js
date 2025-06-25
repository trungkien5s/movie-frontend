// components/admin/AdminSidebar.jsx
import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Home, Film, MessageSquare, Tags, Users, LogOut } from 'lucide-react'
import {useAuth} from "../../../components/contexts/AuthContext";

const sidebarLink = [
    { icon: <Home className="w-5 h-5" />, title: "Bảng điều khiển", url: "/admin" },
    { icon: <Film className="w-5 h-5" />, title: "Quản lý phim", url: "/admin/films" },
    { icon: <MessageSquare className="w-5 h-5" />, title: "Quản lý bình luận và đánh giá", url: "/admin/comments" },
    { icon: <Tags className="w-5 h-5" />, title: "Quản lý thể loại", url: "/admin/genres" },
]

const settingsLinks = [
    { icon: <Users className="w-5 h-5" />, title: "Quản lý tài khoản", url: "/admin/users" },
    { icon: <LogOut className="w-5 h-5" />, title: "Đăng xuất", url: "/admin/logout" },
]

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const [isMobile, setIsMobile] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const { logout } = useAuth()

    // Detect mobile screen size
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024)
            if (window.innerWidth >= 1024) {
                setSidebarOpen(false)
            }
        }

        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [setSidebarOpen])

    // Close sidebar when clicking outside on mobile
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isMobile &&
                sidebarOpen &&
                !event.target.closest(".sidebar-container") &&
                !event.target.closest(".sidebar-toggle")
            ) {
                setSidebarOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [isMobile, sidebarOpen, setSidebarOpen])

    // Prevent body scroll when mobile sidebar is open
    useEffect(() => {
        if (isMobile && sidebarOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }

        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isMobile, sidebarOpen])

    const navLinkClass =
        "flex items-center px-4 py-3 rounded-lg duration-300 text-gray-300 text-sm font-medium hover:bg-gray-700/50 hover:text-white transition-all no-underline group w-full"
    const activeClass = "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg no-underline"

    const closeSidebar = () => setSidebarOpen(false)

    const handleNavigation = (url) => {
        if (url === "/admin/logout") {
            logout()
            navigate("/")
        } else {
            navigate(url)
        }
        if (isMobile) closeSidebar()
    }

    const isActive = (url) => {
        if (url === "/admin") {
            return location.pathname === "/admin"
        }
        return location.pathname.startsWith(url)
    }

    return (
        <>
            {/* Sidebar */}
            <div
                className={`sidebar-container fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-[#1E2753] border-r border-gray-700 transition-all duration-300 ease-in-out z-40
          ${isMobile ? (sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full") : "translate-x-0"}
          ${isMobile ? "lg:relative lg:translate-x-0 lg:shadow-none lg:top-0 lg:h-screen" : ""}
        `}
            >
                <div className="flex flex-col h-full">
                    {/* Desktop Header */}


                    {/* Mobile Close Button */}
                    <div className="lg:hidden flex items-center justify-between h-16 px-4 border-b border-gray-700">
                        <h1 className="text-white font-semibold text-lg">Menu</h1>
                        <button
                            onClick={closeSidebar}
                            className="p-2 rounded-md text-white hover:bg-gray-700 transition-colors"
                            aria-label="Close sidebar"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation Content */}
                    <div className="flex-1 flex flex-col px-4 py-6 overflow-y-auto">
                        {/* Main Links */}
                        <nav className="space-y-2">
                            {sidebarLink.map((link) => (
                                <button
                                    key={link.title}
                                    onClick={() => handleNavigation(link.url)}
                                    className={isActive(link.url) ? `${navLinkClass} ${activeClass}` : navLinkClass}
                                >
                                    <div className="flex items-center gap-3 w-full">
                                        <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">{link.icon}</span>
                                        <span className="truncate">{link.title}</span>
                                    </div>
                                </button>
                            ))}
                        </nav>

                        {/* Divider */}
                        <div className="my-6 border-t border-gray-700"></div>

                        {/* Settings Links */}
                        <div>
                            <h3 className="text-xs font-bold text-gray-400 uppercase mb-3 px-2 tracking-wider">Cài đặt</h3>
                            <nav className="space-y-2">
                                {settingsLinks.map((link) => (
                                    <button
                                        key={link.title}
                                        onClick={() => handleNavigation(link.url)}
                                        className={isActive(link.url) ? `${navLinkClass} ${activeClass}` : navLinkClass}
                                    >
                                        <div className="flex items-center gap-3 w-full">
                                            <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">{link.icon}</span>
                                            <span className="truncate">{link.title}</span>
                                        </div>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="hidden lg:block p-4 border-t border-gray-700">
                        <div className="text-xs text-gray-400 text-center">© 2024 Mê Phim Admin</div>
                    </div>

                    {/* Mobile Footer */}
                    <div className="lg:hidden p-4 border-t border-gray-700">
                        <div className="text-xs text-gray-400 text-center">© 2024 Mê Phim</div>
                    </div>
                </div>
            </div>

            {/* Mobile Overlay */}
            {isMobile && sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
                    onClick={closeSidebar}
                    aria-label="Close sidebar"
                ></div>
            )}
        </>
    )
}

export default AdminSidebar;