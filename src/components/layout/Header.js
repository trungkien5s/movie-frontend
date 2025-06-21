import {Search, ChevronDown, User, Bell, Heart, Settings, LogOut, Menu, X} from "lucide-react"
import Input from "../input/Input";
import Button from "../button/Button";
import {Link, useNavigate} from "react-router-dom";
import SeachBar from "./SeachBar";
import {useAuth} from "../contexts/AuthContext";
import {useState} from "react";
import SearchBar from "./SeachBar";

export default function Header() {
    const { user, logout, loading, isAuthenticated } = useAuth()
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false)
    const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        setIsUserMenuOpen(false)
        navigate("/")
    }

    const handleProfileClick = () => {
        setIsGenreDropdownOpen(false) // Close Genre dropdown when profile is clicked
        setIsCountryDropdownOpen(false) // Close Country dropdown when profile is clicked
        setIsUserMenuOpen(false) // Close user menu when navigating to profile
        navigate("/profile")
    }

    const toggleGenreDropdown = () => {
        setIsGenreDropdownOpen((prev) => !prev)
        setIsCountryDropdownOpen(false) // Close Country dropdown if open
        setIsUserMenuOpen(false) // Close user menu if open
    }

    const toggleCountryDropdown = () => {
        setIsCountryDropdownOpen((prev) => !prev)
        setIsGenreDropdownOpen(false) // Close Genre dropdown if open
        setIsUserMenuOpen(false) // Close user menu if open
    }

    const toggleUserMenu = () => {
        setIsUserMenuOpen((prev) => !prev)
        setIsGenreDropdownOpen(false) // Close Genre dropdown if open
        setIsCountryDropdownOpen(false) // Close Country dropdown if open
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
        setIsGenreDropdownOpen(false)
        setIsCountryDropdownOpen(false)
    }

    const closeAllDropdowns = () => {
        setIsGenreDropdownOpen(false)
        setIsCountryDropdownOpen(false)
        setIsUserMenuOpen(false)
    }

    // Show loading state while checking authentication
    if (loading) {
        return (
            <header className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex-shrink-0">
                            <div className="text-red-600 text-2xl font-bold">Mê Phim</div>
                        </div>
                        <div className="w-8 h-8 bg-gray-700 rounded animate-pulse"></div>
                    </div>
                </div>
            </header>
        )
    }

    return (
        <>
            {/* Backdrop for closing dropdowns */}
            {(isGenreDropdownOpen || isCountryDropdownOpen || isUserMenuOpen) && (
                <div className="fixed inset-0 z-40" onClick={closeAllDropdowns} />
            )}

            <header className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
                <div className="container mx-auto px-6 py-3">
                    <div className="flex items-center justify-between gap-4">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <button
                                onClick={() => navigate("/")}
                                className="text-red-600 text-xl font-bold hover:text-red-500 transition-colors"
                            >
                                Mê Phim
                            </button>
                        </div>

                        {/* Search Bar - Hidden on mobile, shown on tablet+ */}
                        <div className="hidden md:flex flex-grow">
                            <SearchBar className="w-full lg:w-96 text-lg" />
                        </div>

                        {/* Main Navigation - Hidden on mobile */}
                        <nav className="hidden lg:flex items-center space-x-4 text-sm">
                            {/* Genre Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={toggleGenreDropdown}
                                    className="flex items-center space-x-1 text-white hover:text-red-400 transition-colors font-medium"
                                >
                                    <span>Thể loại</span>
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                                {isGenreDropdownOpen && (
                                    <div className="absolute top-full left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2 z-50">
                                        <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
                                            Hành động
                                        </a>
                                        <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
                                            Kinh dị
                                        </a>
                                        <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
                                            Hài hước
                                        </a>
                                        <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
                                            Lãng mạn
                                        </a>
                                        <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
                                            Khoa học viễn tưởng
                                        </a>
                                        <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
                                            Tâm lý
                                        </a>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() => navigate("/phim-le")}
                                className="text-white hover:text-red-400 transition-colors font-medium"
                            >
                                Phim Lẻ
                            </button>

                            <button
                                onClick={() => navigate("/phim-bo")}
                                className="text-white hover:text-red-400 transition-colors font-medium"
                            >
                                Phim Bộ
                            </button>

                            {/* Country Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={toggleCountryDropdown}
                                    className="flex items-center space-x-1 text-white hover:text-red-400 transition-colors font-medium"
                                >
                                    <span>Quốc gia</span>
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                                {isCountryDropdownOpen && (
                                    <div className="absolute top-full left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2 z-50">
                                        <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
                                            Việt Nam
                                        </a>
                                        <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
                                            Hàn Quốc
                                        </a>
                                        <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
                                            Nhật Bản
                                        </a>
                                        <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
                                            Mỹ
                                        </a>
                                        <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
                                            Trung Quốc
                                        </a>
                                        <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
                                            Thái Lan
                                        </a>
                                    </div>
                                )}
                            </div>

                            <a href="#" className="text-white hover:text-red-400 transition-colors font-medium">
                                Diễn Viên
                            </a>

                            <a href="#" className="text-white hover:text-red-400 transition-colors font-medium">
                                Lịch chiếu
                            </a>
                        </nav>

                        {/* Right side - User menu + Mobile menu button */}
                        <div className="flex items-center space-x-4 flex-shrink-0  ">
                            {/* User Authentication */}
                            {isAuthenticated && user ? (
                                <div className="relative">
                                    <button
                                        onClick={toggleUserMenu}
                                        className="flex items-center space-x-2 text-white hover:text-red-400 transition-colors"
                                    >
                                        <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {(user.name || user.username || user.email).charAt(0).toUpperCase()}
                      </span>
                                        </div>
                                        <span className="hidden md:block font-medium text-sm">
                      {user.name || user.username || user.email}
                    </span>
                                        <ChevronDown className="w-4 h-4 hidden lg:block" />
                                    </button>

                                    {/* User Dropdown Menu */}
                                    {isUserMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2 z-50">
                                            <div className="px-4 py-3 border-b border-gray-700">
                                                <p className="text-white font-semibold text-sm">{user.name || user.username || user.email}</p>
                                                <p className="text-gray-400 text-sm">{user.email || user.username}</p>
                                            </div>
                                            <button
                                                onClick={handleProfileClick}
                                                className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors text-sm"
                                            >
                                                <User className="w-4 h-4 mr-3" />
                                                Hồ sơ cá nhân
                                            </button>
                                            <a
                                                href="#"
                                                className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors text-sm"
                                            >
                                                <Heart className="w-4 h-4 mr-3" />
                                                Phim yêu thích
                                            </a>
                                            <a
                                                href="#"
                                                className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors text-sm"
                                            >
                                                <Settings className="w-4 h-4 mr-3" />
                                                Cài đặt
                                            </a>
                                            <hr className="border-gray-700 my-2" />
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors text-sm"
                                            >
                                                <LogOut className="w-4 h-4 mr-3" />
                                                Đăng xuất
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="hidden md:flex items-center space-x-2">
                                    <Button
                                        onClick={() => navigate("/auth/sign-in")}
                                        variant="outline"
                                        className="border-red-600 text-white hover:bg-red-800 transition-colors text-sm"
                                    >
                                        <User className="w-4 h-4 mr-2" />
                                        Đăng nhập
                                    </Button>
                                </div>
                            )}

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="lg:hidden text-white hover:text-yellow-400 transition-colors p-2"
                            >
                                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu - Shown when hamburger is clicked */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden border-t border-gray-800 bg-gray-900">
                        {/* Mobile Search Bar */}
                        <div className="px-4 py-3 border-b border-gray-800">
                            <SearchBar className="w-full" />
                        </div>

                        {/* Mobile Navigation */}
                        <nav className="py-2">
                            {/* Mobile Genre Section */}
                            <div className="border-b border-gray-800">
                                <button
                                    onClick={toggleGenreDropdown}
                                    className="flex items-center justify-between w-full px-4 py-3 text-white hover:bg-gray-800 hover:text-yellow-400 transition-colors font-medium"
                                >
                                    <span>Thể loại</span>
                                    <ChevronDown className={`w-4 h-4 transition-transform ${isGenreDropdownOpen ? "rotate-180" : ""}`} />
                                </button>
                                {isGenreDropdownOpen && (
                                    <div className="bg-gray-800">
                                        <a href="#" className="block px-8 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
                                            Hành động
                                        </a>
                                        <a href="#" className="block px-8 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
                                            Kinh dị
                                        </a>
                                        <a href="#" className="block px-8 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
                                            Hài hước
                                        </a>
                                        <a href="#" className="block px-8 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
                                            Lãng mạn
                                        </a>
                                        <a href="#" className="block px-8 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
                                            Khoa học viễn tưởng
                                        </a>
                                        <a href="#" className="block px-8 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
                                            Tâm lý
                                        </a>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() => {
                                    navigate("/phim-le")
                                    closeMobileMenu()
                                }}
                                className="block w-full text-left px-4 py-3 text-white hover:bg-gray-800 hover:text-yellow-400 transition-colors font-medium"
                            >
                                Phim Lẻ
                            </button>

                            <button
                                onClick={() => {
                                    navigate("/phim-bo")
                                    closeMobileMenu()
                                }}
                                className="block w-full text-left px-4 py-3 text-white hover:bg-gray-800 hover:text-yellow-400 transition-colors font-medium"
                            >
                                Phim Bộ
                            </button>

                            {/* Mobile Country Section */}
                            <div className="border-b border-gray-800">
                                <button
                                    onClick={toggleCountryDropdown}
                                    className="flex items-center justify-between w-full px-4 py-3 text-white hover:bg-gray-800 hover:text-yellow-400 transition-colors font-medium"
                                >
                                    <span>Quốc gia</span>
                                    <ChevronDown
                                        className={`w-4 h-4 transition-transform ${isCountryDropdownOpen ? "rotate-180" : ""}`}
                                    />
                                </button>
                                {isCountryDropdownOpen && (
                                    <div className="bg-gray-800">
                                        <a href="#" className="block px-8 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
                                            Việt Nam
                                        </a>
                                        <a href="#" className="block px-8 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
                                            Hàn Quốc
                                        </a>
                                        <a href="#" className="block px-8 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
                                            Nhật Bản
                                        </a>
                                        <a href="#" className="block px-8 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
                                            Mỹ
                                        </a>
                                        <a href="#" className="block px-8 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
                                            Trung Quốc
                                        </a>
                                        <a href="#" className="block px-8 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
                                            Thái Lan
                                        </a>
                                    </div>
                                )}
                            </div>

                            <a
                                href="#"
                                className="block px-4 py-3 text-white hover:bg-gray-800 hover:text-yellow-400 transition-colors font-medium"
                            >
                                Diễn Viên
                            </a>

                            <a
                                href="#"
                                className="block px-4 py-3 text-white hover:bg-gray-800 hover:text-yellow-400 transition-colors font-medium"
                            >
                                Lịch chiếu
                            </a>

                            {/* Mobile Login Button */}
                            {!isAuthenticated && (
                                <div className="px-4 py-3 border-t border-gray-800">
                                    <Button
                                        onClick={() => {
                                            navigate("/auth/sign-in")
                                            closeMobileMenu()
                                        }}
                                        className="w-full bg-red-600 text-white hover:bg-red-700 transition-colors"
                                    >
                                        <User className="w-4 h-4 mr-2" />
                                        Đăng nhập
                                    </Button>
                                </div>
                            )}
                        </nav>
                    </div>
                )}
            </header>
        </>
    )
}
