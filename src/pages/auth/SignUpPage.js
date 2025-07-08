

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Eye, EyeOff, Lock, User, Mail, AlertCircle, CheckCircle2, Shield } from "lucide-react"

import axios from "axios"
import LayoutAuthentication from "../../components/layoutauthen/LayoutAuthentication";

const schema = yup.object({
    fullname: yup.string().required("Họ tên là bắt buộc"),
    username: yup.string().required("Tên đăng nhập là bắt buộc"),
    email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
    password: yup
        .string()
        .required("Mật khẩu là bắt buộc")
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
        .matches(/[A-Z]/, "Mật khẩu phải có ít nhất 1 chữ cái viết hoa")
        .matches(/[a-z]/, "Mật khẩu phải có ít nhất 1 chữ cái thường")
        .matches(/[0-9]/, "Mật khẩu phải có ít nhất 1 số")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Mật khẩu phải có ít nhất 1 ký tự đặc biệt"),
    confirmpassword: yup
        .string()
        .oneOf([yup.ref("password")], "Mật khẩu xác nhận không khớp")
        .required("Xác nhận mật khẩu là bắt buộc"),
})

const SignUpPage = () => {
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [acceptTerms, setAcceptTerms] = useState(false)
    const navigate = useNavigate()

    const {
        handleSubmit,
        register,
        formState: { errors },
        watch,
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
    })

    const password = watch("password")
    const apiURL = process.env.REACT_APP_API_URL

    const getPasswordStrength = (password) => {
        if (!password) return { strength: 0, label: "", color: "" }

        let strength = 0
        if (password.length >= 6) strength++
        if (/[A-Z]/.test(password)) strength++
        if (/[a-z]/.test(password)) strength++
        if (/[0-9]/.test(password)) strength++
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++

        const labels = ["Rất yếu", "Yếu", "Trung bình", "Mạnh", "Rất mạnh"]
        const colors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"]

        return {
            strength,
            label: labels[strength - 1] || "",
            color: colors[strength - 1] || "bg-gray-500",
        }
    }

    const passwordStrength = getPasswordStrength(password)

    const handleSignUp = async (values) => {
        if (!acceptTerms) {
            setErrorMessage("Vui lòng đồng ý với điều khoản sử dụng")
            return
        }

        setLoading(true)
        setErrorMessage("")

        try {
            const payload = {
                full_name: values.fullname,
                username: values.username,
                email: values.email,
                password: values.password,
                role: false,
            }

            console.log("Payload gửi lên server:", payload)
            const response = await axios.post(`${apiURL}/api/auth/register`, payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            })

            if (response.status === 201) {
                const serverMessage = response.data.message || "Đăng ký thành công!"
                alert(serverMessage)
                navigate("/auth/sign-in", { state: { message: serverMessage } })
            } else {
                setErrorMessage("Không thể đăng ký. Vui lòng thử lại.")
            }
        } catch (error) {
            console.error("Error:", error)

            if (error.response) {
                let errorMsg = "Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại."
                const errorData = error.response.data

                if (typeof errorData === "string") {
                    errorMsg = errorData
                } else if (errorData?.message && typeof errorData.message === "string") {
                    errorMsg = errorData.message
                } else if (errorData?.detail) {
                    if (typeof errorData.detail === "string") {
                        errorMsg = errorData.detail
                    } else if (Array.isArray(errorData.detail)) {
                        errorMsg = errorData.detail
                            .map((err) => {
                                if (typeof err === "string") return err
                                if (err.msg) return err.msg
                                return JSON.stringify(err)
                            })
                            .join(", ")
                    } else if (typeof errorData.detail === "object") {
                        errorMsg = errorData.detail.msg || JSON.stringify(errorData.detail)
                    }
                }
                setErrorMessage(errorMsg)
            } else if (error.request) {
                setErrorMessage("Không thể kết nối tới server. Vui lòng kiểm tra kết nối mạng và thử lại.")
            } else {
                setErrorMessage("Đã xảy ra lỗi không xác định. Vui lòng thử lại.")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <LayoutAuthentication title="Đăng ký">
            <form onSubmit={handleSubmit(handleSignUp)} className="space-y-6">
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

                {/* Username Input */}
                <div className="space-y-2">
                    <label className="text-slate-300 text-sm font-medium flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>Tên đăng nhập</span>
                    </label>
                    <div className="relative group">
                        <input
                            {...register("username")}
                            type="text"
                            className="w-full bg-slate-800/50 border border-slate-600/50 text-white px-4 py-4 rounded-xl focus:bg-slate-800/70 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 placeholder-slate-400 transition-all duration-300 group-hover:border-slate-500/70"
                            placeholder="Nhập tên đăng nhập"
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/0 via-red-500/0 to-red-500/0 group-focus-within:from-red-500/10 group-focus-within:via-red-500/5 group-focus-within:to-red-500/10 transition-all duration-500 pointer-events-none"></div>
                    </div>
                    {errors.username && (
                        <p className="text-red-400 text-sm flex items-center space-x-2">
                            <AlertCircle className="w-4 h-4" />
                            <span>{errors.username.message}</span>
                        </p>
                    )}
                </div>

                {/* Full Name Input */}
                <div className="space-y-2">
                    <label className="text-slate-300 text-sm font-medium flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>Họ tên</span>
                    </label>
                    <div className="relative group">
                        <input
                            {...register("fullname")}
                            type="text"
                            className="w-full bg-slate-800/50 border border-slate-600/50 text-white px-4 py-4 rounded-xl focus:bg-slate-800/70 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 placeholder-slate-400 transition-all duration-300 group-hover:border-slate-500/70"
                            placeholder="Nhập họ tên đầy đủ"
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/0 via-red-500/0 to-red-500/0 group-focus-within:from-red-500/10 group-focus-within:via-red-500/5 group-focus-within:to-red-500/10 transition-all duration-500 pointer-events-none"></div>
                    </div>
                    {errors.fullname && (
                        <p className="text-red-400 text-sm flex items-center space-x-2">
                            <AlertCircle className="w-4 h-4" />
                            <span>{errors.fullname.message}</span>
                        </p>
                    )}
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                    <label className="text-slate-300 text-sm font-medium flex items-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>Email</span>
                    </label>
                    <div className="relative group">
                        <input
                            {...register("email")}
                            type="email"
                            className="w-full bg-slate-800/50 border border-slate-600/50 text-white px-4 py-4 rounded-xl focus:bg-slate-800/70 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 placeholder-slate-400 transition-all duration-300 group-hover:border-slate-500/70"
                            placeholder="Nhập địa chỉ email"
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/0 via-red-500/0 to-red-500/0 group-focus-within:from-red-500/10 group-focus-within:via-red-500/5 group-focus-within:to-red-500/10 transition-all duration-500 pointer-events-none"></div>
                    </div>
                    {errors.email && (
                        <p className="text-red-400 text-sm flex items-center space-x-2">
                            <AlertCircle className="w-4 h-4" />
                            <span>{errors.email.message}</span>
                        </p>
                    )}
                </div>

                {/* Password Input with Strength Indicator */}
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

                    {/* Password Strength Indicator */}
                    {password && (
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <div className="flex-1 bg-slate-700 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full transition-all duration-500 ${passwordStrength.color}`}
                                        style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                                    ></div>
                                </div>
                                <span className="text-xs text-slate-400 font-medium min-w-[80px]">{passwordStrength.label}</span>
                            </div>
                        </div>
                    )}

                    {errors.password && (
                        <p className="text-red-400 text-sm flex items-center space-x-2">
                            <AlertCircle className="w-4 h-4" />
                            <span>{errors.password.message}</span>
                        </p>
                    )}
                </div>

                {/* Confirm Password Input */}
                <div className="space-y-2">
                    <label className="text-slate-300 text-sm font-medium flex items-center space-x-2">
                        <Shield className="w-4 h-4" />
                        <span>Xác nhận mật khẩu</span>
                    </label>
                    <div className="relative group">
                        <input
                            {...register("confirmpassword")}
                            type={showConfirmPassword ? "text" : "password"}
                            className="w-full bg-slate-800/50 border border-slate-600/50 text-white px-4 py-4 pr-12 rounded-xl focus:bg-slate-800/70 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 placeholder-slate-400 transition-all duration-300 group-hover:border-slate-500/70"
                            placeholder="Nhập lại mật khẩu"
                        />
                        <button
                            type="button"
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors duration-300 p-1"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/0 via-red-500/0 to-red-500/0 group-focus-within:from-red-500/10 group-focus-within:via-red-500/5 group-focus-within:to-red-500/10 transition-all duration-500 pointer-events-none"></div>
                    </div>
                    {errors.confirmpassword && (
                        <p className="text-red-400 text-sm flex items-center space-x-2">
                            <AlertCircle className="w-4 h-4" />
                            <span>{errors.confirmpassword.message}</span>
                        </p>
                    )}
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-4">
                    <label className="flex items-start space-x-3 cursor-pointer group">
                        <div className="relative mt-0.5">
                            <input
                                type="checkbox"
                                checked={acceptTerms}
                                onChange={(e) => setAcceptTerms(e.target.checked)}
                                className="sr-only"
                            />
                            <div
                                className={`w-5 h-5 rounded border-2 transition-all duration-300 ${
                                    acceptTerms ? "bg-red-500 border-red-500" : "border-slate-500 group-hover:border-slate-400"
                                }`}
                            >
                                {acceptTerms && <CheckCircle2 className="w-3 h-3 text-white m-0.5" />}
                            </div>
                        </div>
                        <span className="text-slate-300 text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
              Tôi đồng ý với{" "}
                            <a href="#" className="text-red-400 hover:text-red-300 underline underline-offset-2">
                Điều khoản sử dụng
              </a>{" "}
                            và{" "}
                            <a href="#" className="text-red-400 hover:text-red-300 underline underline-offset-2">
                Chính sách bảo mật
              </a>
            </span>
                    </label>
                </div>

                {/* Enhanced Register Button */}
                <button type="submit" disabled={loading || !acceptTerms} className="relative w-full group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600 rounded-xl transition-all duration-300 group-hover:from-red-500 group-hover:via-red-400 group-hover:to-red-500 group-disabled:opacity-50"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-white/20 to-red-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    <div className="relative bg-gradient-to-r from-red-600 to-red-500 text-white py-4 px-6 rounded-xl font-semibold text-base transition-all duration-300 group-hover:shadow-lg group-hover:shadow-red-500/25 group-disabled:opacity-50 group-disabled:cursor-not-allowed">
                        {loading ? (
                            <div className="flex items-center justify-center space-x-3">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>Đang đăng ký...</span>
                            </div>
                        ) : (
                            <span>Đăng ký tài khoản</span>
                        )}
                    </div>
                </button>

                {/* Sign In Link */}
                <div className="text-center pt-6 border-t border-slate-700/50">
                    <p className="text-slate-400 text-sm">
                        Bạn đã có tài khoản?{" "}
                        <Link
                            to="/auth/sign-in"
                            className="text-white hover:text-red-400 font-semibold transition-colors duration-300 hover:underline underline-offset-2"
                        >
                            Đăng nhập ngay
                        </Link>
                    </p>
                </div>

                {/* reCAPTCHA Notice */}
                <div className="text-center">
                    <p className="text-xs text-slate-500 leading-relaxed">
                        Trang này được Google reCAPTCHA bảo vệ để đảm bảo bạn không phải là robot.{" "}
                        <a
                            href="#"
                            className="text-blue-400 hover:text-blue-300 transition-colors duration-300 underline underline-offset-2"
                        >
                            Tìm hiểu thêm
                        </a>
                    </p>
                </div>
            </form>
        </LayoutAuthentication>
    )
}

export default SignUpPage
