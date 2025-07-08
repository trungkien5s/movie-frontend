import React from "react";
import { Link } from "react-router-dom";
import { Film, Play, Star, Sparkles } from 'lucide-react';

const LayoutAuthentication = ({ children, title }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 relative overflow-hidden">
            {/* Enhanced Animated Background */}
            <div className="absolute inset-0">
                {/* Primary gradient orbs */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-red-500/30 to-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                <div
                    className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
                    style={{ animationDelay: "2s" }}
                ></div>
                <div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/30 to-indigo-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
                    style={{ animationDelay: "4s" }}
                ></div>

                {/* Secondary floating elements */}
                <div
                    className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full filter blur-2xl animate-bounce"
                    style={{ animationDuration: "6s" }}
                ></div>
                <div
                    className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-full filter blur-2xl animate-bounce"
                    style={{ animationDuration: "8s", animationDelay: "1s" }}
                ></div>
            </div>

            {/* Cinematic Grid Background */}
            <div className="absolute inset-0 opacity-5">
                <div className="grid grid-cols-12 gap-1 p-2 h-full">
                    {[...Array(96)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-gradient-to-br from-slate-600 to-slate-700 rounded-sm animate-pulse"
                            style={{
                                animationDelay: `${i * 0.05}s`,
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
                <Sparkles
                    className="absolute bottom-20 right-20 w-4 h-4 text-white/10 animate-float"
                    style={{ animationDelay: "6s" }}
                />
            </div>

            {/* Enhanced Header */}
            <div className="relative z-10 px-6 py-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/25">
                                <Film className="w-7 h-7 text-white" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-ping"></div>
                        </div>
                        <div>
                            <h1 className="text-white text-3xl font-bold bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                                Mê Phim
                            </h1>
                            <p className="text-slate-400 text-sm font-medium">Cinema Experience</p>
                        </div>
                    </div>
                    <nav className="hidden md:flex space-x-8 text-slate-300">
                        <Link to="/" className="hover:text-white transition-all duration-300 hover:scale-105 font-medium">
                            Trang chủ
                        </Link>
                        <a href="#" className="hover:text-white transition-all duration-300 hover:scale-105 font-medium">
                            Phim
                        </a>
                        <a href="#" className="hover:text-white transition-all duration-300 hover:scale-105 font-medium">
                            Thể loại
                        </a>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-200px)] px-4">
                <div className="w-full max-w-md">
                    {/* Enhanced Form Container */}
                    <div className="relative group">
                        {/* Glow effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 via-purple-500/20 to-blue-500/20 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-500"></div>

                        {/* Main form */}
                        <div className="relative backdrop-blur-2xl bg-slate-900/60 border border-slate-700/50 px-10 py-12 rounded-3xl shadow-2xl">
                            {/* Enhanced glassmorphism */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent rounded-3xl"></div>

                            <div className="relative">
                                <div className="text-center mb-10">
                                    <h2 className="text-white text-3xl font-bold mb-3 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                                        {title}
                                    </h2>
                                    <p className="text-slate-400 text-base font-medium">Chào mừng bạn đến với thế giới điện ảnh</p>
                                    <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full mx-auto mt-4"></div>
                                </div>

                                {children}

                                {/* Enhanced divider */}
                                <div className="mt-10 text-center">
                                    <div className="flex items-center justify-center space-x-4 text-slate-500">
                                        <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent flex-1"></div>
                                        <span className="text-sm font-medium px-4 bg-slate-900/50 rounded-full py-1">HOẶC</span>
                                        <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent flex-1"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced bottom text */}
                    <div className="text-center mt-8">
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Bằng cách đăng ký, bạn đồng ý với{" "}
                            <a
                                href="#"
                                className="text-red-400 hover:text-red-300 transition-colors duration-300 underline underline-offset-2"
                            >
                                Điều khoản sử dụng
                            </a>{" "}
                            và{" "}
                            <a
                                href="#"
                                className="text-red-400 hover:text-red-300 transition-colors duration-300 underline underline-offset-2"
                            >
                                Chính sách bảo mật
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            {/* Enhanced Footer */}
            <div className="relative z-10 px-6 py-6 border-t border-slate-800/50 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm space-y-2 md:space-y-0">
                    <p className="font-medium">&copy; 2024 Mê Phim. Tất cả quyền được bảo lưu.</p>
                    <div className="flex space-x-6">
                        <a href="#" className="hover:text-white transition-colors duration-300 font-medium">
                            Trợ giúp
                        </a>
                        <a href="#" className="hover:text-white transition-colors duration-300 font-medium">
                            Liên hệ
                        </a>
                        <a href="#" className="hover:text-white transition-colors duration-300 font-medium">
                            Về chúng tôi
                        </a>
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
        </div>
    );
};

export default LayoutAuthentication;
