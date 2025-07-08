import { useEffect, useState, useRef } from "react"
import axios from "axios"
import MovieCarousel from "./MovieCarousel";

export default function MovieList() {
    const [highlyRatedMovies, setHighlyRatedMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [retryCount, setRetryCount] = useState(0)
    const hasFetched = useRef(false)

    useEffect(() => {
        if (hasFetched.current) return
        hasFetched.current = true
        fetchMovies()
    }, [])

    const fetchMovies = async () => {
        try {
            setLoading(true)
            setError(null)

            const baseUrl = process.env.REACT_APP_API_URL || "https://movie-streaming-api.onrender.com"
            const ratedUrl = `${baseUrl}/api/movies/highly-rated/`

            const axiosConfig = {
                timeout: 30000,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                params: { page: 1, limit: 12 },
            }

            const fetchWithRetry = async (url, retries = 2) => {
                for (let i = 0; i <= retries; i++) {
                    try {
                        const response = await axios.get(url, axiosConfig)
                        if (!response.data) throw new Error("Empty response")
                        return response.data
                    } catch (err) {
                        if (i === retries) return { data: [] }
                        await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)))
                    }
                }
            }

            const ratedResult = await fetchWithRetry(ratedUrl)

            const ratedMoviesData = Array.isArray(ratedResult?.data) ? ratedResult.data : []

            setHighlyRatedMovies(ratedMoviesData)

            if (ratedMoviesData.length === 0) {
                setError("Không thể tải dữ liệu phim đề cử.")
            }
        } catch (err) {
            setError("Lỗi kết nối đến server. Vui lòng thử lại sau.")
        } finally {
            setLoading(false)
        }
    }

    const retryFetch = () => {
        setRetryCount((prev) => prev + 1)
        hasFetched.current = false
        fetchMovies()
    }

    if (loading) {
        return (
            <section className="py-12 bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="text-white text-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-2 border-yellow-500 border-t-transparent mx-auto mb-4"></div>
                    </div>
                </div>
            </section>
        )
    }

    if (error) {
        return (
            <section className="py-12 bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="text-center py-20">
                        <div className="text-red-500 text-6xl mb-4">⚠️</div>
                        <h2 className="text-2xl font-bold text-white mb-2">Lỗi tải dữ liệu</h2>
                        <p className="text-gray-400 mb-4">{error}</p>
                        <div className="bg-gray-800 rounded-lg p-4 mb-6 text-left max-w-2xl mx-auto">
                            <h3 className="text-white font-semibold mb-2">Thông tin debug:</h3>
                            <p className="text-gray-300 text-sm">
                                API URL: {process.env.REACT_APP_API_URL || "https://movie-streaming-api.onrender.com"}
                            </p>
                            <p className="text-gray-300 text-sm">Retry count: {retryCount}</p>
                            <p className="text-gray-300 text-sm">Status: Server có thể đang bận hoặc phản hồi chậm</p>
                        </div>
                        <button
                            onClick={retryFetch}
                            className="bg-yellow-500 text-black px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                        >
                            Thử lại ({retryCount + 1})
                        </button>
                    </div>
                </div>
            </section>
        )
    }

    if (highlyRatedMovies.length === 0) {
        return (
            <section className="py-12 bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="text-center py-20">
                        <div className="text-gray-400 text-6xl mb-4">📽️</div>
                        <h2 className="text-2xl font-bold text-white mb-2">Chưa có dữ liệu phim đề cử</h2>
                        <p className="text-gray-400 mb-6">API kết nối thành công nhưng chưa có dữ liệu</p>
                        <button
                            onClick={retryFetch}
                            className="bg-yellow-500 text-black px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                        >
                            Tải lại
                        </button>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="py-12 bg-gray-900">
            <div className="container mx-auto px-4">
                <MovieCarousel movies={highlyRatedMovies} title="Phim đề cử" autoScroll={true} />
            </div>
        </section>
    )
}
