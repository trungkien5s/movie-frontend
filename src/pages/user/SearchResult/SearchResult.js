import React, { useEffect, useState } from 'react';
import Header from "../../layout/userLayout/Header";
import Footer from "../../layout/userLayout/Footer";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import MovieCard from "../../../components/movie/MovieCard";

const SearchResult = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://movie-streaming-api.onrender.com/api/movies/search/${location.search}`);
                setMovies(response.data.data);
            } catch (error) {
                console.error("Lỗi khi fetch:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [location.search]);

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Header />

            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-4">Kết quả tìm kiếm</h2>

                {loading ? (
                    <div className="flex justify-center items-center py-16">
                        <svg className="animate-spin h-10 w-10 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 01-8 8z" />
                        </svg>
                    </div>
                ) : movies.length === 0 ? (
                    <p>Không tìm thấy phim nào.</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {movies.map((movie) => (
                            <MovieCard key={movie.movieId} movie={movie} />
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default SearchResult;
