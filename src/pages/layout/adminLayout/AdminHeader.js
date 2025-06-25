// components/admin/AdminHeader.jsx
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {useAuth} from "../../../components/contexts/AuthContext";
import {Search} from "lucide-react";

const AdminHeader = ({ setSidebarOpen }) => {
    const [menuVisible, setMenuVisible] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredResults, setFilteredResults] = useState([])
    const [showResults, setShowResults] = useState(false)
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const toggleMenu = () => setMenuVisible((prev) => !prev)

    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase()
        setSearchTerm(term)

        if (term.length > 0) {
            // Mock search results - replace with actual API call
            const mockResults = [
                { id: 1, name: "Lưới Hái Tử Thần: Huyết Thống" },
                { id: 2, name: "Người Nhện: Vũ Trụ Mới" },
                { id: 3, name: "Chiến Binh Huyền Thoại" },
            ].filter((movie) => movie.name.toLowerCase().includes(term))

            setFilteredResults(mockResults)
            setShowResults(true)
        } else {
            setShowResults(false)
        }
    }

    const handleResultClick = () => {
        setShowResults(false)
        setSearchTerm("")
    }

    const handleLogout = () => {
        logout()
        navigate("/")
    }

    return (
        <div className="fixed top-0 left-0 w-full h-16 bg-[#121826] border-b border-gray-700 flex items-center justify-between px-4 lg:px-8 shadow-lg z-50">
            {/* Left Side - Logo and Search */}
            <div className="flex items-center gap-4 lg:gap-6">
                {/* Mobile Menu Button */}
                <button
                    className="sidebar-toggle lg:hidden p-2 rounded-md text-white hover:bg-gray-700 transition-colors"
                    onClick={() => setSidebarOpen(true)}
                    aria-label="Toggle sidebar"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Logo */}
                <button onClick={() => navigate("/admin")} className="flex items-center gap-2">
                    <span className="text-red-600 text-xl lg:text-2xl font-bold">Mê Phim</span>
                </button>

                {/* Search Bar - Hidden on small mobile, shown on larger screens */}
                <div className="relative hidden md:block w-64 lg:w-96">
                    {/* Icon search bên trái */}
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <Search className="w-4 h-4 text-gray-400" />
                    </div>

                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Tìm kiếm phim..."
                        className="w-full pl-10 pr-4 py-2 bg-[#1e2753] text-white rounded-lg border border-gray-600 focus:outline-none focus:border-indigo-500 text-sm lg:text-base"
                    />

                    {showResults && (
                        <ul className="absolute top-14 left-0 w-full bg-[#1e2753] rounded-lg shadow-lg text-white z-50 max-h-60 overflow-y-auto border border-gray-600">
                            {filteredResults.length > 0 ? (
                                filteredResults.map((movie) => (
                                    <li
                                        key={movie.id}
                                        className="px-4 py-2 hover:bg-indigo-500 cursor-pointer text-sm lg:text-base"
                                        onClick={handleResultClick}
                                    >
                                        <button onClick={() => navigate(`/admin/movies/${movie.id}`)}>{movie.name}</button>
                                    </li>
                                ))
                            ) : (
                                <li className="px-4 py-2 text-gray-400 text-sm lg:text-base">
                                    Không tìm thấy kết quả
                                </li>
                            )}
                        </ul>
                    )}
                </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3 lg:gap-6 text-white">
                {/* Mobile Search Button */}
                <button className="md:hidden p-2 rounded-md hover:bg-gray-700 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>

                {/* Notifications */}
                <button className="hidden sm:block p-2 rounded-md hover:bg-gray-700 transition-colors relative">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 17h5l-5 5-5-5h5v-12a3 3 0 016 0v12z"
                        />
                    </svg>
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
                </button>

                {/* Fullscreen Button */}
                <button className="hidden lg:block p-2 rounded-md hover:bg-gray-700 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="white">
                        <path d="M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z" />
                    </svg>
                </button>

                {/* User Menu */}
                <div className="relative">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={toggleMenu}>
                        <div className="bg-red-600 text-white w-8 h-8 flex items-center justify-center rounded-full uppercase">
                            {(user?.name || user?.username || user?.email || "A").charAt(0)}
                        </div>
                        <span className="text-sm hidden sm:block truncate max-w-20 lg:max-w-none">
              {user?.name || user?.username || "ADMIN"}
            </span>
                        <svg className="w-4 h-4 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>

                    {menuVisible && (
                        <ul className="absolute right-0 mt-2 w-48 bg-[#1e2753] shadow-lg rounded-md z-50 border border-gray-600">
                            <li className="px-4 py-3 border-b border-gray-600">
                                <div className="text-sm font-medium text-white truncate">{user?.name || user?.username || "Admin"}</div>
                                <div className="text-xs text-gray-400 truncate">{user?.email || user?.username}</div>
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer">
                                <button onClick={() => navigate("/admin/users")} className="text-sm w-full text-left">
                                    Quản lý người dùng
                                </button>
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer">
                                <button onClick={() => navigate("/profile")} className="text-sm w-full text-left">
                                    Hồ sơ cá nhân
                                </button>
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer border-t border-gray-600">
                                <button onClick={handleLogout} className="text-red-400 text-sm w-full text-left">
                                    Đăng xuất
                                </button>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AdminHeader