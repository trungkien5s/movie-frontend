
import { useState } from "react"
import { Play, Heart, Info } from "lucide-react"
import {Badge} from "../UI/badge";
import Button from "../button/Button";

export default function HeroSection() {
    const moviesData = [
        {
            id: 1,
            title: "LƯỠI HÁI TỬ THẦN",
            subtitle: "HUYẾT THỐNG",
            englishTitle: "Final Destination Bloodlines",
            background: "/poster.webp",
            image: "https://static.nutscdn.com/vimg/150-0/27591bc926452f55a69c18dbf6b6f930.webp",
            imdb: "7.0",
            quality: "4K",
            rating: "T18",
            year: "2025",
            duration: "1h 44m",
            genres: ["Chiếu Rạp", "Gay Cấn", "Kinh Dị", "Bí Ẩn", "Hài"],
            description:
                "Bộ phim sẽ là xoay quanh một sinh viên đại học liên tục gặp các ác mộng về sự sụp đổ của gia đình cô, buộc cô phải trở về ngôi nhà của mình và tìm kiếm người có thể ngăn chặn điều độ xảy ra",
        },
        {
            id: 2,
            title: "NGƯỜI NHỆN",
            subtitle: "VŨ TRỤ MỚI",
            englishTitle: "Spider-Man: New Universe",
            background: "https://static.nutscdn.com/vimg/1920-0/d65790d160abd8842a11aa80c19d3bf1.jpg",
            image: "https://static.nutscdn.com/vimg/150-0/d65790d160abd8842a11aa80c19d3bf1.jpg",
            imdb: "8.2",
            quality: "4K",
            rating: "T13",
            year: "2024",
            duration: "2h 15m",
            genres: ["Hành Động", "Khoa Học Viễn Tưởng", "Phiêu Lưu", "Siêu Anh Hùng"],
            description:
                "Peter Parker phải đối mặt với thử thách lớn nhất khi các vũ trụ song song bắt đầu va chạm, tạo ra những mối đe dọa chưa từng có đối với thế giới.",
        },
        {
            id: 3,
            title: "CHIẾN BINH",
            subtitle: "HUYỀN THOẠI",
            englishTitle: "Legendary Warrior",
            background: "https://static.nutscdn.com/vimg/1920-0/b93de5750a063ee53413a5730194f5ce.jpg",
            image: "https://static.nutscdn.com/vimg/150-0/b93de5750a063ee53413a5730194f5ce.jpg",
            imdb: "7.8",
            quality: "HD",
            rating: "T16",
            year: "2024",
            duration: "2h 8m",
            genres: ["Hành Động", "Võ Thuật", "Cổ Trang", "Phiêu Lưu"],
            description:
                "Câu chuyện về một chiến binh trẻ tuổi phải vượt qua nhiều thử thách để trở thành huyền thoại và bảo vệ vương quốc khỏi thế lực tà ác.",
        },
        {
            id: 4,
            title: "BÍ ẨN",
            subtitle: "THÀNH PHỐ ĐÊM",
            englishTitle: "Night City Mystery",
            background: "https://static.nutscdn.com/vimg/1920-0/197ee94ccf1dfdddc1c542388b701320.jpg",
            image: "https://static.nutscdn.com/vimg/150-0/197ee94ccf1dfdddc1c542388b701320.jpg",
            imdb: "7.5",
            quality: "4K",
            rating: "T18",
            year: "2024",
            duration: "1h 58m",
            genres: ["Bí Ẩn", "Tâm Lý", "Hình Sự", "Kinh Dị"],
            description:
                "Một thám tử tư phải giải quyết loạt vụ án bí ẩn xảy ra trong thành phố, nơi mà mọi manh mối đều dẫn đến một âm mưu lớn hơn.",
        },
        {
            id: 5,
            title: "TÌNH YÊU",
            subtitle: "MÙA XUÂN",
            englishTitle: "Spring Love Story",
            background: "https://static.nutscdn.com/vimg/1920-0/60847d8f5b2a261bccf48c26dc958fb4.webp",
            image: "https://static.nutscdn.com/vimg/150-0/60847d8f5b2a261bccf48c26dc958fb4.webp",
            imdb: "8.0",
            quality: "HD",
            rating: "T13",
            year: "2024",
            duration: "1h 52m",
            genres: ["Tình Cảm", "Lãng Mạn", "Học Đường", "Thanh Xuân"],
            description:
                "Câu chuyện tình yêu đẹp giữa hai sinh viên đại học, với những khoảnh khắc ngọt ngào và thử thách của tuổi trẻ trong mùa xuân rực rỡ.",
        },
    ]

    const [currentMovie, setCurrentMovie] = useState(moviesData[0])
    const [isTransitioning, setIsTransitioning] = useState(false)

    const handleMovieChange = (movie) => {
        if (movie.id === currentMovie.id) return

        setIsTransitioning(true)

        // Delay để tạo hiệu ứng fade out trước khi thay đổi content
        setTimeout(() => {
            setCurrentMovie(movie)
            setIsTransitioning(false)
        }, 300)
    }

    return (
        <section className="relative h-screen overflow-hidden">
            {/* Background Image with transition */}
            <div
                className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 ease-in-out ${
                    isTransitioning ? "scale-110 opacity-70" : "scale-100 opacity-100"
                }`}
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%), url('${currentMovie.background}')`,
                }}
            />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
                <div
                    className={`max-w-2xl transition-all duration-500 ease-in-out ${
                        isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
                    }`}
                >
                    {/* Movie Title */}
                    <div className="mb-6">
                        <h1 className="text-6xl md:text-7xl font-bold text-white mb-2 leading-tight">
                            {currentMovie.title.split(" ").slice(0, 2).join(" ")}
                            <br />
                            {currentMovie.title.split(" ").slice(2).join(" ")}
                        </h1>
                        <h2 className="text-2xl md:text-3xl font-bold text-red-500 mb-4">{currentMovie.subtitle}</h2>
                        <p className="text-xl text-gray-300 font-medium">{currentMovie.englishTitle}</p>
                    </div>

                    {/* Movie Info Badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        <Badge variant="secondary" className="bg-yellow-600 text-white">
                            IMDb {currentMovie.imdb}
                        </Badge>
                        <Badge variant="secondary" className="bg-gray-700 text-white">
                            {currentMovie.quality}
                        </Badge>
                        <Badge variant="secondary" className="bg-red-600 text-white">
                            {currentMovie.rating}
                        </Badge>
                        <Badge variant="secondary" className="bg-gray-700 text-white">
                            {currentMovie.year}
                        </Badge>
                        <Badge variant="secondary" className="bg-gray-700 text-white">
                            {currentMovie.duration}
                        </Badge>
                    </div>

                    {/* Genres */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {currentMovie.genres.map((genre, index) => (
                            <span key={genre}>
                <span className="text-gray-300">{genre}</span>
                                {index < currentMovie.genres.length - 1 && <span className="text-gray-500 mx-2">•</span>}
              </span>
                        ))}
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-lg mb-8 max-w-xl leading-relaxed">{currentMovie.description}</p>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-4">
                        <Button
                            size="lg"
                            className="bg-red-500 hover:bg-red-600 text-black font-semibold px-8 transform hover:scale-105 transition-all duration-200"
                        >
                            <Play className="w-5 h-5 mr-2 fill-current" />
                            Xem Phim
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-gray-600 text-white hover:bg-gray-800 transform hover:scale-105 transition-all duration-200"
                        >
                            <Heart className="w-5 h-5 mr-2" />
                            Yêu thích
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-gray-600 text-white hover:bg-gray-800 transform hover:scale-105 transition-all duration-200"
                        >
                            <Info className="w-5 h-5 mr-2" />
                            Thông tin
                        </Button>
                    </div>
                </div>

                {/* Related Movies */}
                <div className="absolute bottom-8 right-8 hidden lg:block">
                    <div className="flex space-x-3">
                        {moviesData.map((movie) => (
                            <div
                                key={movie.id}
                                onClick={() => handleMovieChange(movie)}
                                className={`relative w-16 h-20 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-110 hover:shadow-2xl ${
                                    currentMovie.id === movie.id
                                        ? "ring-2 ring-yellow-500 scale-105 shadow-lg"
                                        : "hover:ring-2 hover:ring-white/50"
                                }`}
                            >
                                <img
                                    src={movie.image || "/placeholder.svg"}
                                    alt={movie.title}
                                    className="w-full h-full object-cover transition-all duration-300"
                                />

                                {/* Active indicator */}
                                {currentMovie.id === movie.id && (
                                    <div className="absolute inset-0 bg-yellow-500/20 flex items-center justify-center">
                                        <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                                            <Play className="w-3 h-3 text-black fill-current" />
                                        </div>
                                    </div>
                                )}

                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <Play className="w-4 h-4 text-white fill-current" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Movie title indicator */}
                    <div className="mt-3 text-center">
                        <p className="text-white text-sm font-medium truncate max-w-[320px]">{currentMovie.title}</p>
                    </div>
                </div>
            </div>

            {/* Loading overlay during transition */}
            {isTransitioning && (
                <div className="absolute inset-0 bg-black/20 z-20 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
        </section>
    )
}
