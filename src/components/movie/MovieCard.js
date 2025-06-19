import { Play, Star, Eye, Calendar } from "lucide-react"
import {Badge} from "../UI/badge";

export default function MovieCard({ movie, viewMode = "grid" }) {
    if (viewMode === "list") {
        return (
            <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors">
                <div className="flex gap-4">
                    {/* Movie Poster */}
                    <div className="flex-shrink-0">
                        <div className="w-20 h-28 rounded overflow-hidden relative group cursor-pointer">
                            <img src={movie.image || "/placeholder.svg"} alt={movie.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <Play className="w-6 h-6 text-red-500 fill-current" />
                            </div>
                        </div>
                    </div>

                    {/* Movie Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                            <h3 className="text-white font-semibold text-lg hover:text-red-500 transition-colors cursor-pointer truncate">
                                {movie.title}
                            </h3>
                            <Badge className="bg-red-600 text-white text-xs ml-2 flex-shrink-0">{movie.quality}</Badge>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                            <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>{movie.year}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-red-500 text-red-500" />
                                <span>{movie.rating}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                <span>{movie.views.toLocaleString()}</span>
                            </div>
                            <span>{movie.duration}</span>
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">{movie.genre}</span>
                            <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">{movie.country}</span>
                        </div>

                        <p className="text-gray-400 text-sm line-clamp-2">{movie.description}</p>
                    </div>
                </div>
            </div>
        )
    }

    // Grid view (default)
    return (
        <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg bg-gray-800 transition-transform duration-300 group-hover:scale-105">
                {/* Movie Poster */}
                <div className="aspect-[2/3] relative">
                    <img src={movie.image || "/placeholder.svg"} alt={movie.title} className="w-full h-full object-cover" />

                    {/* Quality Badge */}
                    <Badge className="absolute top-2 left-2 bg-red-600 text-white text-xs">{movie.quality}</Badge>

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                            <Play className="w-6 h-6 text-black fill-current ml-1" />
                        </div>
                    </div>

                    {/* Duration */}
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {movie.duration}
                    </div>
                </div>

                {/* Movie Info */}
                <div className="p-3">
                    <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2 group-hover:text-red-500 transition-colors">
                        {movie.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                        <span>{movie.year}</span>
                        <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                            <span>{movie.rating}</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">{movie.genre}</span>
                        <span className="text-gray-500">
              {movie.views > 1000 ? `${Math.floor(movie.views / 1000)}K` : movie.views} views
            </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
