import {Suspense, useEffect, useState} from "react";
import {Route, Router, Routes} from "react-router-dom";
import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";
import DashboardPage from "./pages/admin/DashboardPage";
import HomePage from "./pages/user/HomePage/HomePage";
import MoviePage from "./pages/user/MoviePage/MoviePage";
import {AuthProvider} from "./components/contexts/AuthContext";
import SeriesPage from "./pages/user/MoviePage/SeriesPage";
import FilmList from "./pages/user/ListFilmPage/FilmList";
import MovieDetailPage from "./pages/user/MovieDetailPage/MovieDetailPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <AuthProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Route dành cho người dùng */}
          <Route path="/auth/sign-in" element={<SignInPage />} />
          <Route path="/phim-le" element={<MoviePage />} />
          <Route path="/movies/" element={<FilmList/>} />
          <Route path="/movies/:movie_id" element={<MovieDetailPage/>} />
          <Route path="/movies/genre/:genre_name" element={<MovieDetailPage/>} />
          <Route path="/phim-bo" element={<SeriesPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/sign-up" element={<SignUpPage />} />

          {/* Route dành cho quản trị viên */}
          <Route path="/admin/*" element={<DashboardPage />} />

        </Routes>
          </Suspense>

    </AuthProvider>
  );
}

export default App;
