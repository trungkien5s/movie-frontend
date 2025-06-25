// pages/HomePage/HomePage.js
import React from 'react';
import Header from "../../layout/userLayout/Header";
import HeroSection from "../../layout/userLayout/HeroSection";
import MovieList from "../../../components/movie/MovieList";
import Footer from "../../layout/userLayout/Footer";
// Không cần AuthProvider ở đây vì đã có ở App.js

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gray-900">
            <Header />
            <HeroSection />
            <MovieList />
            <Footer />
        </div>
    );
};

export default HomePage;