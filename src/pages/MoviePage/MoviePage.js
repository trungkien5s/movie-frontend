
import { useState, useEffect } from "react"
import { Search, Filter, Grid, List } from "lucide-react"
import Header from "../../components/layout/Header";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import MovieCard from "../../components/movie/MovieCard";
import Pagination from "../../components/pagination/Pagination";
import Footer from "../../components/layout/Footer";


// Mock data cho phim lẻ
const generateMovies = () => {
    const genres = [
        "Hành Động",
        "Kinh Dị",
        "Hài Hước",
        "Tình Cảm",
        "Khoa Học Viễn Tưởng",
        "Phiêu Lưu",
        "Tâm Lý",
        "Hình Sự",
    ]
    const years = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017]
    const countries = ["Mỹ", "Hàn Quốc", "Nhật Bản", "Trung Quốc", "Việt Nam", "Thái Lan"]

    const movies = []
    for (let i = 1; i <= 120; i++) {
        movies.push({
            id: i,
            title: `Phim Lẻ ${i}`,
            year: years[Math.floor(Math.random() * years.length)],
            rating: (Math.random() * 3 + 7).toFixed(1),
            image: `/placeholder.svg?height=300&width=200&text=Movie${i}`,
            quality: Math.random() > 0.5 ? "4K" : "HD",
            duration: `${Math.floor(Math.random() * 60 + 90)}m`,
            genre: genres[Math.floor(Math.random() * genres.length)],
            country: countries[Math.floor(Math.random() * countries.length)],
            views: Math.floor(Math.random() * 1000000),
            description: `Mô tả ngắn cho phim lẻ ${i}. Đây là một bộ phim hay với nhiều tình tiết hấp dẫn.`,
        })
    }
    return movies
}

export default function MoviePage() {
    const [movies] = useState(generateMovies())
    const [filteredMovies, setFilteredMovies] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedGenre, setSelectedGenre] = useState("")
    const [selectedYear, setSelectedYear] = useState("")
    const [selectedCountry, setSelectedCountry] = useState("")
    const [sortBy, setSortBy] = useState("newest")
    const [viewMode, setViewMode] = useState("grid")
    const [showFilters, setShowFilters] = useState(false)

    const moviesPerPage = 24
    const genres = [
        "Tất cả",
        "Hành Động",
        "Kinh Dị",
        "Hài Hước",
        "Tình Cảm",
        "Khoa Học Viễn Tưởng",
        "Phiêu Lưu",
        "Tâm Lý",
        "Hình Sự",
    ]
    const years = ["Tất cả", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017"]
    const countries = ["Tất cả", "Mỹ", "Hàn Quốc", "Nhật Bản", "Trung Quốc", "Việt Nam", "Thái Lan"]

    // Filter and sort movies
    useEffect(() => {
        const filtered = movies.filter((movie) => {
            const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesGenre = !selectedGenre || selectedGenre === "Tất cả" || movie.genre === selectedGenre
            const matchesYear = !selectedYear || selectedYear === "Tất cả" || movie.year.toString() === selectedYear
            const matchesCountry = !selectedCountry || selectedCountry === "Tất cả" || movie.country === selectedCountry

            return matchesSearch && matchesGenre && matchesYear && matchesCountry
        })

        // Sort movies
        switch (sortBy) {
            case "newest":
                filtered.sort((a, b) => b.year - a.year)
                break
            case "oldest":
                filtered.sort((a, b) => a.year - b.year)
                break
            case "rating":
                filtered.sort((a, b) => Number.parseFloat(b.rating) - Number.parseFloat(a.rating))
                break
            case "views":
                filtered.sort((a, b) => b.views - a.views)
                break
            case "name":
                filtered.sort((a, b) => a.title.localeCompare(b.title))
                break
            default:
                break
        }

        setFilteredMovies(filtered)
        setCurrentPage(1) // Reset to first page when filters change
    }, [movies, searchTerm, selectedGenre, selectedYear, selectedCountry, sortBy])

    // Get current movies for pagination
    const indexOfLastMovie = currentPage * moviesPerPage
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage
    const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie)
    const totalPages = Math.ceil(filteredMovies.length / moviesPerPage)

    const handlePageChange = (page) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const clearFilters = () => {
        setSearchTerm("")
        setSelectedGenre("")
        setSelectedYear("")
        setSelectedCountry("")
        setSortBy("newest")
    }

    return (
        <div className="min-h-screen bg-gray-900">
            <Header />

            <div className="container mx-auto px-4 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Phim lẻ</h1>
                </div>

                {/* Search and Filters */}
                <div className="bg-gray-800 rounded-lg p-6 mb-8">
                    {/* Search Bar */}
                    <div className="flex flex-col lg:flex-row gap-4 mb-4">


                        <div className="flex gap-2">
                            <Button
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
                    </div>

                    {/* Filters */}
                    {showFilters && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-700">
                            {/* Genre Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Thể loại</label>
                                <select
                                    value={selectedGenre}
                                    onChange={(e) => setSelectedGenre(e.target.value)}
                                    className="w-full bg-gray-700 border-gray-600 text-white rounded px-3 py-2"
                                >
                                    {genres.map((genre) => (
                                        <option key={genre} value={genre === "Tất cả" ? "" : genre}>
                                            {genre}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Year Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Năm</label>
                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    className="w-full bg-gray-700 border-gray-600 text-white rounded px-3 py-2"
                                >
                                    {years.map((year) => (
                                        <option key={year} value={year === "Tất cả" ? "" : year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Country Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Quốc gia</label>
                                <select
                                    value={selectedCountry}
                                    onChange={(e) => setSelectedCountry(e.target.value)}
                                    className="w-full bg-gray-700 border-gray-600 text-white rounded px-3 py-2"
                                >
                                    {countries.map((country) => (
                                        <option key={country} value={country === "Tất cả" ? "" : country}>
                                            {country}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Sort Filter */}
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
                                    <option value="views">Lượt xem</option>
                                    <option value="name">Tên A-Z</option>
                                </select>
                            </div>

                            {/* Clear Filters */}
                            <div className="md:col-span-2 lg:col-span-4 flex justify-end pt-2">
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

                {/* Results Info */}
                <div className="flex justify-between items-center mb-6">
                    <p className="text-gray-400">
                        Hiển thị {indexOfFirstMovie + 1}-{Math.min(indexOfLastMovie, filteredMovies.length)} trong tổng số{" "}
                        {filteredMovies.length} phim
                    </p>
                </div>

                {/* Movies Grid/List */}
                {currentMovies.length > 0 ? (
                    <>
                        <div
                            className={
                                viewMode === "grid"
                                    ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6 mb-8"
                                    : "space-y-4 mb-8"
                            }
                        >
                            {currentMovies.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} viewMode={viewMode} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                        )}
                    </>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-lg mb-4">Không tìm thấy phim nào</div>
                        <Button onClick={clearFilters} variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
                            Xóa bộ lọc
                        </Button>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    )
}
