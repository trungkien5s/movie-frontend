import {Suspense, useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage/HomePage";
import MoviePage from "./pages/MoviePage/MoviePage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/auth/sign-in" element={<SignInPage />} />
          <Route path="/phim-le" element={<MoviePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/sign-up" element={<SignUpPage />} />
        </Routes>
          </Suspense>

    </div>
  );
}

export default App;
