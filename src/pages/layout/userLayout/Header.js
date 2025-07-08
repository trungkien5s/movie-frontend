

import { ChevronDown, User, Heart, Settings, LogOut, Menu, X, Film, Star, History } from "lucide-react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import { useAuth } from "../../../components/contexts/AuthContext"
import Button from "../../../components/button/Button"
import SearchBar from "./SeachBar";

export default function Header() {
    const { user, logout, loading, isAuthenticated } = useAuth()
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false)
    const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [genres, setGenres] = useState([])
    const [loadingGenres, setLoadingGenres] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const [scrolled, setScrolled] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const apiURL = process.env.REACT_APP_API_URL

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10
            setScrolled(isScrolled)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Fetch genres from API
    useEffect(() => {
        const fetchGenres = async () => {
            setLoadingGenres(true)
            try {
                const response = await axios.get(`${apiURL}/api/genres/`)
                if (response.data && Array.isArray(response.data)) {
                    setGenres(response.data)
                } else if (response.data && response.data.genres && Array.isArray(response.data.genres)) {
                    setGenres(response.data.genres)
                } else {
                    console.warn("Unexpected API response format:", response.data)
                    setGenres([])
                }
            } catch (error) {
                console.error("Error fetching genres:", error)
                setGenres([])
            } finally {
                setLoadingGenres(false)
            }
        }
        fetchGenres()
    }, [apiURL])

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("access_token")
            if (!token) {
                alert("Đăng xuất thành công!")
                navigate("/auth/sign-in")
                return
            }
            const response = await axios.post(
                `${apiURL}/api/auth/logout`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                },
            )
            if (response.status === 200) {
                localStorage.removeItem("access_token")
                alert("Bạn đã đăng xuất thành công!")
                navigate("/auth/sign-in")
            } else {
                alert("Có lỗi xảy ra trong quá trình đăng xuất. Vui lòng thử lại!")
            }
        } catch (error) {
            console.error("Chi tiết lỗi đăng xuất:", error)
            localStorage.removeItem("access_token")
            navigate("/auth/sign-in")
        }
    }

    const handleProfileClick = () => {
        setIsGenreDropdownOpen(false)
        setIsCountryDropdownOpen(false)
        setIsUserMenuOpen(false)
        navigate("/profile")
    }

    const handleGenreClick = (genreName) => {
        const genreSlug = genreName.toLowerCase().replace(/\s+/g, "-")
        navigate(`/genre?genre=${encodeURIComponent(genreSlug)}`)
        setIsGenreDropdownOpen(false)
        setIsMobileMenuOpen(false)
    }

    const handleSearchResults = (results) => {
        setSearchResults(results)
        if (results.length > 0) {
            navigate("/search-results", { state: { results } })
        }
    }

    const toggleGenreDropdown = () => {
        setIsGenreDropdownOpen((prev) => !prev)
        setIsCountryDropdownOpen(false)
        setIsUserMenuOpen(false)
    }

    const toggleCountryDropdown = () => {
        setIsCountryDropdownOpen((prev) => !prev)
        setIsGenreDropdownOpen(false)
        setIsUserMenuOpen(false)
    }

    const toggleUserMenu = () => {
        setIsUserMenuOpen((prev) => !prev)
        setIsGenreDropdownOpen(false)
        setIsCountryDropdownOpen(false)
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

    // Check if current page is genre page
    const isGenrePage = location.pathname === "/genre"
    const currentGenreParam = new URLSearchParams(location.search).get("genre")

    // Countries data
    const countries = [
        { name: "Việt Nam", flag: "🇻🇳" },
        { name: "Hàn Quốc", flag: "🇰🇷" },
        { name: "Nhật Bản", flag: "🇯🇵" },
        { name: "Mỹ", flag: "🇺🇸" },
        { name: "Trung Quốc", flag: "🇨🇳" },
        { name: "Thái Lan", flag: "🇹🇭" },
    ]

    // Show loading state while checking authentication
    if (loading) {
        return (
            <header className="bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/50 sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl animate-pulse"></div>
                            <div className="w-24 h-6 bg-slate-700 rounded animate-pulse"></div>
                        </div>
                        <div className="w-8 h-8 bg-slate-700 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </header>
        )
    }

    return (
        <>
            {/* Backdrop for closing dropdowns */}
            {(isGenreDropdownOpen || isCountryDropdownOpen || isUserMenuOpen) && (
                <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={closeAllDropdowns} />
            )}

            <header
                className={`sticky top-0 z-50 transition-all duration-500 ${
                    scrolled
                        ? "bg-slate-950/98 backdrop-blur-2xl border-b border-slate-800/60 shadow-2xl shadow-black/20"
                        : "bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/50"
                }`}
            >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-transparent to-slate-950/50 pointer-events-none"></div>

                <div className="container mx-auto px-4 py-4 relative">
                    {/* Mobile Layout (< 768px) */}
                    <div className="flex md:hidden items-center justify-between">
                        {/* Mobile Logo */}
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="relative">
                                <div className="w-10 h-10 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/25 group-hover:shadow-red-500/40 transition-all duration-300 group-hover:scale-105">
                                    <Film className="w-6 h-6 text-white" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
                            </div>
                            <span className="text-white text-lg font-bold bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                Mê Phim
              </span>
                        </Link>

                        {/* Mobile Right Side */}
                        <div className="flex items-center space-x-3">
                            {/* Mobile User Menu */}
                            {isAuthenticated && user ? (
                                <div className="relative">
                                    <button
                                        onClick={toggleUserMenu}
                                        className="flex items-center text-white hover:text-red-400 transition-all duration-300 group"
                                    >
                                        <div className="relative">
                                            <div className="w-9 h-9 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-500/25 group-hover:shadow-red-500/40 transition-all duration-300 group-hover:scale-105">
                        <span className="text-white font-semibold text-sm">
                          {(user.email_or_username || user.username || user.email).charAt(0).toUpperCase()}
                        </span>
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-slate-950 rounded-full"></div>
                                        </div>
                                    </button>

                                    {/* Mobile User Dropdown */}
                                    {isUserMenuOpen && (
                                        <div className="absolute right-0 mt-3 w-64 bg-slate-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-slate-700/50 py-4 z-50">
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent rounded-2xl"></div>
                                            <div className="relative">
                                                <div className="px-4 py-3 border-b border-slate-700/50">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {(user.email_or_username || user.username || user.email).charAt(0).toUpperCase()}
                              </span>
                                                        </div>
                                                        <div>
                                                            <p className="text-white font-semibold text-sm">
                                                                {user.name || user.username || user.email}
                                                            </p>
                                                            <p className="text-slate-400 text-xs">{user.email || user.username}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="py-2">
                                                    <button
                                                        onClick={handleProfileClick}
                                                        className="flex items-center w-full px-4 py-2.5 text-slate-300 hover:bg-slate-800/50 hover:text-white transition-all duration-300 group"
                                                    >
                                                        <User className="w-4 h-4 mr-3" />
                                                        <span>Hồ sơ cá nhân</span>
                                                    </button>
                                                    <button className="flex items-center w-full px-4 py-2.5 text-slate-300 hover:bg-slate-800/50 hover:text-white transition-all duration-300 group">
                                                        <Heart className="w-4 h-4 mr-3" />
                                                        <span>Phim yêu thích</span>
                                                    </button>
                                                    <button className="flex items-center w-full px-4 py-2.5 text-slate-300 hover:bg-slate-800/50 hover:text-white transition-all duration-300 group">
                                                        <History className="w-4 h-4 mr-3" />
                                                        <span>Danh sách đã xem</span>
                                                    </button>
                                                    <button className="flex items-center w-full px-4 py-2.5 text-slate-300 hover:bg-slate-800/50 hover:text-white transition-all duration-300 group">
                                                        <Settings className="w-4 h-4 mr-3" />
                                                        <span>Cài đặt</span>
                                                    </button>
                                                </div>
                                                <div className="border-t border-slate-700/50 pt-2">
                                                    <button
                                                        onClick={handleLogout}
                                                        className="flex items-center w-full px-4 py-2.5 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300 group"
                                                    >
                                                        <LogOut className="w-4 h-4 mr-3" />
                                                        <span>Đăng xuất</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Button
                                    onClick={() => navigate("/auth/sign-in")}
                                    className="relative overflow-hidden bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:scale-105 group text-sm"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-white/20 to-red-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                    <div className="relative flex items-center space-x-1">
                                        <User className="w-4 h-4" />
                                        <span>Đăng nhập</span>
                                    </div>
                                </Button>
                            )}

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="relative p-2 text-white hover:text-red-400 transition-all duration-300 hover:bg-slate-800/50 rounded-xl group"
                            >
                                <div className="relative w-6 h-6">
                                    <Menu
                                        className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                                            isMobileMenuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                                        }`}
                                    />
                                    <X
                                        className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                                            isMobileMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                                        }`}
                                    />
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Search Bar - Full width below header */}


                    {/* Tablet Layout (768px - 1024px) */}
                    <div className="hidden md:flex lg:hidden items-center justify-between gap-4">
                        {/* Tablet Logo */}
                        <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
                            <div className="relative">
                                <div className="w-11 h-11 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/25 group-hover:shadow-red-500/40 transition-all duration-300 group-hover:scale-105">
                                    <Film className="w-6 h-6 text-white" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
                            </div>
                            <div className="flex flex-col">
                <span className="text-white text-xl font-bold bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                  Mê Phim
                </span>
                                <span className="text-slate-400 text-xs font-medium -mt-1">Cinema Experience</span>
                            </div>
                        </Link>

                        {/* Tablet Search Bar */}
                        <div className="flex-1 max-w-md mx-4">
                            <div className="relative w-full group">
                                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl blur-lg group-focus-within:blur-xl transition-all duration-500 opacity-0 group-focus-within:opacity-100"></div>
                                <SearchBar className="relative w-full" onSearchResults={handleSearchResults} />
                            </div>
                        </div>

                        {/* Tablet Right Side */}
                        <div className="flex items-center space-x-3 flex-shrink-0">
                            {/* Tablet User Menu */}
                            {isAuthenticated && user ? (
                                <div className="relative">
                                    <button
                                        onClick={toggleUserMenu}
                                        className="flex items-center space-x-2 text-white hover:text-red-400 transition-all duration-300 group"
                                    >
                                        <div className="relative">
                                            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-500/25 group-hover:shadow-red-500/40 transition-all duration-300 group-hover:scale-105">
                        <span className="text-white font-semibold text-sm">
                          {(user.email_or_username || user.username || user.email).charAt(0).toUpperCase()}
                        </span>
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-slate-950 rounded-full"></div>
                                        </div>
                                        <div className="text-left">
                                            <p className="font-medium text-sm">{user.name || user.username || user.email}</p>
                                            <p className="text-slate-400 text-xs">Premium Member</p>
                                        </div>
                                        <ChevronDown
                                            className={`w-4 h-4 transition-transform duration-300 ${isUserMenuOpen ? "rotate-180" : ""}`}
                                        />
                                    </button>

                                    {/* Tablet User Dropdown */}
                                    {isUserMenuOpen && (
                                        <div className="absolute right-0 mt-3 w-72 bg-slate-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-slate-700/50 py-4 z-50">
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent rounded-2xl"></div>
                                            <div className="relative">
                                                <div className="px-6 py-4 border-b border-slate-700/50">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold">
                                {(user.email_or_username || user.username || user.email).charAt(0).toUpperCase()}
                              </span>
                                                        </div>
                                                        <div>
                                                            <p className="text-white font-semibold">{user.name || user.username || user.email}</p>
                                                            <p className="text-slate-400 text-sm">{user.email || user.username}</p>
                                                            <div className="flex items-center mt-1">
                                                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                                                <span className="text-green-400 text-xs font-medium">Online</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="py-2">
                                                    <button
                                                        onClick={handleProfileClick}
                                                        className="flex items-center w-full px-6 py-3 text-slate-300 hover:bg-slate-800/50 hover:text-white transition-all duration-300 group"
                                                    >
                                                        <User className="w-5 h-5 mr-4 group-hover:scale-110 transition-transform duration-300" />
                                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                              Hồ sơ cá nhân
                            </span>
                                                    </button>
                                                    <button className="flex items-center w-full px-6 py-3 text-slate-300 hover:bg-slate-800/50 hover:text-white transition-all duration-300 group">
                                                        <Heart className="w-5 h-5 mr-4 group-hover:scale-110 transition-transform duration-300" />
                                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                              Phim yêu thích
                            </span>
                                                    </button>
                                                    <button className="flex items-center w-full px-6 py-3 text-slate-300 hover:bg-slate-800/50 hover:text-white transition-all duration-300 group">
                                                        <History className="w-5 h-5 mr-4 group-hover:scale-110 transition-transform duration-300" />
                                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                              Danh sách đã xem
                            </span>
                                                    </button>
                                                    <button className="flex items-center w-full px-6 py-3 text-slate-300 hover:bg-slate-800/50 hover:text-white transition-all duration-300 group">
                                                        <Settings className="w-5 h-5 mr-4 group-hover:scale-110 transition-transform duration-300" />
                                                        <span className="group-hover:translate-x-1 transition-transform duration-300">Cài đặt</span>
                                                    </button>
                                                </div>
                                                <div className="border-t border-slate-700/50 pt-2">
                                                    <button
                                                        onClick={handleLogout}
                                                        className="flex items-center w-full px-6 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300 group"
                                                    >
                                                        <LogOut className="w-5 h-5 mr-4 group-hover:scale-110 transition-transform duration-300" />
                                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                              Đăng xuất
                            </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Button
                                    onClick={() => navigate("/auth/sign-in")}
                                    className="relative overflow-hidden bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:scale-105 group"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-white/20 to-red-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                    <div className="relative flex items-center space-x-2">
                                        <User className="w-4 h-4" />
                                        <span>Đăng nhập</span>
                                    </div>
                                </Button>
                            )}

                            {/* Tablet Menu Button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="relative p-3 text-white hover:text-red-400 transition-all duration-300 hover:bg-slate-800/50 rounded-xl group"
                            >
                                <div className="relative w-6 h-6">
                                    <Menu
                                        className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                                            isMobileMenuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                                        }`}
                                    />
                                    <X
                                        className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                                            isMobileMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                                        }`}
                                    />
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Desktop Layout (1024px+) */}
                    <div className="hidden lg:flex items-center justify-between">
                        {/* Desktop Logo - Compact version */}
                        <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
                            <div className="relative">
                                <div className="w-10 h-10 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/25 group-hover:shadow-red-500/40 transition-all duration-300 group-hover:scale-105">
                                    <Film className="w-6 h-6 text-white" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
                            </div>
                            <span className="text-white text-xl font-bold bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                Mê Phim
              </span>
                        </Link>

                        {/* Desktop Search Bar - Expanded */}
                        <div className="flex-1 max-w-3xl mx-8">
                            <div className="relative w-full group">
                                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl blur-lg group-focus-within:blur-xl transition-all duration-500 opacity-0 group-focus-within:opacity-100"></div>
                                <SearchBar className="relative w-full" onSearchResults={handleSearchResults} />
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center space-x-1 text-sm flex-shrink-0">
                            {/* Genre Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={toggleGenreDropdown}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 font-medium group ${
                                        isGenrePage
                                            ? "text-red-400 bg-red-500/10 border border-red-500/20"
                                            : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                                    }`}
                                >
                                    <span>Thể loại</span>
                                    <ChevronDown
                                        className={`w-4 h-4 transition-transform duration-300 ${isGenreDropdownOpen ? "rotate-180" : ""}`}
                                    />
                                </button>

                                {isGenreDropdownOpen && (
                                    <div className="absolute top-full left-0 mt-3 w-64 bg-slate-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-slate-700/50 py-3 z-50 max-h-80 overflow-y-auto">
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent rounded-2xl"></div>
                                        <div className="relative">
                                            <button
                                                onClick={() => {
                                                    navigate("/genres")
                                                    setIsGenreDropdownOpen(false)
                                                }}
                                                className="flex items-center w-full px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300 font-medium border-b border-slate-700/50 group"
                                            >
                                                <Star className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform duration-300" />
                                                <span>Xem tất cả thể loại</span>
                                            </button>

                                            {loadingGenres ? (
                                                <div className="px-4 py-6 text-slate-400 text-center">
                                                    <div className="w-6 h-6 border-2 border-slate-600 border-t-red-500 rounded-full animate-spin mx-auto mb-2"></div>
                                                    <span>Đang tải...</span>
                                                </div>
                                            ) : genres.length > 0 ? (
                                                <div className="grid grid-cols-1 gap-1 p-2">
                                                    {genres.map((genre) => {
                                                        const genreName = typeof genre === "string" ? genre : genre.name
                                                        const genreSlug = genreName.toLowerCase().replace(/\s+/g, "-")
                                                        const isActive = currentGenreParam === genreSlug

                                                        return (
                                                            <button
                                                                key={genre.id || genreName}
                                                                onClick={() => handleGenreClick(genreName)}
                                                                className={`text-left px-4 py-2.5 rounded-xl transition-all duration-300 group ${
                                                                    isActive
                                                                        ? "text-red-400 bg-red-500/10 border border-red-500/20 font-medium"
                                                                        : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                                                                }`}
                                                            >
                                <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">
                                  {genreName}
                                </span>
                                                            </button>
                                                        )
                                                    })}
                                                </div>
                                            ) : (
                                                <div className="px-4 py-6 text-slate-400 text-center">Không có thể loại</div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Navigation Buttons */}
                            <button
                                onClick={() => navigate("/phim-le")}
                                className={`px-4 py-2 rounded-xl transition-all duration-300 font-medium ${
                                    location.pathname === "/phim-le"
                                        ? "text-red-400 bg-red-500/10 border border-red-500/20"
                                        : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                                }`}
                            >
                                Phim Lẻ
                            </button>

                            <button
                                onClick={() => navigate("/phim-bo")}
                                className={`px-4 py-2 rounded-xl transition-all duration-300 font-medium ${
                                    location.pathname === "/phim-bo"
                                        ? "text-red-400 bg-red-500/10 border border-red-500/20"
                                        : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                                }`}
                            >
                                Phim Bộ
                            </button>

                            {/* Country Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={toggleCountryDropdown}
                                    className="flex items-center space-x-2 px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-300 font-medium"
                                >
                                    <span>Quốc gia</span>
                                    <ChevronDown
                                        className={`w-4 h-4 transition-transform duration-300 ${isCountryDropdownOpen ? "rotate-180" : ""}`}
                                    />
                                </button>

                                {isCountryDropdownOpen && (
                                    <div className="absolute top-full left-0 mt-3 w-56 bg-slate-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-slate-700/50 py-3 z-50">
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent rounded-2xl"></div>
                                        <div className="relative space-y-1 p-2">
                                            {countries.map((country) => (
                                                <button
                                                    key={country.name}
                                                    className="flex items-center w-full px-4 py-2.5 text-slate-300 hover:bg-slate-800/50 hover:text-white rounded-xl transition-all duration-300 group"
                                                >
                                                    <span className="text-lg mr-3">{country.flag}</span>
                                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                            {country.name}
                          </span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button className="px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-300 font-medium">
                                Diễn Viên
                            </button>

                            <Link
                                to="/movies"
                                className="px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-300 font-medium"
                            >
                                Toàn bộ phim
                            </Link>
                        </nav>

                        {/* Desktop Right side - User menu */}
                        <div className="flex items-center space-x-4 flex-shrink-0">
                            {/* Desktop User Authentication */}
                            {isAuthenticated && user ? (
                                <div className="relative">
                                    <button
                                        onClick={toggleUserMenu}
                                        className="flex items-center space-x-3 text-white hover:text-red-400 transition-all duration-300 group"
                                    >
                                        <div className="relative">
                                            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-500/25 group-hover:shadow-red-500/40 transition-all duration-300 group-hover:scale-105">
                        <span className="text-white font-semibold text-sm">
                          {(user.email_or_username || user.username || user.email).charAt(0).toUpperCase()}
                        </span>
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-slate-950 rounded-full"></div>
                                        </div>
                                        <div className="hidden md:block">
                                            <div className="text-left">
                                                <p className="font-medium text-sm">{user.name || user.username || user.email}</p>
                                                <p className="text-slate-400 text-xs">Premium Member</p>
                                            </div>
                                        </div>
                                        <ChevronDown
                                            className={`w-4 h-4 hidden lg:block transition-transform duration-300 ${
                                                isUserMenuOpen ? "rotate-180" : ""
                                            }`}
                                        />
                                    </button>

                                    {/* Desktop User Dropdown Menu */}
                                    {isUserMenuOpen && (
                                        <div className="absolute right-0 mt-3 w-72 bg-slate-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-slate-700/50 py-4 z-50">
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent rounded-2xl"></div>
                                            <div className="relative">
                                                <div className="px-6 py-4 border-b border-slate-700/50">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold">
                                {(user.email_or_username || user.username || user.email).charAt(0).toUpperCase()}
                              </span>
                                                        </div>
                                                        <div>
                                                            <p className="text-white font-semibold">{user.name || user.username || user.email}</p>
                                                            <p className="text-slate-400 text-sm">{user.email || user.username}</p>
                                                            <div className="flex items-center mt-1">
                                                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                                                <span className="text-green-400 text-xs font-medium">Online</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="py-2">
                                                    <button
                                                        onClick={handleProfileClick}
                                                        className="flex items-center w-full px-6 py-3 text-slate-300 hover:bg-slate-800/50 hover:text-white transition-all duration-300 group"
                                                    >
                                                        <User className="w-5 h-5 mr-4 group-hover:scale-110 transition-transform duration-300" />
                                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                              Hồ sơ cá nhân
                            </span>
                                                    </button>
                                                    <button className="flex items-center w-full px-6 py-3 text-slate-300 hover:bg-slate-800/50 hover:text-white transition-all duration-300 group">
                                                        <Heart className="w-5 h-5 mr-4 group-hover:scale-110 transition-transform duration-300" />
                                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                              Phim yêu thích
                            </span>
                                                    </button>
                                                    <button className="flex items-center w-full px-6 py-3 text-slate-300 hover:bg-slate-800/50 hover:text-white transition-all duration-300 group">
                                                        <History className="w-5 h-5 mr-4 group-hover:scale-110 transition-transform duration-300" />
                                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                              Danh sách đã xem
                            </span>
                                                    </button>
                                                    <button className="flex items-center w-full px-6 py-3 text-slate-300 hover:bg-slate-800/50 hover:text-white transition-all duration-300 group">
                                                        <Settings className="w-5 h-5 mr-4 group-hover:scale-110 transition-transform duration-300" />
                                                        <span className="group-hover:translate-x-1 transition-transform duration-300">Cài đặt</span>
                                                    </button>
                                                </div>
                                                <div className="border-t border-slate-700/50 pt-2">
                                                    <button
                                                        onClick={handleLogout}
                                                        className="flex items-center w-full px-6 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300 group"
                                                    >
                                                        <LogOut className="w-5 h-5 mr-4 group-hover:scale-110 transition-transform duration-300" />
                                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                              Đăng xuất
                            </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="hidden md:flex items-center space-x-3">
                                    <Button
                                        onClick={() => navigate("/auth/sign-in")}
                                        className="relative overflow-hidden bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:scale-105 group"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-white/20 to-red-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                        <div className="relative flex items-center space-x-2">
                                            <User className="w-4 h-4" />
                                            <span>Đăng nhập</span>
                                        </div>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Enhanced Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden border-t border-slate-800/50 bg-slate-950/98 backdrop-blur-2xl">
                        {/* Mobile Search Bar - Only show on very small screens */}
                        <div className="md:hidden px-6 py-4 border-b border-slate-800/50">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl blur-lg group-focus-within:blur-xl transition-all duration-500 opacity-0 group-focus-within:opacity-100"></div>
                                <SearchBar className="relative w-full" onSearchResults={handleSearchResults} />
                            </div>
                        </div>

                        {/* Enhanced Mobile Navigation */}
                        <nav className="py-2">
                            {/* Mobile Genre Section */}
                            <div className="border-b border-slate-800/50">
                                <button
                                    onClick={toggleGenreDropdown}
                                    className={`flex items-center justify-between w-full px-6 py-4 transition-all duration-300 font-medium group ${
                                        isGenrePage ? "text-red-400 bg-red-500/10" : "text-white hover:bg-slate-800/50 hover:text-red-400"
                                    }`}
                                >
                                    <div className="flex items-center space-x-3">
                                        <Star className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                                        <span>Thể loại</span>
                                    </div>
                                    <ChevronDown
                                        className={`w-5 h-5 transition-transform duration-300 ${isGenreDropdownOpen ? "rotate-180" : ""}`}
                                    />
                                </button>

                                {isGenreDropdownOpen && (
                                    <div className="bg-slate-900/50 backdrop-blur-xl max-h-64 overflow-y-auto">
                                        <button
                                            onClick={() => {
                                                navigate("/genre")
                                                closeMobileMenu()
                                            }}
                                            className="flex items-center w-full px-10 py-3 text-red-400 hover:bg-slate-800/50 hover:text-red-300 transition-all duration-300 font-medium border-b border-slate-700/50 group"
                                        >
                                            <Film className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform duration-300" />
                                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                        Xem tất cả thể loại
                      </span>
                                        </button>

                                        {loadingGenres ? (
                                            <div className="px-10 py-6 text-slate-400 text-center">
                                                <div className="w-6 h-6 border-2 border-slate-600 border-t-red-500 rounded-full animate-spin mx-auto mb-2"></div>
                                                <span>Đang tải...</span>
                                            </div>
                                        ) : genres.length > 0 ? (
                                            genres.map((genre) => {
                                                const genreName = typeof genre === "string" ? genre : genre.name
                                                const genreSlug = genreName.toLowerCase().replace(/\s+/g, "-")
                                                const isActive = currentGenreParam === genreSlug

                                                return (
                                                    <button
                                                        key={genre.id || genreName}
                                                        onClick={() => handleGenreClick(genreName)}
                                                        className={`block w-full text-left px-10 py-3 transition-all duration-300 group ${
                                                            isActive
                                                                ? "text-red-400 bg-slate-800/50 font-medium"
                                                                : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                                                        }`}
                                                    >
                            <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">
                              {genreName}
                            </span>
                                                    </button>
                                                )
                                            })
                                        ) : (
                                            <div className="px-10 py-6 text-slate-400 text-center">Không có thể loại</div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Other Mobile Menu Items */}
                            <button
                                onClick={() => {
                                    navigate("/phim-le")
                                    closeMobileMenu()
                                }}
                                className={`flex items-center w-full px-6 py-4 transition-all duration-300 font-medium group ${
                                    location.pathname === "/phim-le"
                                        ? "text-red-400 bg-red-500/10"
                                        : "text-white hover:bg-slate-800/50 hover:text-red-400"
                                }`}
                            >
                                <Film className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                                <span className="group-hover:translate-x-1 transition-transform duration-300">Phim Lẻ</span>
                            </button>

                            <button
                                onClick={() => {
                                    navigate("/phim-bo")
                                    closeMobileMenu()
                                }}
                                className={`flex items-center w-full px-6 py-4 transition-all duration-300 font-medium group ${
                                    location.pathname === "/phim-bo"
                                        ? "text-red-400 bg-red-500/10"
                                        : "text-white hover:bg-slate-800/50 hover:text-red-400"
                                }`}
                            >
                                <Film className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                                <span className="group-hover:translate-x-1 transition-transform duration-300">Phim Bộ</span>
                            </button>

                            {/* Mobile Country Section */}
                            <div className="border-b border-slate-800/50">
                                <button
                                    onClick={toggleCountryDropdown}
                                    className="flex items-center justify-between w-full px-6 py-4 text-white hover:bg-slate-800/50 hover:text-red-400 transition-all duration-300 font-medium group"
                                >
                                    <div className="flex items-center space-x-3">
                                        <span className="text-lg">🌍</span>
                                        <span>Quốc gia</span>
                                    </div>
                                    <ChevronDown
                                        className={`w-5 h-5 transition-transform duration-300 ${isCountryDropdownOpen ? "rotate-180" : ""}`}
                                    />
                                </button>

                                {isCountryDropdownOpen && (
                                    <div className="bg-slate-900/50 backdrop-blur-xl">
                                        {countries.map((country) => (
                                            <button
                                                key={country.name}
                                                className="flex items-center w-full px-10 py-3 text-slate-300 hover:bg-slate-800/50 hover:text-white transition-all duration-300 group"
                                            >
                                                <span className="text-lg mr-3">{country.flag}</span>
                                                <span className="group-hover:translate-x-1 transition-transform duration-300">
                          {country.name}
                        </span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button className="flex items-center w-full px-6 py-4 text-white hover:bg-slate-800/50 hover:text-red-400 transition-all duration-300 font-medium group">
                                <User className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                                <span className="group-hover:translate-x-1 transition-transform duration-300">Diễn Viên</span>
                            </button>

                            <Link
                                to="/movies"
                                className="flex items-center w-full px-6 py-4 text-white hover:bg-slate-800/50 hover:text-red-400 transition-all duration-300 font-medium group"
                            >
                                <Film className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                                <span className="group-hover:translate-x-1 transition-transform duration-300">Toàn bộ phim</span>
                            </Link>

                            {/* Mobile Login Button */}
                            {!isAuthenticated && (
                                <div className="px-6 py-4 border-t border-slate-800/50">
                                    <Button
                                        onClick={() => {
                                            navigate("/auth/sign-in")
                                            closeMobileMenu()
                                        }}
                                        className="relative overflow-hidden w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white py-3 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 group"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-white/20 to-red-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                        <div className="relative flex items-center justify-center space-x-2">
                                            <User className="w-5 h-5" />
                                            <span>Đăng nhập</span>
                                        </div>
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
