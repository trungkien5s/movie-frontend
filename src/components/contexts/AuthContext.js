import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import {useLocation} from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const apiURL = process.env.REACT_APP_API_URL;

    // Validate token với server
    const validateToken = async (token) => {
        try {
            const response = await axios.get(`${apiURL}/api/auth/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.status === 200 ? response.data : null;
        } catch (error) {
            console.error("Token validation failed:", error);
            return null;
        }
    };

    // Load và validate user session khi app khởi động
// ở trên component
    const location = useLocation();

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const storedToken = localStorage.getItem("access_token");

                if (!storedToken) {
                    clearAuthData();
                    setLoading(false);
                    return;
                }

                const userData = await validateToken(storedToken);

                if (userData) {
                    const userInfo = {
                        id: userData.id,
                        username: userData.username,
                        email: userData.email || "",
                        name: userData.full_name || userData.username,
                        is_superuser: userData.is_superuser || false,
                    };

                    setUser(userInfo);
                    setIsAuthenticated(true);
                    localStorage.setItem("user", JSON.stringify(userInfo));
                } else {
                    clearAuthData();
                }
            } catch (error) {
                console.error("Lỗi khi check auth status:", error);
                clearAuthData();
            } finally {
                setLoading(false);
            }
        };

        checkAuthStatus();
    }, [location.pathname]); //

    // Helper function để clear auth data
    const clearAuthData = () => {
        console.log("Clearing auth data...");
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
    };

    // Đăng nhập - FIX: Thêm is_superuser
    const login = (accessToken, userData) => {
        const userInfo = {
            id: userData.id,
            username: userData.username,
            email: userData.email || "",
            name: userData.full_name || userData.username,
            is_superuser: userData.is_superuser || false, // FIX: Thêm field này
        };

        setUser(userInfo);
        setIsAuthenticated(true);

        // Lưu cả token và user info
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("user", JSON.stringify(userInfo));

        console.log("Đăng nhập thành công:", userInfo);
    };

    // Đăng xuất với API call
    const logout = async () => {
        try {
            const token = localStorage.getItem("access_token");

            if (token) {
                await axios.post(`${apiURL}/api/auth/logout`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }
        } catch (error) {
            console.error("Logout API error:", error);
        } finally {
            clearAuthData();
            console.log("Đăng xuất thành công");
            console.log("After clearAuthData, localStorage:", localStorage.getItem("access_token"), localStorage.getItem("user"));

            console.log("After clearAuthData, localStorage:", localStorage.getItem("access_token"), localStorage.getItem("user"));
            window.location.href = "/auth/sign-in"; // Chuyển hướng về trang đăng nhập
        }
    };

    // Setup axios interceptor với xử lý cẩn thận hơn
    useEffect(() => {
        const requestInterceptor = axios.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem("access_token");
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                // FIX: Chỉ logout khi chắc chắn là token expired
                if (error.response?.status === 401) {
                    const errorData = error.response.data;

                    // Chỉ logout nếu error message liên quan đến token
                    if (errorData?.detail?.includes('token') ||
                        errorData?.detail?.includes('expired') ||
                        errorData?.detail?.includes('invalid') ||
                        errorData?.message?.includes('token')) {

                        console.log("Token expired/invalid - logging out:", errorData);
                        clearAuthData();

                        // Chỉ redirect nếu không phải trang login
                        if (!window.location.pathname.includes('/auth/')) {
                            window.location.href = "/auth/sign-in";
                        }
                    } else {
                        console.log("401 error but not token related:", errorData);
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, []);

    const refreshUser = async () => {
        try {
            const token = localStorage.getItem("access_token");
            if (!token) return;

            const userData = await validateToken(token);
            if (userData) {
                const userInfo = {
                    id: userData.id,
                    username: userData.username,
                    email: userData.email || "",
                    name: userData.full_name || userData.username,
                    is_superuser: userData.is_superuser || false,
                };

                setUser(userInfo);
                localStorage.setItem("user", JSON.stringify(userInfo));
                console.log("User data refreshed:", userInfo);
            }
        } catch (error) {
            console.error("Failed to refresh user:", error);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            loading,
            login,
            logout,
            validateToken,
            refreshUser, // FIX: Thêm function này
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth phải được dùng bên trong AuthProvider");
    }
    return context;
}