import { useEffect, useState, useRef } from "react"
import axios from "axios"
import MovieCarousel from "./MovieCarousel";

export default function MovieList() {
    const [popularMovies, setPopularMovies] = useState([])
    const [recentMovies, setRecentMovies] = useState([])
    const [highlyRatedMovies, setHighlyRatedMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [retryCount, setRetryCount] = useState(0)
    const hasFetched = useRef(false)

    // Prevent multiple API calls
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

            // Sử dụng đúng endpoints từ API documentation
            const endpoints = {
                popular: `${baseUrl}/api/movies/popular/`,
                recent: `${baseUrl}/api/movies/recent/`,
                rated: `${baseUrl}/api/movies/highly-rated/`,
            }

            console.log("Calling APIs:", endpoints)

            // Tăng timeout và thêm retry logic
            const axiosConfig = {
                timeout: 30000, // 30 giây
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                params: { page: 1, limit: 12 },
            }

            // Gọi từng API riêng biệt với error handling tốt hơn
            const fetchWithRetry = async (url, retries = 2) => {
                for (let i = 0; i <= retries; i++) {
                    try {
                        console.log(`Fetching ${url} (attempt ${i + 1})`)
                        const response = await axios.get(url, axiosConfig)

                        // Kiểm tra response có hợp lệ không
                        if (!response.data) {
                            throw new Error("Empty response")
                        }

                        console.log(`Success ${url}:`, response.data)
                        return response.data
                    } catch (err) {
                        console.error(`Error ${url} (attempt ${i + 1}):`, err.message)

                        if (i === retries) {
                            // Nếu hết retry, trả về empty data thay vì throw error
                            return { data: [] }
                        }

                        // Wait before retry
                        await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)))
                    }
                }
            }

            // Fetch all APIs concurrently với timeout riêng
            const [popularData, recentData, ratedData] = await Promise.allSettled([
                fetchWithRetry(endpoints.popular),
                fetchWithRetry(endpoints.recent),
                fetchWithRetry(endpoints.rated),
            ])

            // Process results
            const extractMovies = (result) => {
                if (result.status === "fulfilled" && result.value?.data) {
                    return Array.isArray(result.value.data) ? result.value.data : []
                }
                return []
            }

            const popularMoviesData = extractMovies(popularData)
            const recentMoviesData = extractMovies(recentData)
            const ratedMoviesData = extractMovies(ratedData)

            console.log("Final extracted data:", {
                popular: popularMoviesData.length,
                recent: recentMoviesData.length,
                rated: ratedMoviesData.length,
            })

            setPopularMovies(popularMoviesData)
            setRecentMovies(recentMoviesData)
            setHighlyRatedMovies(ratedMoviesData)

            // Nếu tất cả APIs đều trả về rỗng
            if (popularMoviesData.length === 0 && recentMoviesData.length === 0 && ratedMoviesData.length === 0) {
                setError("Không thể tải dữ liệu phim. Server có thể đang bận.")
            }
        } catch (err) {
            console.error("Lỗi tổng thể:", err)
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
                        <p className="text-lg">Đang tải dữ liệu phim...</p>
                        <p className="text-sm text-gray-400 mt-2">Server có thể phản hồi chậm, vui lòng đợi...</p>
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

    // Kiểm tra nếu tất cả danh sách đều rỗng
    const hasAnyMovies = popularMovies.length > 0 || recentMovies.length > 0 || highlyRatedMovies.length > 0

    if (!hasAnyMovies) {
        return (
            <section className="py-12 bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="text-center py-20">
                        <div className="text-gray-400 text-6xl mb-4">📽️</div>
                        <h2 className="text-2xl font-bold text-white mb-2">Chưa có dữ liệu phim</h2>
                        <p className="text-gray-400 mb-6">API kết nối thành công nhưng chưa có phim nào</p>
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
                {/* Phim phổ biến */}
                {popularMovies.length > 0 && (
                    <MovieCarousel movies={popularMovies} title="Thịnh hành" autoScroll={true} />
                )}

                {/* Phim mới nhất */}
                {recentMovies.length > 0 && <MovieCarousel movies={recentMovies} title="Phim mới nhất" autoScroll={true} />}

                {/* Phim đánh giá cao */}
                {highlyRatedMovies.length > 0 && (
                    <MovieCarousel movies={highlyRatedMovies} title="Phim đề cử" autoScroll={true} />
                )}

                {/* Fallback nếu chỉ có một số section có data */}
                {popularMovies.length === 0 && recentMovies.length === 0 && highlyRatedMovies.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-yellow-500 text-4xl mb-4">⏳</div>
                        <h3 className="text-xl font-bold text-white mb-2">Đang tải thêm phim...</h3>
                        <p className="text-gray-400">Một số danh mục có thể tải chậm hơn</p>
                    </div>
                )}
            </div>
        </section>
    )
}
