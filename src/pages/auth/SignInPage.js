import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import FormGroup from "../../components/common/FormGroup";
import axios from "axios";
import useToggleValue from "../../components/hooks/useToggleValue";
import IconEyeToggle from "../../components/icons/IconEyeToggle";
import LayoutAuthentication from "../../components/layoutauthen/LayoutAuthentication";

const schema = yup.object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
});

const SignInPage = () => {
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: "onSubmit",
    });

    const { value: showPassword, handleToggleValue: handleTogglePassword } = useToggleValue();
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState("");

    const apiURL = process.env.REACT_APP_API_URL;

    const handleSignIn = async (values) => {
        setLoading(true);
        setErrorMessage("");

        try {
            const payload = new URLSearchParams();
            payload.append("username", values.username);
            payload.append("password", values.password);

            const response = await axios.post(`${apiURL}/login`, payload, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            if (response.status === 200) {
                const userData = response.data;

                if (!userData.access_token) {
                    throw new Error("Access token không tồn tại trong phản hồi từ server.");
                }

                console.log(response);
                localStorage.setItem("access_token", userData.access_token);
                localStorage.setItem("user", JSON.stringify(userData));

                navigate("/");
            } else {
                setErrorMessage("Thông tin đăng nhập không chính xác.");
            }
        } catch (error) {
            console.error("Error:", error);

            if (error.response) {
                console.error("Chi tiết lỗi từ server:", error.response.data);
                const serverError = error.response.data.detail || error.response.data.message;
                setErrorMessage(serverError || "Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại.");
            } else if (error.message === "Access token không tồn tại trong phản hồi từ server.") {
                setErrorMessage("Không nhận được token từ server. Vui lòng liên hệ quản trị viên.");
            } else if (error.message === "Bạn không có quyền truy cập vào trang này.") {
                setErrorMessage("Bạn không có quyền truy cập. Vui lòng đăng nhập với tài khoản admin.");
            } else {
                setErrorMessage("Không thể kết nối tới server. Vui lòng kiểm tra kết nối mạng và thử lại.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <LayoutAuthentication title="Đăng nhập">
            <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
                {/* Error Message */}
                {errorMessage && (
                    <div className="bg-orange-600 text-white px-4 py-3 rounded text-sm">
                        {errorMessage}
                    </div>
                )}

                {/* Email Input */}
                <FormGroup>
                    <div className="relative">
                        <Input
                            control={control}
                            name="username"
                            type="email"
                            className="w-full bg-gray-700 text-white px-4 py-4 rounded border-0 focus:bg-gray-600 focus:outline-none placeholder-gray-400"
                            placeholder="Email hoặc số điện thoại di động"
                            error={errors.username?.message}
                        />
                    </div>
                    {errors.username && (
                        <p className="text-orange-500 text-sm mt-1">{errors.username.message}</p>
                    )}
                </FormGroup>

                {/* Password Input */}
                <FormGroup>
                    <div className="relative">
                        <Input
                            control={control}
                            name="password"
                            type={showPassword ? "text" : "password"}
                            className="w-full bg-gray-700 text-white px-4 py-4 rounded border-0 focus:bg-gray-600 focus:outline-none placeholder-gray-400 pr-12"
                            placeholder="Mật khẩu"
                            error={errors.password?.message}
                        />
                        <button
                            type="button"
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                            onClick={handleTogglePassword}
                        >
                            <IconEyeToggle open={showPassword} />
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-orange-500 text-sm mt-1">{errors.password.message}</p>
                    )}
                </FormGroup>

                {/* Login Button */}
                <Button
                    className={`w-full bg-red-600 hover:bg-red-700 text-white py-4 px-4 rounded font-medium transition-colors duration-200 ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    type="submit"
                    disabled={loading}
                >
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                            Đang đăng nhập...
                        </div>
                    ) : (
                        "Đăng nhập"
                    )}
                </Button>

                {/* Forgot Password */}
                <div className="text-center mt-4">
                    <Link
                        to="/auth/reset"
                        className="text-gray-300 hover:text-white text-sm hover:underline"
                    >
                        Bạn quên mật khẩu?
                    </Link>
                </div>

                {/* Remember Me */}
                <div className="flex items-center mt-6">
                    <input
                        type="checkbox"
                        id="remember"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="mr-2 w-4 h-4 text-white bg-gray-600 border-gray-600 rounded focus:ring-0"
                    />
                    <label htmlFor="remember" className="text-gray-300 text-sm">
                        Ghi nhớ tôi
                    </label>
                </div>

                {/* Sign Up Link */}
                <div className="mt-8 text-gray-400">
                    <span className="text-sm">Bạn chưa có tài khoản? </span>
                    <Link
                        to="/auth/sign-up"
                        className="text-white hover:underline text-sm font-medium"
                    >
                        Đăng ký ngay.
                    </Link>
                </div>

                {/* reCAPTCHA Notice */}
                <div className="mt-4 text-xs text-gray-400">
                    Trang này được Google reCAPTCHA bảo vệ để đảm bảo bạn không phải là robot.{" "}
                    <a href="#" className="text-blue-500 hover:underline">
                        Tìm hiểu thêm.
                    </a>
                </div>
            </form>
        </LayoutAuthentication>
    );
};

export default SignInPage;