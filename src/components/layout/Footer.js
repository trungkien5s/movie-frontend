import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
    return (
        <footer className="bg-gray-950 border-t border-gray-800">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                                <span className="text-black font-bold text-lg">M</span>
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-xl">Mê Phim</h3>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Mê Phim là nền tảng xem phim trực tuyến hàng đầu Việt Nam, cung cấp hàng ngàn bộ phim chất lượng cao với
                            trải nghiệm xem tuyệt vời.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-white font-semibold text-lg">Liên kết nhanh</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">
                                    Trang chủ
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">
                                    Phim mới
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">
                                    Phim lẻ
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">
                                    Phim bộ
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">
                                    Phim chiếu rạp
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">
                                    Top phim hay
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div className="space-y-4">
                        <h4 className="text-white font-semibold text-lg">Thể loại</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">
                                    Hành động
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">
                                    Kinh dị
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">
                                    Hài hước
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">
                                    Tình cảm
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">
                                    Khoa học viễn tưởng
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">
                                    Hoạt hình
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h4 className="text-white font-semibold text-lg">Liên hệ</h4>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
                                <span className="text-gray-400 text-sm">Cầu Giấy , Hà Nội</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="w-4 h-4 text-red-500 flex-shrink-0" />
                                <span className="text-gray-400 text-sm">+84 0376 940 811</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="w-4 h-4 text-red-500 flex-shrink-0" />
                                <span className="text-gray-400 text-sm">mephim@gmail.com</span>
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className="mt-6">
                            <h5 className="text-white font-medium mb-2">Đăng ký nhận tin</h5>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Email của bạn"
                                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md text-white text-sm focus:outline-none focus:border-gray-500"
                                />
                                <button className="px-4 py-2 bg-red-500 text-white font-medium rounded-r-md hover:bg-red-600 transition-colors">
                                    Đăng ký
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-8 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-gray-400 text-sm">© 2024 Mê Phim. Tất cả quyền được bảo lưu.</div>
                        <div className="flex space-x-6">
                            <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">
                                Điều khoản sử dụng
                            </a>
                            <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">
                                Chính sách bảo mật
                            </a>
                            <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">
                                Hỗ trợ
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
