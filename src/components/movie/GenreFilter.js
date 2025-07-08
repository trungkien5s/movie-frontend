
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, Filter, Grid, List } from "lucide-react"

import axios from "axios"
import Header from "../../pages/layout/userLayout/Header";
import Button from "../button/Button";
import Pagination from "../pagination/Pagination";
import Footer from "../../pages/layout/userLayout/Footer";
import MovieCard from "./MovieCard";
import Input from "../input/Input";

// Danh sách các thể loại phim
const GENRES = [
    { name: "Hành Động", slug: "action", color: "bg-red-600" },
    { name: "Kinh Dị", slug: "horror", color: "bg-purple-600" },
    { name: "Hài Hước", slug: "comedy", color: "bg-yellow-600" },
    { name: "Tình Cảm", slug: "romance", color: "bg-pink-600" },
    { name: "Khoa Học Viễn Tưởng", slug: "sci-fi", color: "bg-blue-600" },
    { name: "Phiêu Lưu", slug: "adventure", color: "bg-green-600" },
    { name: "Tâm Lý", slug: "drama", color: "bg-gray-600" },
    { name: "Hình Sự", slug: "crime", color: "bg-orange-600" },
    { name: "Hoạt Hình", slug: "animation", color: "bg-indigo-600" },
    { name: "Tài Liệu", slug: "documentary", color: "bg-teal-600" },
    { name: "Gia Đình", slug: "family", color: "bg-emerald-600" },
    { name: "Âm Nhạc", slug: "music", color: "bg-violet-600" },
]

