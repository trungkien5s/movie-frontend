import { Search, ChevronDown, User, Bell } from "lucide-react"
import Input from "../input/Input";
import Button from "../button/Button";
import {Link, useNavigate} from "react-router-dom";
import SeachBar from "./SeachBar";

export default function Header() {
    const navigate = useNavigate();
    return (

        <header className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between gap-0">
                    {/* Logo */}
                    <div className="flex-shrink-0 ml-0 ">
                        <a
                            href="/#"
                            className="text-red-600 text-xl lg:text-4xl font-bold whitespace-nowrap ">
                            Mê Phim
                        </a>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-grow">
                        <SeachBar className="w-full lg:w-96 text-lg" /> {/* Tăng kích thước thanh tìm kiếm */}
                    </div>

                    {/* Navigation - Hidden on smaller screens */}
                    <nav className="hidden xl:flex items-center space-x-4 2xl:space-x-6">

                        <div className="flex items-center space-x-1 text-white hover:text-yellow-500 transition-colors cursor-pointer">
                            <span className="whitespace-nowrap">Thể loại</span>
                            <ChevronDown className="w-4 h-4" />
                        </div>
                        <button
                            onClick={() => navigate("/phim-le")}
                            className="text-white hover:text-yellow-500 transition-colors"
                        >
                            Phim lẻ
                        </button>

                        <button
                            onClick={() => navigate("/phim-bo")}
                            className="text-white hover:text-yellow-500 transition-colors"
                        >
                            Phim bộ
                        </button>

                        <div className="flex items-center space-x-1 text-white hover:text-yellow-500 transition-colors cursor-pointer">
                            <span className="whitespace-nowrap">Quốc gia</span>
                            <ChevronDown className="w-4 h-4" />
                        </div>
                        <a href="#" className="text-white hover:text-yellow-500 transition-colors whitespace-nowrap">
                            Diễn viên
                        </a>
                        <a href="#" className="text-white hover:text-yellow-500 transition-colors whitespace-nowrap">
                            Lịch chiếu
                        </a>
                    </nav>

                    {/* User Actions */}
                    <div className="flex items-center flex-shrink-0">
                        <Button
                            asChild
                            variant="outline"
                            className="border-gray-600 text-white hover:bg-gray-800 text-sm lg:text-base">
                            <Link to="/auth/sign-in" className="flex items-center">
                                <User className="w-4 h-4 mr-2" />
                                <span className="hidden sm:inline">Đăng nhập</span>
                                <span className="sm:hidden">Login</span>
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <nav className="xl:hidden mt-3 pt-3 border-t border-gray-800">
                    <div className="flex flex-wrap gap-4 text-sm">
                        <a href="#" className="text-white hover:text-yellow-500 transition-colors">
                            Chủ Đề
                        </a>
                        <div className="flex items-center space-x-1 text-white hover:text-yellow-500 transition-colors cursor-pointer">
                            <span>Thể loại</span>
                            <ChevronDown className="w-3 h-3" />
                        </div>
                        <button
                            onClick={() => navigate("/phim-le")}
                            className="text-white hover:text-yellow-500 transition-colors"
                        >
                            Phim Lẻ
                        </button>

                        <a href="#" className="text-white hover:text-yellow-500 transition-colors">
                            Phim Bộ
                        </a>
                        <div className="flex items-center space-x-1 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-medium">
                            <span>NEW</span>
                            <span>Xem Chung</span>
                        </div>
                        <div className="flex items-center space-x-1 text-white hover:text-yellow-500 transition-colors cursor-pointer">
                            <span>Quốc gia</span>
                            <ChevronDown className="w-3 h-3" />
                        </div>
                        <a href="#" className="text-white hover:text-yellow-500 transition-colors">
                            Diễn Viên
                        </a>
                        <a href="#" className="text-white hover:text-yellow-500 transition-colors">
                            Lịch chiếu
                        </a>
                    </div>
                </nav>
            </div>
        </header>
    )
}
