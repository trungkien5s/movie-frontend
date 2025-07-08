"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Eye, EyeOff, Lock, User, AlertCircle, CheckCircle2 } from "lucide-react"

import axios from "axios"
import LayoutAuthentication from "../../components/layoutauthen/LayoutAuthentication";
import {useAuth} from "../../components/contexts/AuthContext";

const schema = yup.object({
    email_or_username: yup.string().required("Tên đăng nhập là bắt buộc"),
    password: yup.string().required("Mật khẩu là bắt buộc"),
})

const SignInPage = () => {
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [rememberMe, setRememberMe] = useState(false)
    const navigate = useNavigate()
    const { login } = useAuth()

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onSubmit",
    })

    const apiURL = process.env.REACT_APP_API_URL

    const handleSignIn = async (values) => {
        setLoading(true)
        setErrorMessage("")

        try {
            const payload = {
                email_or_username: values.email_or_username,
                password: values.password,
            }

            console.log("JSON Payload being sent:", payload)
            const response = await axios.post(`${apiURL}/api/auth/login`, payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            })

            if (response.status === 200 || response.status === 201) {
                const userData = response.data

                if (!userData.access_token) {
                    throw new Error("Access token không tồn tại trong phản hồi từ server.")
                }

                console.log("Login successful:", userData)
                await login(userData.access_token, userData.user)
                navigate("/")
            } else {
                setErrorMessage(`Lỗi đăng nhập: Status ${response.status}`)
            }
        } catch (error) {
            console.error("Login error:", error)

            if (error.response) {
                let errorMsg = "Thông tin đăng nhập không chính xác."
                const errorData = error.response.data

                if (typeof errorData === "string") {
                    errorMsg = errorData
                } else if (errorData?.detail) {
                    if (typeof errorData.detail === "string") {
                        errorMsg = errorData.detail
                    } else if (Array.isArray(errorData.detail)) {
                        errorMsg = errorData.detail
                            .map((err) => {
                                if (typeof err === "string") return err
                                if (err.msg) return `${err.loc ? err.loc.join(".") : "Field"}: ${err.msg}`
                                return JSON.stringify(err)
                            })
                            .join("\n")
                    }
                } else if (errorData?.message) {
                    errorMsg = errorData.message
                }

                if (error.response.status === 401) {
                    errorMsg = "Thông tin đăng nhập không chính xác."
                } else if (error.response.status === 422) {
                    errorMsg = "Dữ liệu không hợp lệ: " + errorMsg
                } else if (error.response.status === 400) {
                    errorMsg = "Yêu cầu không hợp lệ: " + errorMsg
                }

                setErrorMessage(errorMsg)
            } else if (error.message === "Access token không tồn tại trong phản hồi từ server.") {
                setErrorMessage("Không nhận được token từ server. Vui lòng liên hệ quản trị viên.")
            } else {
                setErrorMessage("Không thể kết nối tới server. Vui lòng kiểm tra kết nối mạng và thử lại.")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <LayoutAuthentication title="Đăng nhập">
            <form onSubmit={handleSubmit(handleSignIn)} className="space-y-6">
                {/* Enhanced Error Message */}
                {errorMessage && (
                    <div className="relative">
                        <div className="absolute inset-0 bg-red-500/20 rounded-xl blur-sm"></div>
                        <div className="relative bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-4 rounded-xl text-sm flex items-center space-x-3 backdrop-blur-sm">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <span className="font-medium">{errorMessage}</span>
                        </div>
                    </div>
                )}

                {/* Enhanced Username Input */}
                <div className="space-y-2">
                    <label className="text-slate-300 text-sm font-medium flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>Tên đăng nhập</span>
                    </label>
                    <div className="relative group">
                        <input
                            {...register("email_or_username")}
                            type="text"
                            className="w-full bg-slate-800/50 border border-slate-600/50 text-white px-4 py-4 rounded-xl focus:bg-slate-800/70 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 placeholder-slate-400 transition-all duration-300 group-hover:border-slate-500/70"
                            placeholder="Nhập tên đăng nhập hoặc email"
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/0 via-red-500/0 to-red-500/0 group-focus-within:from-red-500/10 group-focus-within:via-red-500/5 group-focus-within:to-red-500/10 transition-all duration-500 pointer-events-none"></div>
                    </div>
                    {errors.email_or_username && (
                        <p className="text-red-400 text-sm flex items-center space-x-2">
                            <AlertCircle className="w-4 h-4" />
                            <span>{errors.email_or_username.message}</span>
                        </p>
                    )}
                </div>

                {/* Enhanced Password Input */}
                <div className="space-y-2">
                    <label className="text-slate-300 text-sm font-medium flex items-center space-x-2">
                        <Lock className="w-4 h-4" />
                        <span>Mật khẩu</span>
                    </label>
                    <div className="relative group">
                        <input
                            {...register("password")}
                            type={showPassword ? "text" : "password"}
                            className="w-full bg-slate-800/50 border border-slate-600/50 text-white px-4 py-4 pr-12 rounded-xl focus:bg-slate-800/70 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 placeholder-slate-400 transition-all duration-300 group-hover:border-slate-500/70"
                            placeholder="Nhập mật khẩu"
                        />
                        <button
                            type="button"
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors duration-300 p-1"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/0 via-red-500/0 to-red-500/0 group-focus-within:from-red-500/10 group-focus-within:via-red-500/5 group-focus-within:to-red-500/10 transition-all duration-500 pointer-events-none"></div>
                    </div>
                    {errors.password && (
                        <p className="text-red-400 text-sm flex items-center space-x-2">
                            <AlertCircle className="w-4 h-4" />
                            <span>{errors.password.message}</span>
                        </p>
                    )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <div className="relative">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="sr-only"
                            />
                            <div
                                className={`w-5 h-5 rounded border-2 transition-all duration-300 ${
                                    rememberMe ? "bg-red-500 border-red-500" : "border-slate-500 group-hover:border-slate-400"
                                }`}
                            >
                                {rememberMe && <CheckCircle2 className="w-3 h-3 text-white m-0.5" />}
                            </div>
                        </div>
                        <span className="text-slate-300 text-sm font-medium group-hover:text-white transition-colors duration-300">
              Ghi nhớ tôi
            </span>
                    </label>
                    <Link
                        to="/auth/reset"
                        className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors duration-300 hover:underline underline-offset-2"
                    >
                        Quên mật khẩu?
                    </Link>
                </div>

                {/* Enhanced Login Button */}
                <button type="submit" disabled={loading} className="relative w-full group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600 rounded-xl transition-all duration-300 group-hover:from-red-500 group-hover:via-red-400 group-hover:to-red-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-white/20 to-red-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    <div className="relative bg-gradient-to-r from-red-600 to-red-500 text-white py-4 px-6 rounded-xl font-semibold text-base transition-all duration-300 group-hover:shadow-lg group-hover:shadow-red-500/25 group-disabled:opacity-50 group-disabled:cursor-not-allowed">
                        {loading ? (
                            <div className="flex items-center justify-center space-x-3">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>Đang đăng nhập...</span>
                            </div>
                        ) : (
                            <span>Đăng nhập</span>
                        )}
                    </div>
                </button>

                {/* Sign Up Link */}
                <div className="text-center pt-6 border-t border-slate-700/50">
                    <p className="text-slate-400 text-sm">
                        Bạn chưa có tài khoản?{" "}
                        <Link
                            to="/auth/sign-up"
                            className="text-white hover:text-red-400 font-semibold transition-colors duration-300 hover:underline underline-offset-2"
                        >
                            Đăng ký ngay
                        </Link>
                    </p>
                </div>

                {/* Social Login Options */}
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            className="flex items-center justify-center space-x-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 hover:border-slate-500/50 text-slate-300 hover:text-white py-3 px-4 rounded-xl transition-all duration-300 font-medium"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span>Google</span>
                        </button>
                        <button
                            type="button"
                            className="flex items-center justify-center space-x-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 hover:border-slate-500/50 text-slate-300 hover:text-white py-3 px-4 rounded-xl transition-all duration-300 font-medium"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            <span>Facebook</span>
                        </button>
                    </div>
                </div>
            </form>
        </LayoutAuthentication>
    )
}

export default SignInPage
