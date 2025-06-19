import { ChevronRight } from "lucide-react"
import MovieCard from "./MovieCard";

export default function MovieList() {
    const movies = [
        {
            id: 1,
            title: "Avengers: Endgame",
            year: "2019",
            rating: "8.4",
            image: "https://static.nutscdn.com/vimg/300-0/fd9e8ba1244e513e74534f0d325c9481.jpg",
            quality: "4K",
            duration: "3h 1m",
        },
        {
            id: 2,
            title: "Spider-Man: No Way Home",
            year: "2021",
            rating: "8.2",
            image: "https://static.nutscdn.com/vimg/300-0/af4a1ac52ebce28e25ba85f931cf4677.jpg",
            quality: "HD",
            duration: "2h 28m",
        },
        {
            id: 3,
            title: "The Batman",
            year: "2022",
            rating: "7.8",
            image: "https://static.nutscdn.com/vimg/300-0/4aeaea1cb315df3fe12b29639399ad89.jpg",
            quality: "4K",
            duration: "2h 56m",
        },
        {
            id: 4,
            title: "Top Gun: Maverick",
            year: "2022",
            rating: "8.3",
            image: "https://static.nutscdn.com/vimg/300-0/8fadb7f5058600929db40afc487d993a.jpg",
            quality: "4K",
            duration: "2h 11m",
        },
        {
            id: 5,
            title: "Black Panther",
            year: "2018",
            rating: "7.3",
            image: "https://static.nutscdn.com/vimg/300-0/0dac32eb8c6bce10eaf25ae363fbe353.jpg",
            quality: "HD",
            duration: "2h 14m",
        },
        {
            id: 6,
            title: "Dune",
            year: "2021",
            rating: "8.0",
            image: "https://static.nutscdn.com/vimg/300-0/c27a7db229330749e925e8ac2ea18918.jpg",
            quality: "4K",
            duration: "2h 35m",
        },
    ]

    return (
        <section className="py-12 bg-gray-900">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-white">Bạn đang quan tâm gì?</h2>
                    <button className="flex items-center text-yellow-500 hover:text-yellow-400 transition-colors">
                        <span className="mr-2">Xem tất cả</span>
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Movies Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>

                {/* Additional Sections */}
                <div className="mt-16">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-white">Phim Mới Cập Nhật</h2>
                        <button className="flex items-center text-yellow-500 hover:text-yellow-400 transition-colors">
                            <span className="mr-2">Xem tất cả</span>
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
                        {movies
                            .slice()
                            .reverse()
                            .map((movie) => (
                                <MovieCard key={`new-${movie.id}`} movie={movie} />
                            ))}
                    </div>
                </div>

                <div className="mt-16">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-white">Phim Lẻ Hay Nhất</h2>
                        <button className="flex items-center text-yellow-500 hover:text-yellow-400 transition-colors">
                            <span className="mr-2">Xem tất cả</span>
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
                        {movies.map((movie) => (
                            <MovieCard key={`best-${movie.id}`} movie={movie} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
