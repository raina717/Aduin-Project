import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "pages/NotFound";
import AdminPage from "pages/Admin";
const TambahAdmin = React.lazy(() => import("pages/TambahAdmin"));
const Admin = React.lazy(() => import("pages/Admin"));
const DetailDaftarAduan = React.lazy(() => import("pages/DetailDaftarAduan"));
const DaftarAduan = React.lazy(() => import("pages/DaftarAduan"));
const UbahPengguna = React.lazy(() => import("pages/UbahPengguna"));
const DetailPengguna = React.lazy(() => import("pages/DetailPengguna"));
const Pengguna = React.lazy(() => import("pages/Pengguna"));
const DetailAdmin = React.lazy(() => import("pages/DetailAdmin"));
const Login = React.lazy(() => import("pages/Login"));

const ProjectRoutes = () => {
  const token = localStorage.getItem("BEARER_TOKEN");

  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        {token ? (
          <Routes>
            <Route path="/" element={<AdminPage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/detailadmin" element={<DetailAdmin />} />
            <Route path="/pengguna" element={<Pengguna />} />
            <Route path="/detailpengguna" element={<DetailPengguna />} />
            <Route path="/ubahpengguna" element={<UbahPengguna />} />
            <Route path="/daftaraduan" element={<DaftarAduan />} />
            <Route path="/detaildaftaraduan" element={<DetailDaftarAduan />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/tambahadmin" element={<TambahAdmin />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        )}
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
