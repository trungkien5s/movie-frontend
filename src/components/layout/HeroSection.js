import { Play, Heart, Info } from "lucide-react"
import {Badge} from "../UI/badge";
import Button from "../button/Button";


export default function HeroSection() {

    return (
        <section className="relative h-screen overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(/poster.webp)`,
                    backgroundSize: '100%', // Điều chỉnh kích thước ảnh xuống 50%
                }}
            />


            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
                <div className="max-w-2xl">
                    {/* Movie Title */}
                    <div className="mb-6">
                        <h1 className="text-6xl md:text-7xl font-bold text-white mb-2 leading-tight">
                            LƯỠI HÁI
                            <br />
                            TỬ THẦN
                        </h1>
                        <h2 className="text-2xl md:text-3xl font-bold text-red-500 mb-4">HUYẾT THỐNG</h2>
                        <p className="text-xl text-gray-300 font-medium">Final Destination Bloodlines</p>
                    </div>

                    {/* Movie Info Badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        <Badge variant="secondary" className="bg-yellow-600 text-white">
                            IMDb 7.0
                        </Badge>
                        <Badge variant="secondary" className="bg-gray-700 text-white">
                            4K
                        </Badge>
                        <Badge variant="secondary" className="bg-red-600 text-white">
                            T18
                        </Badge>
                        <Badge variant="secondary" className="bg-gray-700 text-white">
                            2025
                        </Badge>
                        <Badge variant="secondary" className="bg-gray-700 text-white">
                            1h 44m
                        </Badge>
                    </div>

                    {/* Genres */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        <span className="text-gray-300">Chiếu Rạp</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-300">Gay Cấn</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-300">Kinh Dị</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-300">Bí Ẩn</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-300">Hài</span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-lg mb-8 max-w-xl leading-relaxed">
                        Bộ phim sẽ là xoay quanh một sinh viên đại học liên tục gặp các ác mộng về sự sụp đổ của gia đình cô, buộc
                        cô phải trở về ngôi nhà của mình và tìm kiếm người có thể ngăn chặn điều độ xảy ra
                    </p>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-4">
                        <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8">
                            <Play className="w-5 h-5 mr-2 fill-current" />
                            Xem Phim
                        </Button>
                        <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                            <Heart className="w-5 h-5 mr-2" />
                            Yêu thích
                        </Button>
                        <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                            <Info className="w-5 h-5 mr-2" />
                            Thông tin
                        </Button>
                    </div>
                </div>

                {/* Related Movies */}
                {/*<div className="absolute bottom-8 right-8 hidden lg:block">*/}
                {/*    <div className="flex space-x-2">*/}
                {/*        {relatedMovies.map((movie) => (*/}
                {/*            <div*/}
                {/*                key={movie.id}*/}
                {/*                className="w-16 h-20 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"*/}
                {/*            >*/}
                {/*                <img src={movie.image || "/placeholder.svg"} alt={movie.title} className="w-full h-full object-cover" />*/}
                {/*            </div>*/}
                {/*        ))}*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </section>
    )
}
