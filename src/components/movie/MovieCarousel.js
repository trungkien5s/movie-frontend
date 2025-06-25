
import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import MovieCard from "./MovieCard";

export default function MovieCarousel({ movies, title, autoScroll = true }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isHovered, setIsHovered] = useState(false)
    const intervalRef = useRef(null)
    const carouselRef = useRef(null)

    // Số lượng phim hiển thị theo màn hình
    const getItemsPerView = () => {
        if (typeof window !== "undefined") {
            if (window.innerWidth >= 1280) return 6 // xl
            if (window.innerWidth >= 1024) return 4 // lg
            if (window.innerWidth >= 768) return 3 // md
            return 2 // sm và nhỏ hơn
        }
        return 6
    }

    const [itemsPerView, setItemsPerView] = useState(getItemsPerView())

    // Update items per view on resize
    useEffect(() => {
        const handleResize = () => {
            setItemsPerView(getItemsPerView())
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    // Reset currentIndex when movies change
    useEffect(() => {
        setCurrentIndex(0)
    }, [movies])

    // Auto scroll functionality
    useEffect(() => {
        if (autoScroll && !isHovered && movies.length > itemsPerView) {
            intervalRef.current = setInterval(() => {
                setCurrentIndex((prevIndex) => {
                    const maxIndex = Math.max(0, movies.length - itemsPerView)
                    return prevIndex >= maxIndex ? 0 : prevIndex + 1
                })
            }, 4000) // Tăng thời gian auto scroll lên 4 giây
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [autoScroll, isHovered, movies.length, itemsPerView])

    const nextSlide = () => {
        const maxIndex = Math.max(0, movies.length - itemsPerView)
        setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1))
    }

    const prevSlide = () => {
        const maxIndex = Math.max(0, movies.length - itemsPerView)
        setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1))
    }

    const goToSlide = (index) => {
        setCurrentIndex(index)
    }

    // Kiểm tra nếu không có phim
    if (!movies || movies.length === 0) {
        return (
            <div className="mb-16">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
                </div>
                <div className="text-center py-12 bg-gray-800 rounded-lg">
                    <div className="text-gray-400 text-4xl mb-4">🎬</div>
                    <p className="text-gray-400">Đang tải {title.toLowerCase()}...</p>
                </div>
            </div>
        )
    }

    const maxIndex = Math.max(0, movies.length - itemsPerView)
    const showNavigation = movies.length > itemsPerView

    return (
        <div className="mb-16">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">{movies.length} phim</span>
                    <button className="flex items-center text-yellow-500 hover:text-yellow-400 transition-colors">
                        <span className="mr-2">Xem tất cả</span>
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Carousel Container */}
            <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                {/* Navigation Buttons */}
                {showNavigation && (
                    <>
                        <button
                            onClick={prevSlide}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200 transform hover:scale-110 -ml-4"
                            disabled={currentIndex === 0}
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200 transform hover:scale-110 -mr-4"
                            disabled={currentIndex >= maxIndex}
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </>
                )}

                {/* Movies Container */}
                <div className="overflow-hidden">
                    <div
                        ref={carouselRef}
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{
                            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                        }}
                    >
                        {movies.map((movie, index) => (
                            <div
                                key={`${movie.movieId || movie.id || index}`}
                                className="flex-shrink-0 px-2"
                                style={{ width: `${100 / itemsPerView}%` }}
                            >
                                <MovieCard movie={movie} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dots Indicator */}
                {showNavigation && (
                    <div className="flex justify-center mt-6 space-x-2">
                        {Array.from({ length: maxIndex + 1 }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                    currentIndex === index ? "bg-yellow-500 w-6" : "bg-gray-600 hover:bg-gray-400"
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Progress Bar */}
            {autoScroll && showNavigation && !isHovered && (
                <div className="mt-4">
                    <div className="w-full bg-gray-700 rounded-full h-1">
                        <div
                            className="bg-yellow-500 h-1 rounded-full transition-all duration-100 ease-linear"
                            style={{
                                width: `${((currentIndex + 1) / (maxIndex + 1)) * 100}%`,
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
