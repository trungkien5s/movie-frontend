import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../../layout/userLayout/Header";
import Footer from "../../layout/userLayout/Footer";

const AllGenrePage = () => {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get('https://movie-streaming-api.onrender.com/api/genres/');
                setGenres(response.data);
            } catch (err) {
                setError('Lỗi khi tải thể loại');
            } finally {
                setLoading(false);
            }
        };

        fetchGenres();
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Header />

            <main className="flex-1 container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">Danh sách thể loại</h1>

                {loading && <p>Đang tải...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {!loading && !error && (
                    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {genres.map((genre) => (
                            <li
                                key={genre.id}
                                className="p-4 border rounded-lg shadow hover:bg-gray-100 transition"
                            >
                                {genre.name}
                            </li>
                        ))}
                    </ul>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default AllGenrePage;
