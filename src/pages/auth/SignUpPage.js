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
    fullname: yup.string().required("Họ là bắt buộc"),
    username: yup.string().required("Tên là bắt buộc"),
    email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
    password: yup
        .string()
        .required("Mật khẩu là bắt buộc")
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
        .matches(/[A-Z]/, "Mật khẩu phải có ít nhất 1 chữ cái viết hoa")
        .matches(/[a-z]/, "Mật khẩu phải có ít nhất 1 chữ cái thường")
        .matches(/[0-9]/, "Mật khẩu phải có ít nhất 1 số")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Mật khẩu phải có ít nhất 1 ký tự đặc biệt"),
    confirmpassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Mật khẩu xác nhận không khớp')
        .required("Xác nhận mật khẩu là bắt buộc"),
});

const SignUpPage = () => {
    const [loading, setLoading] = useState(false);
    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: "onSubmit",
    });

    const { value: showPassword, handleToggleValue: handleTogglePassword } = useToggleValue();
    const { value: showConfirmPassword, handleToggleValue: handleToggleConfirmPassword } = useToggleValue();
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState("");

    const apiURL = process.env.REACT_APP_API_URL;

    const handleSignUp = async (values) => {
        setLoading(true);
        setErrorMessage("");

        try {
            const payload = {
                full_name: values.fullname,
                username: values.username,
                email: values.email,
                password: values.password,
                role: false, // Mặc định là người dùng thường
            };

            console.log("Payload gửi lên server:", payload);

            const response = await axios.post(`${apiURL}/api/auth/register`, payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 201) {
                const serverMessage = response.data.message || "Đăng ký thành công!";
                alert(serverMessage)
                navigate("/auth/sign-in", { state: { message: serverMessage } });
            } else {
                setErrorMessage("Không thể đăng ký. Vui lòng thử lại.");
            }
        } catch (error) {
            console.error("Error:", error);

            if (error.response) {
                let errorMsg = "Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại.";

                // Xử lý error response từ server
                const errorData = error.response.data;

                if (typeof errorData === 'string') {
                    errorMsg = errorData;
                } else if (errorData?.message && typeof errorData.message === 'string') {
                    errorMsg = errorData.message;
                } else if (errorData?.detail) {
                    // Xử lý trường hợp detail là object hoặc array
                    if (typeof errorData.detail === 'string') {
                        errorMsg = errorData.detail;
                    } else if (Array.isArray(errorData.detail)) {
                        // Nếu detail là array các lỗi validation
                        errorMsg = errorData.detail.map(err => {
                            if (typeof err === 'string') return err;
                            if (err.msg) return err.msg;
                            return JSON.stringify(err);
                        }).join(', ');
                    } else if (typeof errorData.detail === 'object') {
                        // Nếu detail là object
                        errorMsg = errorData.detail.msg || JSON.stringify(errorData.detail);
                    }
                }

                setErrorMessage(errorMsg);
            } else if (error.request) {
                setErrorMessage("Không thể kết nối tới server. Vui lòng kiểm tra kết nối mạng và thử lại.");
            } else {
                setErrorMessage("Đã xảy ra lỗi không xác định. Vui lòng thử lại.");
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <LayoutAuthentication title="Đăng ký">
            <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
                {/* Error Message */}
                {errorMessage && (
                    <div className="bg-red-600 text-white px-4 py-3 rounded text-sm">
                        {errorMessage}
                    </div>
                )}

                <FormGroup>
                    <div className="relative">
                        <Input
                            control={control}
                            name="username"
                            type="text"
                            className="w-full bg-gray-700 text-white px-4 py-4 rounded border-0 focus:bg-gray-600 focus:outline-none placeholder-gray-400"
                            placeholder="Tên đăng nhập"
                            error={errors.username?.message}
                        />
                    </div>
                    {errors.username && (
                        <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
                    )}
                </FormGroup>

                <FormGroup>
                    <div className="relative">
                        <Input
                            control={control}
                            name="fullname"
                            type="text"
                            className="w-full bg-gray-700 text-white px-4 py-4 rounded border-0 focus:bg-gray-600 focus:outline-none placeholder-gray-400"
                            placeholder="Họ tên"
                            error={errors.fullname?.message}
                        />
                    </div>
                    {errors.fullname && (
                        <p className="text-red-500 text-sm mt-1">{errors.fullname.message}</p>
                    )}
                </FormGroup>


                {/* Email Input */}
                <FormGroup>
                    <div className="relative">
                        <Input
                            control={control}
                            name="email"
                            type="email"
                            className="w-full bg-gray-700 text-white px-4 py-4 rounded border-0 focus:bg-gray-600 focus:outline-none placeholder-gray-400"
                            placeholder="Email"
                            error={errors.email?.message}
                        />
                    </div>
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
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

                {/* Confirm Password Input */}
                <FormGroup>
                    <div className="relative">
                        <Input
                            control={control}
                            name="confirmpassword"
                            type={showConfirmPassword ? "text" : "password"}
                            className="w-full bg-gray-700 text-white px-4 py-4 rounded border-0 focus:bg-gray-600 focus:outline-none placeholder-gray-400 pr-12"
                            placeholder="Xác nhận mật khẩu"
                            error={errors.confirmpassword?.message}
                        />
                        <button
                            type="button"
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                            onClick={handleToggleConfirmPassword}
                        >
                            <IconEyeToggle open={showConfirmPassword} />
                        </button>
                    </div>
                    {errors.confirmpassword && (
                        <p className="text-red-500 text-sm mt-1">{errors.confirmpassword.message}</p>
                    )}
                </FormGroup>

                {/* Register Button */}
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
                            Đang đăng ký...
                        </div>
                    ) : (
                        "Đăng ký"
                    )}
                </Button>

                {/* Sign In Link */}
                <div className="mt-8 text-gray-400">
                    <span className="text-sm">Bạn đã có tài khoản? </span>
                    <Link
                        to="/auth/sign-in"
                        className="text-white hover:underline text-sm font-medium"
                    >
                        Đăng nhập ngay.
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

export default SignUpPage;