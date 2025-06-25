
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Play, Heart, Share2, Star, Users, Tag, ExternalLink, ChevronLeft, Check } from "lucide-react"
import axios from "axios"
import Header from "../../layout/userLayout/Header"
import Footer from "../../layout/userLayout/Footer"

const MovieDetailPage = () => {
    const { movie_id } = useParams()
    const navigate = useNavigate()
    const [movie, setMovie] = useState(null)
    const [relatedMovies, setRelatedMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isFavorite, setIsFavorite] = useState(false)
    const [showFullDescription, setShowFullDescription] = useState(false)

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/movies/${movie_id}`)
                setMovie(res.data.movie)
                setRelatedMovies(res.data.related_movies)
            } catch (err) {
                console.error("Lỗi khi tải chi tiết phim:", err)
                setError("Không thể tải chi tiết phim.")
            } finally {
                setLoading(false)
            }
        }

        fetchMovieDetails()
    }, [movie_id])

    const handleFavoriteToggle = () => {
        setIsFavorite(!isFavorite)
        // TODO: Call API to add/remove from favorites
    }

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: movie.title,
                text: `Xem phim ${movie.title} tại Mê Phim`,
                url: window.location.href,
            })
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href)
            alert("Đã sao chép link phim!")
        }
    }

    const renderStars = (rating) => {
        const stars = []
        const fullStars = Math.floor(rating)
        const hasHalfStar = rating % 1 !== 0

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />)
            } else if (i === fullStars && hasHalfStar) {
                stars.push(
                    <div key={i} className="relative">
                        <Star className="w-5 h-5 text-gray-400" />
                        <div className="absolute inset-0 overflow-hidden w-1/2">
                            <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        </div>
                    </div>,
                )
            } else {
                stars.push(<Star key={i} className="w-5 h-5 text-gray-400" />)
            }
        }
        return stars
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 text-white">
                <Header />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-2 border-yellow-500 border-t-transparent mx-auto mb-4"></div>
                        <p className="text-gray-400">Đang tải chi tiết phim...</p>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 text-white">
                <Header />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="text-red-500 text-6xl mb-4">⚠️</div>
                        <h2 className="text-2xl font-bold mb-2">Có lỗi xảy ra</h2>
                        <p className="text-gray-400 mb-4">{error}</p>
                        <button
                            onClick={() => navigate(-1)}
                            className="bg-yellow-500 text-black px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-200"
                        >
                            Quay lại
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Header />

            {/* Hero Section */}
            <div className="relative">
                {/* Background Image */}
                <div
                    className="h-[70vh] bg-cover bg-center bg-no-repeat relative"
                    style={{
                        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%), url('${movie.poster_url || "/placeholder.svg?height=600&width=1200"}')`,
                    }}
                >
                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute top-6 left-6 z-10 bg-black bg-opacity-50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black hover:bg-opacity-70 transition-all duration-200"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    {/* Movie Info */}
                    <div className="absolute inset-0 flex items-center">
                        <div className="container mx-auto px-4">
                            <div className="max-w-4xl">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">{movie.title}</h1>

                                {/* Movie Meta */}
                                <div className="flex flex-wrap items-center gap-4 mb-6">
                                    <div className="flex items-center gap-1">
                                        {renderStars(movie.average_rating)}
                                        <span className="ml-2 text-lg font-semibold">{movie.average_rating}/5</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-300">
                                        <Users className="w-4 h-4" />
                                        <span>{movie.ratings_count} đánh giá</span>
                                    </div>
                                    {movie.is_highly_rated && (
                                        <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                      Đánh giá cao
                    </span>
                                    )}
                                    {movie.is_popular && (
                                        <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">Phổ biến</span>
                                    )}
                                </div>

                                {/* Genres */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {movie.genres.map((genre, index) => (
                                        <span
                                            key={index}
                                            className="bg-gray-800 bg-opacity-80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm border border-gray-600"
                                        >
                      {genre}
                    </span>
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-4">
                                    <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors duration-200 transform hover:scale-105">
                                        <Play className="w-5 h-5 fill-current" />
                                        Xem phim
                                    </button>
                                    <button
                                        onClick={handleFavoriteToggle}
                                        className={`border-2 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all duration-200 transform hover:scale-105 ${
                                            isFavorite
                                                ? "border-red-500 bg-red-500 text-white"
                                                : "border-gray-600 text-white hover:border-red-500 hover:bg-red-500"
                                        }`}
                                    >
                                        {isFavorite ? <Check className="w-5 h-5" /> : <Heart className="w-5 h-5" />}
                                        {isFavorite ? "Đã thích" : "Yêu thích"}
                                    </button>
                                    <button
                                        onClick={handleShare}
                                        className="border-2 border-gray-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:border-blue-500 hover:bg-blue-500 transition-all duration-200 transform hover:scale-105"
                                    >
                                        <Share2 className="w-5 h-5" />
                                        Chia sẻ
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Movie Details */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description */}
                        {movie.description && (
                            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                                <h2 className="text-2xl font-bold mb-4">Nội dung phim</h2>
                                <p className={`text-gray-300 leading-relaxed ${!showFullDescription ? "line-clamp-3" : ""}`}>
                                    {movie.description}
                                </p>
                                {movie.description.length > 200 && (
                                    <button
                                        onClick={() => setShowFullDescription(!showFullDescription)}
                                        className="text-yellow-500 hover:text-yellow-400 mt-2 font-medium transition-colors duration-200"
                                    >
                                        {showFullDescription ? "Thu gọn" : "Xem thêm"}
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Tags */}
                        {movie.tags && movie.tags.length > 0 && (
                            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                    <Tag className="w-6 h-6" />
                                    Tags
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {movie.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
                                        >
                      #{tag}
                    </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        {/* Movie Info Card */}
                        <div className="bg-gray-800 rounded-lg p-6 shadow-lg sticky top-4">
                            <h3 className="text-xl font-bold mb-4">Thông tin phim</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400">Đánh giá:</span>
                                    <div className="flex items-center gap-2">
                                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                        <span className="font-semibold">{movie.average_rating}/5</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400">Lượt đánh giá:</span>
                                    <span className="font-semibold">{movie.ratings_count.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400">Thể loại:</span>
                                    <span className="font-semibold text-right text-sm">{movie.genres.join(", ")}</span>
                                </div>
                                {movie.release_date && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400">Ngày phát hành:</span>
                                        <span className="font-semibold text-sm">
                      {new Date(movie.release_date).toLocaleDateString("vi-VN")}
                    </span>
                                    </div>
                                )}
                                {movie.duration && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400">Thời lượng:</span>
                                        <span className="font-semibold">{movie.duration} phút</span>
                                    </div>
                                )}
                            </div>

                            {/* External Links */}
                            {movie.imdb_url && (
                                <div className="mt-6 pt-6 border-t border-gray-700">
                                    <a
                                        href={movie.imdb_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-colors duration-200"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        Xem trên IMDb
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Related Movies */}
                {relatedMovies.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold mb-8">Phim liên quan</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                            {relatedMovies.map((related) => (
                                <div
                                    key={related.movieId}
                                    className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-all duration-300 cursor-pointer group transform hover:scale-105 shadow-lg hover:shadow-xl"
                                    onClick={() => navigate(`/movie/${related.movieId}`)}
                                >
                                    <div className="aspect-[2/3] bg-gray-700 relative overflow-hidden">
                                        <img
                                            src={related.poster_url || "/placeholder.svg?height=300&width=200"}
                                            alt={related.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <Play className="w-8 h-8 text-yellow-500 fill-current" />
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold mb-2 line-clamp-2 group-hover:text-yellow-500 transition-colors duration-200">
                                            {related.title}
                                        </h3>
                                        <p className="text-sm text-gray-400 mb-2 line-clamp-1">{related.genres.join(", ")}</p>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                            <span className="text-sm font-semibold">{related.average_rating}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    )
}

export default MovieDetailPage;
