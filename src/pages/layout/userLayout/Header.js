
import { ChevronDown, User, Heart, Settings, LogOut, Menu, X } from "lucide-react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import {useAuth} from "../../../components/contexts/AuthContext";
import SearchBar from "./SeachBar";
import Button from "../../../components/button/Button";

export default function Header() {
    const { user, logout, loading, isAuthenticated } = useAuth()
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false)
    const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [genres, setGenres] = useState([])
    const [loadingGenres, setLoadingGenres] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const navigate = useNavigate()
    const location = useLocation()

    const apiURL = process.env.REACT_APP_API_URL

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
            const token = localStorage.getItem("token")

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
                localStorage.removeItem("token")
                alert("Bạn đã đăng xuất thành công!")
                navigate("/auth/sign-in")
            } else {
                alert("Có lỗi xảy ra trong quá trình đăng xuất. Vui lòng thử lại!")
            }
        } catch (error) {
            console.error("Chi tiết lỗi đăng xuất:", error)
            localStorage.removeItem("token")
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
        // You can navigate to search results page or handle results display
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
                        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
                            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-lg">M</span>
                            </div>
                            <span className="text-red-500 text-2xl font-bold">Mê Phim</span>
                        </Link>

                        {/* Search Bar - Hidden on mobile, shown on tablet+ */}
                        <div className="hidden md:flex flex-grow max-w-2xl mx-4">
                            <SearchBar className="w-full" onSearchResults={handleSearchResults} />
                        </div>

                        {/* Main Navigation - Hidden on mobile */}
                        <nav className="hidden lg:flex items-center space-x-4 text-sm flex-shrink-0">
                            {/* Genre Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={toggleGenreDropdown}
                                    className={`flex items-center space-x-1 transition-colors font-medium ${
                                        isGenrePage ? "text-red-400 border-b-2 border-red-400 pb-1" : "text-white hover:text-red-400"
                                    }`}
                                >
                                    <span>Thể loại</span>
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                                {isGenreDropdownOpen && (
                                    <div className="absolute top-full left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2 z-50 max-h-60 overflow-y-auto">
                                        {/* View All Genres Option */}
                                        <button
                                            onClick={() => {
                                                navigate("/genre")
                                                setIsGenreDropdownOpen(false)
                                            }}
                                            className="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors font-medium border-b border-gray-700"
                                        >
                                            📋 Xem tất cả thể loại
                                        </button>

                                        {loadingGenres ? (
                                            <div className="px-4 py-2 text-gray-400 text-center">Đang tải...</div>
                                        ) : genres.length > 0 ? (
                                            genres.map((genre) => {
                                                const genreName = typeof genre === "string" ? genre : genre.name
                                                const genreSlug = genreName.toLowerCase().replace(/\s+/g, "-")
                                                const isActive = currentGenreParam === genreSlug
                                                return (
                                                    <button
                                                        key={genre.id || genreName}
                                                        onClick={() => handleGenreClick(genreName)}
                                                        className={`block w-full text-left px-4 py-2 transition-colors ${
                                                            isActive
                                                                ? "text-red-400 bg-gray-700 font-medium"
                                                                : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                                        }`}
                                                    >
                                                        {genreName}
                                                    </button>
                                                )
                                            })
                                        ) : (
                                            <div className="px-4 py-2 text-gray-400 text-center">Không có thể loại</div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() => navigate("/phim-le")}
                                className={`transition-colors font-medium ${
                                    location.pathname === "/phim-le"
                                        ? "text-red-400 border-b-2 border-red-400 pb-1"
                                        : "text-white hover:text-red-400"
                                }`}
                            >
                                Phim Lẻ
                            </button>

                            <button
                                onClick={() => navigate("/phim-bo")}
                                className={`transition-colors font-medium ${
                                    location.pathname === "/phim-bo"
                                        ? "text-red-400 border-b-2 border-red-400 pb-1"
                                        : "text-white hover:text-red-400"
                                }`}
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

                            <Link to="/movies" className="text-white hover:text-red-400 transition-colors font-medium">
                                Toàn bộ phim
                            </Link>
                        </nav>

                        {/* Right side - User menu + Mobile menu button */}
                        <div className="flex items-center space-x-4 flex-shrink-0">
                            {/* User Authentication */}
                            {isAuthenticated && user ? (
                                <div className="relative">
                                    <button
                                        onClick={toggleUserMenu}
                                        className="flex items-center space-x-2 text-white hover:text-red-400 transition-colors"
                                    >
                                        <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {(user.email_or_username || user.username || user.email).charAt(0).toUpperCase()}
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
                            <SearchBar className="w-full" onSearchResults={handleSearchResults} />
                        </div>

                        {/* Mobile Navigation */}
                        <nav className="py-2">
                            {/* Mobile Genre Section */}
                            <div className="border-b border-gray-800">
                                <button
                                    onClick={toggleGenreDropdown}
                                    className={`flex items-center justify-between w-full px-4 py-3 transition-colors font-medium ${
                                        isGenrePage ? "text-red-400 bg-gray-800" : "text-white hover:bg-gray-800 hover:text-yellow-400"
                                    }`}
                                >
                                    <span>Thể loại</span>
                                    <ChevronDown className={`w-4 h-4 transition-transform ${isGenreDropdownOpen ? "rotate-180" : ""}`} />
                                </button>
                                {isGenreDropdownOpen && (
                                    <div className="bg-gray-800 max-h-48 overflow-y-auto">
                                        {/* View All Genres Option */}
                                        <button
                                            onClick={() => {
                                                navigate("/genre")
                                                closeMobileMenu()
                                            }}
                                            className="block w-full text-left px-8 py-2 text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors font-medium border-b border-gray-700"
                                        >
                                            📋 Xem tất cả thể loại
                                        </button>

                                        {loadingGenres ? (
                                            <div className="px-8 py-2 text-gray-400 text-center">Đang tải...</div>
                                        ) : genres.length > 0 ? (
                                            genres.map((genre) => {
                                                const genreName = typeof genre === "string" ? genre : genre.name
                                                const genreSlug = genreName.toLowerCase().replace(/\s+/g, "-")
                                                const isActive = currentGenreParam === genreSlug
                                                return (
                                                    <button
                                                        key={genre.id || genreName}
                                                        onClick={() => handleGenreClick(genreName)}
                                                        className={`block w-full text-left px-8 py-2 transition-colors ${
                                                            isActive
                                                                ? "text-red-400 bg-gray-700 font-medium"
                                                                : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                                        }`}
                                                    >
                                                        {genreName}
                                                    </button>
                                                )
                                            })
                                        ) : (
                                            <div className="px-8 py-2 text-gray-400 text-center">Không có thể loại</div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() => {
                                    navigate("/phim-le")
                                    closeMobileMenu()
                                }}
                                className={`block w-full text-left px-4 py-3 transition-colors font-medium ${
                                    location.pathname === "/phim-le"
                                        ? "text-red-400 bg-gray-800"
                                        : "text-white hover:bg-gray-800 hover:text-yellow-400"
                                }`}
                            >
                                Phim Lẻ
                            </button>

                            <button
                                onClick={() => {
                                    navigate("/phim-bo")
                                    closeMobileMenu()
                                }}
                                className={`block w-full text-left px-4 py-3 transition-colors font-medium ${
                                    location.pathname === "/phim-bo"
                                        ? "text-red-400 bg-gray-800"
                                        : "text-white hover:bg-gray-800 hover:text-yellow-400"
                                }`}
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

                            <Link
                                to="/movies"
                                className="block px-4 py-3 text-white hover:bg-gray-800 hover:text-yellow-400 transition-colors font-medium"
                            >
                                Toàn bộ phim
                            </Link>

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
