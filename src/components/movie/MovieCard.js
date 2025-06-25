import { Play, Star, Eye, Calendar } from "lucide-react"
import { Badge } from "../UI/badge"

export default function MovieCard({ movie, viewMode = "grid" }) {
    const movieData = {
        id: movie.movieId || movie.id,
        title: movie.title,
        genres: movie.genres || [],
        rating: movie.average_rating || 0,
        ratingsCount: movie.ratings_count || 0,
        isHighlyRated: movie.is_highly_rated || false,
        isPopular: movie.is_popular || false,
        primaryGenre: movie.primary_genre || (movie.genres && movie.genres[0]) || "Unknown",
        image: movie.poster_url || `/placeholder.svg?height=300&width=200&text=${encodeURIComponent(movie.title || "Movie")}`,
        year: new Date().getFullYear(),
        duration: "120m",
        quality: movie.isHighlyRated ? "HD" : "SD",
        views: Math.floor(Math.random() * 100000),
        description: `${movie.title} - ${movie.genres?.join(", ") || "Phim hay"}`,
    }

    if (viewMode === "list") {
        // ... Giữ nguyên nếu bạn dùng chế độ list view
        return <div>List view here...</div>
    }

    // ✅ Grid view với khung đồng đều
    return (
        <div className="group cursor-pointer h-full">
            <div className="relative overflow-hidden rounded-lg bg-gray-800 transition-transform duration-300 group-hover:scale-105 h-full flex flex-col">
                {/* Fixed-height poster container */}
                <div className="relative w-full h-[280px] bg-gray-700 flex-shrink-0">
                    <img
                        src={movieData.image}
                        alt={movieData.title}
                        onError={(e) => {
                            e.currentTarget.onerror = null
                            e.currentTarget.src = ""
                        }}
                        className="w-full h-full object-cover rounded-t-lg"
                    />

                    {/* Quality badge */}
                    <Badge className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1">
                        {movieData.quality}
                    </Badge>

                    {/* Status badges */}
                    <div className="absolute top-2 right-2 flex flex-col gap-1">
                        {movieData.isPopular && (
                            <Badge className="bg-red-600 text-white text-xs px-2 py-1">Hot</Badge>
                        )}
                        {movieData.isHighlyRated && (
                            <Badge className="bg-yellow-600 text-white text-xs px-2 py-1">⭐</Badge>
                        )}
                    </div>

                    {/* Hover play button */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                            <Play className="w-6 h-6 text-black fill-current ml-1" />
                        </div>
                    </div>

                    {/* Duration */}
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {movieData.duration}
                    </div>
                </div>

                {/* Movie info - Fixed height content area */}
                <div className="p-3 flex flex-col justify-between flex-grow min-h-[100px]">
                    {/* Title section - Fixed height */}
                    <div className="mb-2">
                        <h3
                            className="text-white font-semibold text-sm leading-tight group-hover:text-yellow-500 transition-colors"
                            style={{
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                height: '2.5rem', // Fixed height for 2 lines
                                lineHeight: '1.25rem'
                            }}
                            title={movieData.title}
                        >
                            {movieData.title}
                        </h3>
                    </div>

                    {/* Bottom info section */}
                    <div className="space-y-1">
                        {/* Year and rating */}
                        <div className="flex items-center justify-between text-xs text-gray-400">
                            <span>{movieData.year}</span>
                            <div className="flex items-center space-x-1">
                                <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                                <span>{movieData.rating.toFixed(1)}</span>
                            </div>
                        </div>

                        {/* Genre and votes */}
                        <div className="flex items-center justify-between text-xs text-gray-500">
                            <span className="truncate mr-2">{movieData.primaryGenre}</span>
                            <span className="flex-shrink-0">
                                {movieData.ratingsCount > 1000
                                    ? `${Math.floor(movieData.ratingsCount / 1000)}K`
                                    : movieData.ratingsCount}{" "}
                                votes
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}