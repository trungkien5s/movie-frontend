import React, { useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import FormGroup from "../../components/common/FormGroup";
import useToggleValue from "../../components/hooks/useToggleValue";
import IconEyeToggle from "../../components/icons/IconEyeToggle";
import LayoutAuthentication from "../../components/layoutauthen/LayoutAuthentication";
import {useAuth} from "../../components/contexts/AuthContext";
import axios from "axios";
const schema = yup.object({
    email_or_username: yup.string().required("Tên đăng nhập là bắt buộc"),
    password: yup.string().required("Mật khẩu là bắt buộc"),
});


const SignInPage = () => {
    const [loading, setLoading] = useState(false);
    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: "onSubmit",
    });

    const { value: showPassword, handleToggleValue: handleTogglePassword } = useToggleValue();
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState(""); // State lưu thông báo lỗi

    const { login } = useAuth();

    const apiURL = process.env.REACT_APP_API_URL;

    const handleSignIn = async (values) => {
        setLoading(true);
        setErrorMessage("");

        // Debug: Log form values
        console.log("Form values:", values);
        console.log("API URL:", apiURL);

        try {
            const payload = {
                email_or_username: values.email_or_username,
                password: values.password,
            };

            console.log("JSON Payload being sent:", payload);

            const response = await axios.post(`${apiURL}/api/auth/login`, payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log("Response status:", response.status);
            console.log("Response data:", response.data);

            // Chấp nhận cả status 200 và 201
            if (response.status === 200 || response.status === 201) {
                const userData = response.data;

                // Kiểm tra access_token
                if (!userData.access_token) {
                    throw new Error("Access token không tồn tại trong phản hồi từ server.");
                }

                console.log("Login successful:", userData);

                await login(userData.access_token, userData.user);

                navigate("/");
            } else {
                console.log("Unexpected status:", response.status);
                setErrorMessage(`Lỗi đăng nhập: Status ${response.status}`);
            }
        } catch (error) {
            console.error("Login error:", error);
            console.error("Error response:", error.response?.data);
            console.error("Error status:", error.response?.status);

            if (error.response) {
                let errorMsg = "Thông tin đăng nhập không chính xác.";

                const errorData = error.response.data;
                console.log("Error data type:", typeof errorData);

                // Xử lý các loại error response khác nhau
                if (typeof errorData === 'string') {
                    errorMsg = errorData;
                } else if (errorData?.detail) {
                    if (typeof errorData.detail === 'string') {
                        errorMsg = errorData.detail;
                    } else if (Array.isArray(errorData.detail)) {
                        errorMsg = errorData.detail.map(err => {
                            if (typeof err === 'string') return err;
                            if (err.msg) return `${err.loc ? err.loc.join('.') : 'Field'}: ${err.msg}`;
                            return JSON.stringify(err);
                        }).join('\n');
                    } else {
                        errorMsg = JSON.stringify(errorData.detail);
                    }
                } else if (errorData?.message) {
                    errorMsg = errorData.message;
                }

                // Xử lý các status code cụ thể
                if (error.response.status === 401) {
                    errorMsg = "Thông tin đăng nhập không chính xác.";
                } else if (error.response.status === 422) {
                    errorMsg = "Dữ liệu không hợp lệ: " + errorMsg;
                } else if (error.response.status === 400) {
                    errorMsg = "Yêu cầu không hợp lệ: " + errorMsg;
                }

                setErrorMessage(errorMsg);
            } else if (error.message === "Access token không tồn tại trong phản hồi từ server.") {
                setErrorMessage("Không nhận được token từ server. Vui lòng liên hệ quản trị viên.");
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
                    <div className="bg-red-600 text-white px-4 py-3 rounded text-sm">
                        {errorMessage}
                    </div>
                )}

                {/* Username Input */}
                <FormGroup>
                    <Input
                        control={control}
                        name="email_or_username"
                        type="text"
                        className="w-full bg-gray-700 text-white px-4 py-4 rounded border-0 focus:bg-gray-600 focus:outline-none placeholder-gray-400"
                        placeholder="Email hoặc số điện thoại di động"
                        error={errors.username?.message}
                    />
                    {errors.username && (
                        <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
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
                        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                    )}
                </FormGroup>

                {/* Login Button */}
                <Button
                    className={`w-full bg-red-600 hover:bg-red-700 text-white py-4 px-4 rounded font-medium transition-colors duration-200 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
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
            </form>
        </LayoutAuthentication>
    );
};

export default SignInPage;
