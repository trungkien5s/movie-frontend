import React from 'react';
import Header from "../../components/layout/Header";
import HeroSection from "../../components/layout/HeroSection";
import MovieList from "../../components/movie/MovieList";
import Footer from "../../components/layout/Footer";

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gray-900">
            <Header />
            <HeroSection />
            <MovieList />
            <Footer/>
        </div>
    );
};

export default HomePage;