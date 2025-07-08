"use client"

import { Facebook, Twitter, Instagram, Youtube, Mail, Film, Star, Play, Heart } from "lucide-react"

export default function Footer() {
    return (
        <footer className="relative bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/50 overflow-hidden">
            {/* Enhanced Animated Background */}
            <div className="absolute inset-0">
                {/* Primary gradient orbs */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                <div
                    className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
                    style={{ animationDelay: "2s" }}
                ></div>
                <div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
                    style={{ animationDelay: "4s" }}
                ></div>
            </div>

            {/* Cinematic Grid Background */}
            <div className="absolute inset-0 opacity-5">
                <div className="grid grid-cols-12 gap-1 p-2 h-full">
                    {[...Array(48)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-gradient-to-br from-slate-600 to-slate-700 rounded-sm animate-pulse"
                            style={{
                                animationDelay: `${i * 0.1}s`,
                                animationDuration: `${3 + (i % 3)}s`,
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Floating Icons */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <Film
                    className="absolute top-20 left-20 w-6 h-6 text-white/10 animate-float"
                    style={{ animationDelay: "0s" }}
                />
                <Play
                    className="absolute top-40 right-32 w-4 h-4 text-white/10 animate-float"
                    style={{ animationDelay: "2s" }}
                />
                <Star
                    className="absolute bottom-40 left-40 w-5 h-5 text-white/10 animate-float"
                    style={{ animationDelay: "4s" }}
                />
                <Heart
                    className="absolute bottom-20 right-20 w-4 h-4 text-white/10 animate-float"
                    style={{ animationDelay: "6s" }}
                />
            </div>

            <div className="container mx-auto px-6 py-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Enhanced Company Info */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/25">
                                    <Film className="w-7 h-7 text-white" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-ping"></div>
                            </div>
                            <div>
                                <h3 className="text-white text-2xl font-bold bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                                    Mê Phim
                                </h3>
                                <p className="text-slate-400 text-sm font-medium -mt-1">Cinema Experience</p>
                            </div>
                        </div>

                        <p className="text-slate-400 text-sm leading-relaxed">
                            Mê Phim là nền tảng xem phim trực tuyến hàng đầu Việt Nam, cung cấp hàng ngàn bộ phim chất lượng cao với
                            trải nghiệm xem tuyệt vời.
                        </p>

                        {/* Enhanced Social Links */}
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="group relative p-3 bg-slate-800/50 hover:bg-red-500/20 border border-slate-700/50 hover:border-red-500/30 rounded-xl transition-all duration-300"
                            >
                                <Facebook className="w-5 h-5 text-slate-400 group-hover:text-red-400 group-hover:scale-110 transition-all duration-300" />
                                <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 to-red-500/0 group-hover:from-red-500/10 group-hover:to-red-500/5 rounded-xl transition-all duration-300"></div>
                            </a>
                            <a
                                href="#"
                                className="group relative p-3 bg-slate-800/50 hover:bg-red-500/20 border border-slate-700/50 hover:border-red-500/30 rounded-xl transition-all duration-300"
                            >
                                <Twitter className="w-5 h-5 text-slate-400 group-hover:text-red-400 group-hover:scale-110 transition-all duration-300" />
                                <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 to-red-500/0 group-hover:from-red-500/10 group-hover:to-red-500/5 rounded-xl transition-all duration-300"></div>
                            </a>
                            <a
                                href="#"
                                className="group relative p-3 bg-slate-800/50 hover:bg-red-500/20 border border-slate-700/50 hover:border-red-500/30 rounded-xl transition-all duration-300"
                            >
                                <Instagram className="w-5 h-5 text-slate-400 group-hover:text-red-400 group-hover:scale-110 transition-all duration-300" />
                                <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 to-red-500/0 group-hover:from-red-500/10 group-hover:to-red-500/5 rounded-xl transition-all duration-300"></div>
                            </a>
                            <a
                                href="#"
                                className="group relative p-3 bg-slate-800/50 hover:bg-red-500/20 border border-slate-700/50 hover:border-red-500/30 rounded-xl transition-all duration-300"
                            >
                                <Youtube className="w-5 h-5 text-slate-400 group-hover:text-red-400 group-hover:scale-110 transition-all duration-300" />
                                <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 to-red-500/0 group-hover:from-red-500/10 group-hover:to-red-500/5 rounded-xl transition-all duration-300"></div>
                            </a>
                        </div>
                    </div>

                    {/* Enhanced Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-white font-semibold text-lg flex items-center">
                            <div className="w-2 h-6 bg-gradient-to-b from-red-500 to-red-600 rounded-full mr-3"></div>
                            Liên kết nhanh
                        </h4>
                        <ul className="space-y-3">
                            {["Trang chủ", "Phim mới", "Phim lẻ", "Phim bộ", "Phim chiếu rạp", "Top phim hay"].map((link, index) => (
                                <li key={index}>
                                    <a
                                        href="#"
                                        className="group flex items-center text-slate-400 hover:text-red-400 transition-all duration-300 text-sm"
                                    >
                                        <div className="w-1 h-1 bg-slate-600 group-hover:bg-red-500 rounded-full mr-3 transition-all duration-300 group-hover:scale-150"></div>
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">{link}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Enhanced Categories */}
                    <div className="space-y-6">
                        <h4 className="text-white font-semibold text-lg flex items-center">
                            <div className="w-2 h-6 bg-gradient-to-b from-red-500 to-red-600 rounded-full mr-3"></div>
                            Thể loại
                        </h4>
                        <ul className="space-y-3">
                            {["Hành động", "Kinh dị", "Hài hước", "Tình cảm", "Khoa học viễn tưởng", "Hoạt hình"].map(
                                (genre, index) => (
                                    <li key={index}>
                                        <a
                                            href="#"
                                            className="group flex items-center text-slate-400 hover:text-red-400 transition-all duration-300 text-sm"
                                        >
                                            <div className="w-1 h-1 bg-slate-600 group-hover:bg-red-500 rounded-full mr-3 transition-all duration-300 group-hover:scale-150"></div>
                                            <span className="group-hover:translate-x-1 transition-transform duration-300">{genre}</span>
                                        </a>
                                    </li>
                                ),
                            )}
                        </ul>
                    </div>

                    {/* Enhanced Contact Info */}
                    <div className="space-y-6">
                        <h4 className="text-white font-semibold text-lg flex items-center">
                            <div className="w-2 h-6 bg-gradient-to-b from-red-500 to-red-600 rounded-full mr-3"></div>
                            Liên hệ
                        </h4>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-3 group">
                                <div className="p-2 bg-slate-800/50 border border-slate-700/50 group-hover:border-red-500/30 rounded-lg transition-all duration-300">
                                    <Mail className="w-4 h-4 text-red-500" />
                                </div>
                                <span className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors duration-300">
                  mephim@gmail.com
                </span>
                            </div>
                        </div>

                        {/* Enhanced Newsletter */}
                        <div className="space-y-4">
                            <h5 className="text-white font-medium flex items-center">
                                <Star className="w-4 h-4 text-red-500 mr-2" />
                                Đăng ký nhận tin
                            </h5>
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl blur-lg group-focus-within:blur-xl transition-all duration-500 opacity-0 group-focus-within:opacity-100"></div>
                                <div className="relative flex">
                                    <input
                                        type="email"
                                        placeholder="Email của bạn"
                                        className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-l-xl text-white text-sm focus:bg-slate-800/70 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 placeholder-slate-400 transition-all duration-300"
                                    />
                                    <button className="relative overflow-hidden px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-medium rounded-r-xl transition-all duration-300 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 group">
                                        <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-white/20 to-red-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                        <span className="relative">Đăng ký</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Bottom Bar */}
                <div className="relative mt-12 pt-8">
                    {/* Glassmorphism separator */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>

                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-slate-400 text-sm font-medium">© 2024 Mê Phim. Tất cả quyền được bảo lưu.</div>
                        <div className="flex space-x-8">
                            {["Điều khoản sử dụng", "Chính sách bảo mật", "Hỗ trợ"].map((link, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="text-slate-400 hover:text-red-400 transition-colors duration-300 text-sm font-medium hover:underline underline-offset-2"
                                >
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-20px) rotate(180deg); 
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
        </footer>
    )
}
