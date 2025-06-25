import React from 'react';
import Header from "../../layout/userLayout/Header";
import Footer from "../../layout/userLayout/Footer";

const SeriesPage = () => {
    return (
        <div className="min-h-screen bg-gray-900">
            <Header />
            <div className="container mx-auto px-4 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Phim bộ</h1>
                </div>

            </div>

            <Footer />
        </div>
    );
};

export default SeriesPage;