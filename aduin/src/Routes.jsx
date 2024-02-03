import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "pages/NotFound";
import VerifikasiEmail from "pages/VerifikasiEmail";
import VerifyEmail from "pages/VerifyEmail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LupaKatasandi from "pages/LupaKatasandi";
import ResetPassword from "pages/ResetPassword";
import WaitingPage from "components/Loading";
import PanduanPage from "pages/Panduan";
import TentangKamiPage from "pages/TentangKami";

const Daftar = React.lazy(() => import("pages/Daftar"));
const Profile = React.lazy(() => import("pages/Profile"));
const Detail = React.lazy(() => import("pages/Detail"));
const Home = React.lazy(() => import("pages/Home"));
const Masuk = React.lazy(() => import("pages/Masuk"));
const Ubahsandi = React.lazy(() => import("pages/Ubahsandi"));
const Ubahprofile = React.lazy(() => import("pages/Ubahprofile"));

const ProjectRoutes = () => {
  const token = localStorage.getItem("BEARER_TOKEN");

  return (
    <React.Suspense fallback={<WaitingPage />}>
      <Router>
        {token ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/profile/edit" element={<Ubahprofile />} />
            <Route path="/home" element={<Home />} />
            <Route path="/detail/:detailId" element={<Detail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/panduan" element={<PanduanPage />} />
            <Route path="/tentang-kami" element={<TentangKamiPage />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/ubahsandi" element={<Ubahsandi />} />
            <Route path="/lupa-katasandi" element={<LupaKatasandi />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/masuk" element={<Masuk />} />
            <Route path="/home" element={<Home />} />
            <Route path="/daftar" element={<Daftar />} />
            <Route
              path="/verifikasi-email-terkirim"
              element={<VerifikasiEmail />}
            />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/panduan" element={<PanduanPage />} />
            <Route path="/tentang-kami" element={<TentangKamiPage />} />
          </Routes>
        )}
      </Router>

      <ToastContainer />
    </React.Suspense>
  );
};
export default ProjectRoutes;
