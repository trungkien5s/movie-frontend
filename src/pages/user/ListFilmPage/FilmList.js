import React, { useEffect, useState } from 'react';
import Header from '../../layout/userLayout/Header';
import Footer from '../../layout/userLayout/Footer';
import MovieCard from '../../../components/movie/MovieCard';
import Pagination from '../../../components/pagination/Pagination';
import axios from 'axios';

const FilmList = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const moviesPerPage = 24;

    const fetchMovies = async (page) => {
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/movies/?page=${page}&limit=${moviesPerPage}`
            );
            setMovies(res.data.data); // Đúng mảng phim nằm trong .data
            setTotalPages(res.data.pagination.total_pages); // Số trang tổng
        } catch (error) {
            console.error('Lỗi khi tải phim:', error);
        }
    };

    useEffect(() => {
        fetchMovies(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-gray-900">
            <Header />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Danh sách phim</h1>
                </div>

                {movies.length > 0 ? (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6 mb-8">
                            {movies.map((movie) => (
                                <MovieCard key={movie.movieId} movie={movie} viewMode="grid" />
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-lg mb-4">Không tìm thấy phim nào</div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default FilmList;
