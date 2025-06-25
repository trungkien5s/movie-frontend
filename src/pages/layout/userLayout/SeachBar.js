import { useState } from "react"
import axios from "axios"
import { Search } from "lucide-react"

const SearchBar = ({ onSearchResults, className }) => {
    const [filters, setFilters] = useState({
        title: "",
        genre: "",
        year: "",
        country: "",
        language: "",
        status: "",
        min_rating: "",
        max_rating: "",
        page: 1,
        limit: 10,
    })

    const [isExpanded, setIsExpanded] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFilters((prev) => ({ ...prev, [name]: value }))
    }

    const handleSearch = async (e) => {
        if (e) e.preventDefault()
        setLoading(true)
        try {
            // Create clean params object, only include non-empty values
            const cleanParams = {}
            Object.keys(filters).forEach(key => {
                if (filters[key] !== "" && filters[key] !== null && filters[key] !== undefined) {
                    cleanParams[key] = filters[key]
                }
            })

            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/movies/search/`, {
                params: cleanParams,
            })

            if (onSearchResults) {
                onSearchResults(res.data.results || res.data || [])
            }
        } catch (error) {
            console.error("Search failed", error)
            if (onSearchResults) onSearchResults([])
        } finally {
            setLoading(false)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch(e)
        }
    }

    const clearFilters = () => {
        setFilters({
            title: "",
            genre: "",
            year: "",
            country: "",
            language: "",
            status: "",
            min_rating: "",
            max_rating: "",
            page: 1,
            limit: 10,
        })
        if (onSearchResults) {
            onSearchResults([])
        }
    }

    return (
        <div className={`${className} relative`}>
            {/* Simple Search Bar for Header */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                    name="title"
                    type="text"
                    placeholder="Tìm theo tên phim..."
                    value={filters.title}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    onFocus={() => setIsExpanded(true)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500 rounded-lg"
                />
                {filters.title && (
                    <button
                        onClick={clearFilters}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                        ×
                    </button>
                )}
            </div>

            {/* Advanced Filters Dropdown */}
            {isExpanded && (
                <>
                    {/* Backdrop */}
                    <div className="fixed inset-0 z-40" onClick={() => setIsExpanded(false)} />

                    {/* Advanced Search Panel */}
                    <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700 z-50 space-y-3">
                        {/* Input filters */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            <input
                                name="genre"
                                type="text"
                                value={filters.genre}
                                placeholder="Thể loại"
                                onChange={handleInputChange}
                                className="bg-gray-700 text-white p-2 rounded border border-gray-600 focus:border-red-500"
                            />

                            <input
                                name="year"
                                type="number"
                                value={filters.year}
                                placeholder="Năm"
                                onChange={handleInputChange}
                                className="bg-gray-700 text-white p-2 rounded border border-gray-600 focus:border-red-500"
                            />

                            <input
                                name="country"
                                type="text"
                                value={filters.country}
                                placeholder="Quốc gia"
                                onChange={handleInputChange}
                                className="bg-gray-700 text-white p-2 rounded border border-gray-600 focus:border-red-500"
                            />

                            <input
                                name="language"
                                type="text"
                                value={filters.language}
                                placeholder="Ngôn ngữ"
                                onChange={handleInputChange}
                                className="bg-gray-700 text-white p-2 rounded border border-gray-600 focus:border-red-500"
                            />

                            <input
                                name="status"
                                type="text"
                                value={filters.status}
                                placeholder="Trạng thái"
                                onChange={handleInputChange}
                                className="bg-gray-700 text-white p-2 rounded border border-gray-600 focus:border-red-500"
                            />

                            {/* Rating range */}
                            <div className="flex gap-2">
                                <input
                                    name="min_rating"
                                    type="number"
                                    placeholder="Rating tối thiểu"
                                    value={filters.min_rating}
                                    onChange={handleInputChange}
                                    className="bg-gray-700 text-white p-2 rounded w-full border border-gray-600 focus:border-red-500"
                                    min="0"
                                    max="10"
                                    step="0.1"
                                />
                                <input
                                    name="max_rating"
                                    type="number"
                                    placeholder="Rating tối đa"
                                    value={filters.max_rating}
                                    onChange={handleInputChange}
                                    className="bg-gray-700 text-white p-2 rounded w-full border border-gray-600 focus:border-red-500"
                                    min="0"
                                    max="10"
                                    step="0.1"
                                />
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-2 justify-end">
                            <button
                                onClick={clearFilters}
                                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                            >
                                Xóa bộ lọc
                            </button>
                            <button
                                onClick={handleSearch}
                                disabled={loading}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
                            >
                                {loading ? "Đang tìm..." : "Tìm kiếm"}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default SearchBar