export default function GenreFilter() {
    const router = useRouter()
    const searchParams = useSearchParams()

    // State management
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalMovies, setTotalMovies] = useState(0)
    const [viewMode, setViewMode] = useState("grid")
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedGenre, setSelectedGenre] = useState("")
    const [sortBy, setSortBy] = useState("newest")
    const [showFilters, setShowFilters] = useState(false)

    const moviesPerPage = 20

    // Get initial values from URL params
    useEffect(() => {
        const genre = searchParams.get("genre") || ""
        const page = Number.parseInt(searchParams.get("page")) || 1
        const search = searchParams.get("search") || ""

        setSelectedGenre(genre)
        setCurrentPage(page)
        setSearchTerm(search)
    }, [searchParams])

    // Fetch movies when parameters change
    useEffect(() => {
        if (selectedGenre) {
            fetchMoviesByGenre()
        }
    }, [selectedGenre, currentPage, sortBy])

    const fetchMoviesByGenre = async () => {
        if (!selectedGenre) return

        try {
            setLoading(true)
            setError(null)

            const baseUrl = process.env.REACT_APP_API_URL || "https://movie-streaming-api.onrender.com"
            const endpoint = `${baseUrl}/api/movies/genre/${selectedGenre}`

            console.log(`Fetching movies for genre: ${selectedGenre}`)

            const response = await axios.get(endpoint, {
                params: {
                    page: currentPage,
                    limit: moviesPerPage,
                },
                timeout: 3000,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })

            console.log("Genre API Response:", response.data)

            // Process API response
            const moviesData = response.data?.data || []
            const pagination = response.data?.pagination || {}

            setMovies(moviesData)
            setTotalPages(pagination.totalPages || 1)
            setTotalMovies(pagination.total || moviesData.length)
        } catch (err) {
            console.error("Error fetching movies by genre:", err)
            setError(err.response?.data?.message || "Không thể tải phim theo thể loại")
            setMovies([])
        } finally {
            setLoading(false)
        }
    }

    // Update URL when filters change
    const updateURL = (params) => {
        const newSearchParams = new URLSearchParams(searchParams)

        Object.entries(params).forEach(([key, value]) => {
            if (value) {
                newSearchParams.set(key, value)
            } else {
                newSearchParams.delete(key)
            }
        })

        router.push(`/genre?${newSearchParams.toString()}`)
    }

    const handleGenreSelect = (genreSlug) => {
        setSelectedGenre(genreSlug)
        setCurrentPage(1)
        updateURL({ genre: genreSlug, page: 1, search: searchTerm })
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
        updateURL({ genre: selectedGenre, page, search: searchTerm })
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const handleSearch = (e) => {
        e.preventDefault()
        updateURL({ genre: selectedGenre, page: 1, search: searchTerm })
    }

    const clearFilters = () => {
        setSelectedGenre("")
        setSearchTerm("")
        setCurrentPage(1)
        setSortBy("newest")
        router.push("/genre")
    }

    // Filter movies by search term (client-side)
    const filteredMovies = movies.filter((movie) =>
        searchTerm ? movie.title?.toLowerCase().includes(searchTerm.toLowerCase()) : true,
    )

    // Sort movies (client-side)
    const sortedMovies = [...filteredMovies].sort((a, b) => {
        switch (sortBy) {
            case "newest":
                return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
            case "oldest":
                return new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
            case "rating":
                return (b.average_rating || 0) - (a.average_rating || 0)
            case "name":
                return (a.title || "").localeCompare(b.title || "")
            default:
                return 0
        }
    })

    const selectedGenreInfo = GENRES.find((g) => g.slug === selectedGenre)

    return (
        <div className="min-h-screen bg-gray-900">
            <Header />

            <div className="container mx-auto px-4 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        {selectedGenreInfo ? `Phim ${selectedGenreInfo.name}` : "Thể loại phim"}
                    </h1>
                    <p className="text-gray-400">
                        {selectedGenre
                            ? `Khám phá bộ sưu tập phim ${selectedGenreInfo?.name.toLowerCase()}`
                            : "Chọn thể loại để xem phim"}
                    </p>
                </div>

                {/* Genre Selection */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">Chọn thể loại</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {GENRES.map((genre) => (
                            <button
                                key={genre.slug}
                                onClick={() => handleGenreSelect(genre.slug)}
                                className={`p-3 rounded-lg text-white font-medium transition-all duration-200 transform hover:scale-105 ${
                                    selectedGenre === genre.slug ? `${genre.color} shadow-lg` : "bg-gray-800 hover:bg-gray-700"
                                }`}
                            >
                                {genre.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Search and Filters */}
                {selectedGenre && (
                    <div className="bg-gray-800 rounded-lg p-6 mb-8">
                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4 mb-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <Input
                                        type="text"
                                        placeholder="Tìm kiếm phim..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" className="bg-yellow-500 text-black hover:bg-yellow-600">
                                    Tìm kiếm
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => setShowFilters(!showFilters)}
                                    variant="outline"
                                    className="border-gray-600 text-white hover:bg-gray-700"
                                >
                                    <Filter className="w-4 h-4 mr-2" />
                                    Bộ lọc
                                </Button>
                                <div className="flex border border-gray-600 rounded">
                                    <Button
                                        onClick={() => setViewMode("grid")}
                                        variant={viewMode === "grid" ? "default" : "ghost"}
                                        size="sm"
                                        className={viewMode === "grid" ? "bg-yellow-500 text-black" : "text-white hover:bg-gray-700"}
                                    >
                                        <Grid className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        onClick={() => setViewMode("list")}
                                        variant={viewMode === "list" ? "default" : "ghost"}
                                        size="sm"
                                        className={viewMode === "list" ? "bg-yellow-500 text-black" : "text-white hover:bg-gray-700"}
                                    >
                                        <List className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </form>

                        {/* Advanced Filters */}
                        {showFilters && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-gray-700">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Sắp xếp</label>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="w-full bg-gray-700 border-gray-600 text-white rounded px-3 py-2"
                                    >
                                        <option value="newest">Mới nhất</option>
                                        <option value="oldest">Cũ nhất</option>
                                        <option value="rating">Đánh giá cao</option>
                                        <option value="name">Tên A-Z</option>
                                    </select>
                                </div>

                                <div className="md:col-span-2 lg:col-span-1 flex items-end">
                                    <Button
                                        onClick={clearFilters}
                                        variant="outline"
                                        size="sm"
                                        className="border-gray-600 text-white hover:bg-gray-700"
                                    >
                                        Xóa bộ lọc
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Results */}
                {selectedGenre && (
                    <>
                        {/* Results Info */}
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-gray-400">
                                {loading ? "Đang tải..." : `Tìm thấy ${sortedMovies.length} phim`}
                                {searchTerm && ` cho "${searchTerm}"`}
                            </p>
                        </div>

                        {/* Loading State */}
                        {loading && (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-2 border-yellow-500 border-t-transparent mx-auto mb-4"></div>
                                <p className="text-gray-400">Đang tải phim...</p>
                            </div>
                        )}

                        {/* Error State */}
                        {error && (
                            <div className="text-center py-12">
                                <div className="text-red-500 text-6xl mb-4">⚠️</div>
                                <h3 className="text-xl font-bold text-white mb-2">Có lỗi xảy ra</h3>
                                <p className="text-gray-400 mb-4">{error}</p>
                                <Button onClick={fetchMoviesByGenre} className="bg-yellow-500 text-black hover:bg-yellow-600">
                                    Thử lại
                                </Button>
                            </div>
                        )}

                        {/* Movies Grid/List */}
                        {!loading && !error && sortedMovies.length > 0 && (
                            <>
                                <div
                                    className={
                                        viewMode === "grid"
                                            ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 mb-8"
                                            : "space-y-4 mb-8"
                                    }
                                >
                                    {sortedMovies.map((movie) => (
                                        <MovieCard key={movie.movieId || movie.id} movie={movie} viewMode={viewMode} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                                )}
                            </>
                        )}

                        {/* No Results */}
                        {!loading && !error && sortedMovies.length === 0 && selectedGenre && (
                            <div className="text-center py-12">
                                <div className="text-gray-400 text-6xl mb-4">🎬</div>
                                <h3 className="text-xl font-bold text-white mb-2">Không tìm thấy phim</h3>
                                <p className="text-gray-400 mb-4">
                                    {searchTerm
                                        ? `Không có phim nào phù hợp với "${searchTerm}"`
                                        : `Chưa có phim ${selectedGenreInfo?.name.toLowerCase()}`}
                                </p>
                                <Button
                                    onClick={clearFilters}
                                    variant="outline"
                                    className="border-gray-600 text-white hover:bg-gray-700"
                                >
                                    Xóa bộ lọc
                                </Button>
                            </div>
                        )}
                    </>
                )}

                {/* No Genre Selected */}
                {!selectedGenre && (
                    <div className="text-center py-20">
                        <div className="text-gray-400 text-8xl mb-6">🎭</div>
                        <h2 className="text-2xl font-bold text-white mb-4">Chọn thể loại phim</h2>
                        <p className="text-gray-400 mb-8">Hãy chọn một thể loại ở trên để xem danh sách phim</p>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    )
}
