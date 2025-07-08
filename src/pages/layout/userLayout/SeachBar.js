

import { useState, useEffect, useRef } from "react"
import { Search, Filter, X, Calendar, Star, Clock, MapPin } from "lucide-react"
import axios from "axios"

const SearchBar = ({ className = "", onSearchResults }) => {
    const [searchQuery, setSearchQuery] = useState("")
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [isSearching, setIsSearching] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const [showResults, setShowResults] = useState(false)
    const [filters, setFilters] = useState({
        genre: "",
        year: "",
        country: "",
        type: "",
        rating: "",
        status: "",
    })

    // API data states
    const [genres, setGenres] = useState([])
    const [countries, setCountries] = useState([])
    const [loadingFilters, setLoadingFilters] = useState(false)

    const searchRef = useRef(null)
    const filterRef = useRef(null)
    const apiURL = process.env.REACT_APP_API_URL

    // Static filter options that don't need API
    const staticFilterOptions = {
        years: Array.from({ length: 30 }, (_, i) => 2024 - i),
        types: [
            { value: "movie", label: "Phim Lẻ" },
            { value: "series", label: "Phim Bộ" },
        ],
        ratings: [
            { value: "9", label: "9.0+ ⭐" },
            { value: "8", label: "8.0+ ⭐" },
            { value: "7", label: "7.0+ ⭐" },
            { value: "6", label: "6.0+ ⭐" },
        ],
        status: [
            { value: "completed", label: "Hoàn thành" },
            { value: "ongoing", label: "Đang chiếu" },
            { value: "upcoming", label: "Sắp chiếu" },
        ],
    }

    // Fetch filter data from API
    useEffect(() => {
        const fetchFilterData = async () => {
            setLoadingFilters(true)
            try {
                // Fetch genres
                const genresResponse = await axios.get(`${apiURL}/api/genres/`)
                if (genresResponse.data) {
                    if (Array.isArray(genresResponse.data)) {
                        setGenres(genresResponse.data)
                    } else if (genresResponse.data.genres && Array.isArray(genresResponse.data.genres)) {
                        setGenres(genresResponse.data.genres)
                    } else if (genresResponse.data.data && Array.isArray(genresResponse.data.data)) {
                        setGenres(genresResponse.data.data)
                    }
                }

                // Fetch countries if API endpoint exists
                try {
                    const countriesResponse = await axios.get(`${apiURL}/api/countries/`)
                    if (countriesResponse.data) {
                        if (Array.isArray(countriesResponse.data)) {
                            setCountries(countriesResponse.data)
                        } else if (countriesResponse.data.countries && Array.isArray(countriesResponse.data.countries)) {
                            setCountries(countriesResponse.data.countries)
                        } else if (countriesResponse.data.data && Array.isArray(countriesResponse.data.data)) {
                            setCountries(countriesResponse.data.data)
                        }
                    }
                } catch (countryError) {
                    console.log("Countries API not available, using default list")
                    // Fallback to default countries if API doesn't exist
                    setCountries([
                        { name: "Việt Nam", flag: "🇻🇳", code: "VN" },
                        { name: "Hàn Quốc", flag: "🇰🇷", code: "KR" },
                        { name: "Nhật Bản", flag: "🇯🇵", code: "JP" },
                        { name: "Mỹ", flag: "🇺🇸", code: "US" },
                        { name: "Trung Quốc", flag: "🇨🇳", code: "CN" },
                        { name: "Thái Lan", flag: "🇹🇭", code: "TH" },
                    ])
                }
            } catch (error) {
                console.error("Error fetching filter data:", error)
                // Set empty arrays if API fails
                setGenres([])
                setCountries([])
            } finally {
                setLoadingFilters(false)
            }
        }

        if (apiURL) {
            fetchFilterData()
        }
    }, [apiURL])

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false)
            }
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setIsFilterOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Debounced search
    useEffect(() => {
        const delayedSearch = setTimeout(() => {
            if (searchQuery.trim()) {
                handleSearch()
            } else {
                setSearchResults([])
                setShowResults(false)
            }
        }, 500)

        return () => clearTimeout(delayedSearch)
    }, [searchQuery])

    const handleSearch = async () => {
        if (!searchQuery.trim()) return

        setIsSearching(true)
        try {
            // Build search parameters
            const searchParams = {
                q: searchQuery.trim(),
                search: searchQuery.trim(),
                query: searchQuery.trim(),
            }

            // Add filters to search params
            if (filters.genre) searchParams.genre = filters.genre
            if (filters.year) searchParams.year = filters.year
            if (filters.country) searchParams.country = filters.country
            if (filters.type) searchParams.type = filters.type
            if (filters.rating) searchParams.rating = filters.rating
            if (filters.status) searchParams.status = filters.status

            console.log("Search params:", searchParams)

            // Try different possible API endpoints
            let response
            try {
                // Try main search endpoint
                response = await axios.get(`${apiURL}/api/search/`, { params: searchParams })
            } catch (error) {
                try {
                    // Try alternative search endpoint
                    response = await axios.get(`${apiURL}/api/movies/search/`, { params: searchParams })
                } catch (error2) {
                    try {
                        // Try movies endpoint with search
                        response = await axios.get(`${apiURL}/api/movies/`, { params: searchParams })
                    } catch (error3) {
                        throw new Error("No search endpoint available")
                    }
                }
            }

            console.log("Search response:", response.data)

            let results = []
            if (response.data) {
                if (Array.isArray(response.data)) {
                    results = response.data
                } else if (response.data.results && Array.isArray(response.data.results)) {
                    results = response.data.results
                } else if (response.data.data && Array.isArray(response.data.data)) {
                    results = response.data.data
                } else if (response.data.movies && Array.isArray(response.data.movies)) {
                    results = response.data.movies
                }
            }

            setSearchResults(results)
            setShowResults(results.length > 0)

            if (onSearchResults) {
                onSearchResults(results)
            }
        } catch (error) {
            console.error("Search error:", error)
            setSearchResults([])
            setShowResults(false)

            // Show error message to user
            if (error.response) {
                console.error("API Error:", error.response.status, error.response.data)
            } else if (error.request) {
                console.error("Network Error:", error.message)
            }
        } finally {
            setIsSearching(false)
        }
    }

    const handleFilterChange = (filterType, value) => {
        setFilters((prev) => ({
            ...prev,
            [filterType]: prev[filterType] === value ? "" : value,
        }))
    }

    const clearFilters = () => {
        setFilters({
            genre: "",
            year: "",
            country: "",
            type: "",
            rating: "",
            status: "",
        })
    }

    const getActiveFiltersCount = () => {
        return Object.values(filters).filter((value) => value !== "").length
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            handleSearch()
        }
    }

    return (
        <div className={`relative ${className}`} ref={searchRef}>
            {/* Main Search Bar */}
            <form onSubmit={handleSubmit} className="relative flex items-center">
                {/* Search Input */}
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                        type="text"
                        className="w-full bg-slate-800/50 border border-slate-600/50 text-white pl-12 pr-6 py-3.5 rounded-l-2xl focus:bg-slate-800/70 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 placeholder-slate-400 transition-all duration-300 text-base"
                        placeholder="Tìm kiếm phim, diễn viên, đạo diễn..."
                    />
                    {isSearching && (
                        <div className="absolute inset-y-0 right-4 flex items-center">
                            <div className="w-5 h-5 border-2 border-slate-600 border-t-red-500 rounded-full animate-spin"></div>
                        </div>
                    )}
                </div>

                {/* Filter Button */}
                <div className="relative" ref={filterRef}>
                    <button
                        type="button"
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className={`relative px-6 py-3.5 rounded-r-2xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                            isFilterOpen || getActiveFiltersCount() > 0
                                ? "bg-red-600 text-white shadow-lg shadow-red-500/25"
                                : "bg-red-500 hover:bg-red-600 text-white"
                        }`}
                    >
                        <Filter className="w-5 h-5" />
                        <span className="hidden sm:block font-medium">Bộ lọc</span>
                        {getActiveFiltersCount() > 0 && (
                            <div className="absolute -top-2 -right-2 w-5 h-5 bg-yellow-500 text-black text-xs font-bold rounded-full flex items-center justify-center">
                                {getActiveFiltersCount()}
                            </div>
                        )}
                    </button>

                    {/* Filter Dropdown */}
                    {isFilterOpen && (
                        <div className="absolute top-full right-0 mt-2 w-[95vw] max-w-md sm:w-96 bg-slate-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-slate-700/50 z-50">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent rounded-2xl"></div>

                            <div className="relative p-4 sm:p-6">
                                {/* Filter Header */}
                                <div className="flex items-center justify-between mb-4 sm:mb-6">
                                    <h3 className="text-white font-semibold text-base sm:text-lg flex items-center">
                                        <Filter className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                                        <span className="hidden xs:inline">Bộ lọc tìm kiếm</span>
                                        <span className="xs:hidden">Bộ lọc</span>
                                    </h3>
                                    <button
                                        onClick={() => setIsFilterOpen(false)}
                                        className="text-slate-400 hover:text-white transition-colors p-1"
                                    >
                                        <X className="w-4 sm:w-5 h-4 sm:h-5" />
                                    </button>
                                </div>

                                {loadingFilters ? (
                                    <div className="flex items-center justify-center py-8">
                                        <div className="w-8 h-8 border-2 border-slate-600 border-t-red-500 rounded-full animate-spin"></div>
                                        <span className="ml-3 text-slate-400">Đang tải bộ lọc...</span>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {/* Genre Filter */}
                                        {genres.length > 0 && (
                                            <div>
                                                <label className="block text-slate-300 text-sm font-medium mb-3 flex items-center">
                                                    <Star className="w-4 h-4 mr-2" />
                                                    <span>Thể loại</span>
                                                </label>
                                                <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                                                    {genres.map((genre) => {
                                                        const genreName = typeof genre === "string" ? genre : genre.name || genre.title
                                                        const genreId = typeof genre === "string" ? genre : genre.id || genre.name

                                                        return (
                                                            <button
                                                                key={genreId}
                                                                type="button"
                                                                onClick={() => handleFilterChange("genre", genreName)}
                                                                className={`text-left px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm transition-all duration-300 truncate ${
                                                                    filters.genre === genreName
                                                                        ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                                                        : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white"
                                                                }`}
                                                                title={genreName}
                                                            >
                                                                {genreName}
                                                            </button>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        )}

                                        {/* Year Filter */}
                                        <div>
                                            <label className="block text-slate-300 text-sm font-medium mb-3 flex items-center">
                                                <Calendar className="w-4 h-4 mr-2" />
                                                <span>Năm phát hành</span>
                                            </label>
                                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-32 overflow-y-auto">
                                                {staticFilterOptions.years.map((year) => (
                                                    <button
                                                        key={year}
                                                        type="button"
                                                        onClick={() => handleFilterChange("year", year.toString())}
                                                        className={`px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm transition-all duration-300 ${
                                                            filters.year === year.toString()
                                                                ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                                                : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white"
                                                        }`}
                                                    >
                                                        {year}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Country Filter */}
                                        {countries.length > 0 && (
                                            <div>
                                                <label className="block text-slate-300 text-sm font-medium mb-3 flex items-center">
                                                    <MapPin className="w-4 h-4 mr-2" />
                                                    <span>Quốc gia</span>
                                                </label>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                    {countries.map((country) => {
                                                        const countryName = typeof country === "string" ? country : country.name || country.title
                                                        const countryFlag = typeof country === "string" ? "🌍" : country.flag || "🌍"
                                                        const countryId =
                                                            typeof country === "string" ? country : country.id || country.code || country.name

                                                        return (
                                                            <button
                                                                key={countryId}
                                                                type="button"
                                                                onClick={() => handleFilterChange("country", countryName)}
                                                                className={`flex items-center px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm transition-all duration-300 truncate ${
                                                                    filters.country === countryName
                                                                        ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                                                        : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white"
                                                                }`}
                                                                title={countryName}
                                                            >
                                                                <span className="mr-2 flex-shrink-0">{countryFlag}</span>
                                                                <span className="truncate">{countryName}</span>
                                                            </button>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        )}

                                        {/* Type Filter */}
                                        <div>
                                            <label className="block text-slate-300 text-sm font-medium mb-3 flex items-center">
                                                <Clock className="w-4 h-4 mr-2" />
                                                <span>Loại phim</span>
                                            </label>
                                            <div className="flex flex-col sm:flex-row gap-2">
                                                {staticFilterOptions.types.map((type) => (
                                                    <button
                                                        key={type.value}
                                                        type="button"
                                                        onClick={() => handleFilterChange("type", type.value)}
                                                        className={`flex-1 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                                                            filters.type === type.value
                                                                ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                                                : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white"
                                                        }`}
                                                    >
                                                        {type.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Rating Filter */}
                                        <div>
                                            <label className="block text-slate-300 text-sm font-medium mb-3 flex items-center">
                                                <Star className="w-4 h-4 mr-2" />
                                                <span>Đánh giá</span>
                                            </label>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                {staticFilterOptions.ratings.map((rating) => (
                                                    <button
                                                        key={rating.value}
                                                        type="button"
                                                        onClick={() => handleFilterChange("rating", rating.value)}
                                                        className={`px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm transition-all duration-300 ${
                                                            filters.rating === rating.value
                                                                ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                                                : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white"
                                                        }`}
                                                    >
                                                        {rating.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Filter Actions */}
                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-700/50 gap-3 sm:gap-0">
                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="text-slate-400 hover:text-white text-xs sm:text-sm font-medium transition-colors order-2 sm:order-1"
                                        disabled={getActiveFiltersCount() === 0}
                                    >
                                        Xóa tất cả ({getActiveFiltersCount()})
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsFilterOpen(false)
                                            if (searchQuery.trim()) {
                                                handleSearch()
                                            }
                                        }}
                                        className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors text-sm order-1 sm:order-2"
                                    >
                                        Áp dụng
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </form>

            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-slate-700/50 z-40 max-h-[70vh] sm:max-h-96 overflow-y-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent rounded-2xl"></div>

                    <div className="relative p-3 sm:p-4">
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                            <h3 className="text-white font-medium text-sm sm:text-base">Kết quả tìm kiếm ({searchResults.length})</h3>
                            <button
                                onClick={() => setShowResults(false)}
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="space-y-2 sm:space-y-3">
                            {searchResults.slice(0, 5).map((result, index) => {
                                // Handle different API response formats
                                const title = result.title || result.name || result.original_title || `Kết quả ${index + 1}`
                                const type = result.type || result.media_type || (result.first_air_date ? "TV Series" : "Movie")
                                const year = result.release_date
                                    ? new Date(result.release_date).getFullYear()
                                    : result.first_air_date
                                        ? new Date(result.first_air_date).getFullYear()
                                        : result.year || "N/A"
                                const rating = result.vote_average || result.rating || result.imdb_rating || 0
                                const poster = result.poster_path
                                    ? `https://image.tmdb.org/t/p/w200${result.poster_path}`
                                    : result.poster || result.image || "/placeholder.svg?height=120&width=80"

                                return (
                                    <div
                                        key={result.id || index}
                                        className="flex items-center space-x-3 sm:space-x-4 p-2 sm:p-3 rounded-xl hover:bg-slate-800/50 transition-colors cursor-pointer group"
                                        onClick={() => {
                                            // Handle result click - navigate to movie detail page
                                            if (result.id) {
                                                window.location.href = `/movie/${result.id}`
                                            }
                                        }}
                                    >
                                        <img
                                            src={poster || "/placeholder.svg?height=120&width=80"}
                                            alt={title}
                                            className="w-10 sm:w-12 h-14 sm:h-16 object-cover rounded-lg flex-shrink-0"
                                            onError={(e) => {
                                                e.target.src = "/placeholder.svg?height=120&width=80"
                                            }}
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-white font-medium group-hover:text-red-400 transition-colors line-clamp-1 text-sm sm:text-base">
                                                {title}
                                            </h4>
                                            <div className="flex items-center space-x-2 sm:space-x-3 mt-1">
                                                <span className="text-slate-400 text-xs sm:text-sm truncate">{type}</span>
                                                <span className="text-slate-400 text-xs sm:text-sm">{year}</span>
                                                {rating > 0 && (
                                                    <div className="flex items-center space-x-1">
                                                        <Star className="w-3 h-3 text-yellow-500 flex-shrink-0" />
                                                        <span className="text-slate-400 text-xs sm:text-sm">{rating.toFixed(1)}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-700/50">
                            <button
                                onClick={() => {
                                    setShowResults(false)
                                    if (onSearchResults) {
                                        onSearchResults(searchResults)
                                    }
                                }}
                                className="w-full text-center text-red-400 hover:text-red-300 font-medium transition-colors text-sm sm:text-base"
                            >
                                Xem tất cả {searchResults.length} kết quả →
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SearchBar
