import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Label from "../../components/label/Label";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import FormGroup from "../../components/common/FormGroup";
import axios from "axios";
import useToggleValue from "../../components/hooks/useToggleValue";
import IconEyeToggle from "../../components/icons/IconEyeToggle";
import LayoutAuthentication from "../../components/layoutauthen/LayoutAuthentication";

const schema = yup.object({
    firstname: yup.string().required("Họ là bắt buộc"),
    lastname: yup.string().required("Tên là bắt buộc"),
    email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
    phone_number: yup.string().required("Số điện thoại là bắt buộc"),
    address: yup.string().required("Địa chỉ là bắt buộc"),
    date_of_birth: yup.string().required("Ngày sinh là bắt buộc"),
    gender: yup.string().required("Giới tính là bắt buộc"),
    password: yup.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự").required("Mật khẩu là bắt buộc"),
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
                first_name: values.firstname,
                last_name: values.lastname,
                email: values.email,
                phone_number: values.phone_number,
                address: values.address,
                date_of_birth: values.date_of_birth,
                gender: values.gender,
                password: values.password,
                role: false, // Giá trị mặc định cho role
            };

            console.log("Payload gửi lên server:", payload);

            const response = await axios.post(`${apiURL}/signup`, payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                const serverMessage = response.data.message || "Đăng ký thành công!";
                navigate("/auth/sign-in", { state: { message: serverMessage } });
            } else {
                setErrorMessage("Không thể đăng ký. Vui lòng thử lại.");
            }
        } catch (error) {
            console.error("Error:", error);

            if (error.response) {
                console.error("Chi tiết lỗi từ server:", error.response.data);
                const serverError = error.response.data.detail || error.response.data.message;
                setErrorMessage(serverError || "Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại.");
            } else {
                setErrorMessage("Không thể kết nối tới server. Vui lòng kiểm tra kết nối mạng và thử lại.");
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
                    <div className="bg-orange-600 text-white px-4 py-3 rounded text-sm">
                        {errorMessage}
                    </div>
                )}

                {/* First Name Input */}
                <FormGroup>
                    <div className="relative">
                        <Input
                            control={control}
                            name="firstname"
                            type="text"
                            className="w-full bg-gray-700 text-white px-4 py-4 rounded border-0 focus:bg-gray-600 focus:outline-none placeholder-gray-400"
                            placeholder="Họ"
                            error={errors.firstname?.message}
                        />
                    </div>
                    {errors.firstname && (
                        <p className="text-orange-500 text-sm mt-1">{errors.firstname.message}</p>
                    )}
                </FormGroup>

                {/* Last Name Input */}
                <FormGroup>
                    <div className="relative">
                        <Input
                            control={control}
                            name="lastname"
                            type="text"
                            className="w-full bg-gray-700 text-white px-4 py-4 rounded border-0 focus:bg-gray-600 focus:outline-none placeholder-gray-400"
                            placeholder="Tên"
                            error={errors.lastname?.message}
                        />
                    </div>
                    {errors.lastname && (
                        <p className="text-orange-500 text-sm mt-1">{errors.lastname.message}</p>
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
                        <p className="text-orange-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                </FormGroup>

                {/* Phone Number Input */}
                <FormGroup>
                    <div className="relative">
                        <Input
                            control={control}
                            name="phone_number"
                            type="text"
                            className="w-full bg-gray-700 text-white px-4 py-4 rounded border-0 focus:bg-gray-600 focus:outline-none placeholder-gray-400"
                            placeholder="Số điện thoại"
                            error={errors.phone_number?.message}
                        />
                    </div>
                    {errors.phone_number && (
                        <p className="text-orange-500 text-sm mt-1">{errors.phone_number.message}</p>
                    )}
                </FormGroup>

                {/* Address Input */}
                {/*<FormGroup>*/}
                {/*    <div className="relative">*/}
                {/*        <Input*/}
                {/*            control={control}*/}
                {/*            name="address"*/}
                {/*            type="text"*/}
                {/*            className="w-full bg-gray-700 text-white px-4 py-4 rounded border-0 focus:bg-gray-600 focus:outline-none placeholder-gray-400"*/}
                {/*            placeholder="Địa chỉ"*/}
                {/*            error={errors.address?.message}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*    {errors.address && (*/}
                {/*        <p className="text-orange-500 text-sm mt-1">{errors.address.message}</p>*/}
                {/*    )}*/}
                {/*</FormGroup>*/}

                {/*/!* Date of Birth Input *!/*/}
                {/*<FormGroup>*/}
                {/*    <div className="relative">*/}
                {/*        <Input*/}
                {/*            control={control}*/}
                {/*            name="date_of_birth"*/}
                {/*            type="date"*/}
                {/*            className="w-full bg-gray-700 text-white px-4 py-4 rounded border-0 focus:bg-gray-600 focus:outline-none placeholder-gray-400"*/}
                {/*            error={errors.date_of_birth?.message}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*    {errors.date_of_birth && (*/}
                {/*        <p className="text-orange-500 text-sm mt-1">{errors.date_of_birth.message}</p>*/}
                {/*    )}*/}
                {/*</FormGroup>*/}

                {/* Gender Select */}
                {/*<FormGroup>*/}
                {/*    <div className="relative">*/}
                {/*        <select*/}
                {/*            {...control.register("gender")}*/}
                {/*            className="w-full bg-gray-700 text-white px-4 py-4 rounded border-0 focus:bg-gray-600 focus:outline-none"*/}
                {/*        >*/}
                {/*            <option value="">Chọn giới tính</option>*/}
                {/*            <option value="Male">Nam</option>*/}
                {/*            <option value="Female">Nữ</option>*/}
                {/*            <option value="Other">Khác</option>*/}
                {/*        </select>*/}
                {/*    </div>*/}
                {/*    {errors.gender && (*/}
                {/*        <p className="text-orange-500 text-sm mt-1">{errors.gender.message}</p>*/}
                {/*    )}*/}
                {/*</FormGroup>*/}

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
                        <p className="text-orange-500 text-sm mt-1">{errors.confirmpassword.message}</p>
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