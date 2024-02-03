import React, { useContext, useEffect, useState } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "components/Sidebar";
import Header from "components/Header";

import DaftarAduan from "pages/DaftarAduan";
import AdminList from "pages/Admin";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import PenggunaList from "pages/Pengguna";
import DetailDaftarAduan from "pages/DetailDaftarAduan";
import NotFound from "pages/NotFound";
import DetailAdmin from "pages/DetailAdmin";
import DetailPengguna from "pages/DetailPengguna";
import Login from "pages/Login";
import NotFoundUser from "pages/NotFoundUser";
import { ContainerContext } from "context/ContainerContext";
import Profile from "pages/Profile";
import Notifikasi from "pages/Notifikasi";
import Loader from "components/Loader";

function App() {
  const { isSubMenu, profile, loading } = useContext(ContainerContext);

  const token = localStorage.getItem("BEARER_TOKEN");

  const [currentPage, setCurrentPage] = useState(
    `/${window.location.pathname.split("/")[1]}`
  );

  useEffect(() => {
    getCurrentPage({ key: `/${window.location.pathname.split("/")[1]}` });
  }, [currentPage]);

  const getCurrentPage = (value) => {
    switch (value.key) {
      case "/pengguna":
        setCurrentPage("/pengguna");
        break;
      case "/notifikasi":
        setCurrentPage("/notifikasi");
        break;
      case "/admin":
        setCurrentPage("/admin");
        break;
      case "/login":
        setCurrentPage("/login");
        break;
      default:
        setCurrentPage("/aduan");
        break;
    }
  };

  if (currentPage !== "/login" && !token) {
    return <NotFoundUser />;
  }

  return (
    <div>
      <Router>
        {token ? (
          <div className={`flex relative ${isSubMenu ? "h-full" : "h-screen"}`}>
            <Sidebar
              onChangePage={(menu) => {
                setCurrentPage(menu.path);
              }}
              currentPage={currentPage}
            />

            <div className="flex flex-col w-full bg-[rgb(248,250,252)] h-full">
              <Header />

              <Routes>
                <Route path="/aduan" element={<DaftarAduan />} />
                <Route path="/aduan/:aduanId" element={<DetailDaftarAduan />} />
                <Route path="/notifikasi" element={<Notifikasi />} />
                {profile?.role?.id === 2 ? (
                  <Route path="/admin" element={<AdminList />} />
                ) : null}
                <Route
                  path="/admin/:adminId/:adminName"
                  element={<DetailAdmin />}
                />
                <Route path="/admin/tambah" element={<DetailAdmin newUser />} />
                <Route path="/pengguna" element={<PenggunaList />} />
                <Route
                  path="/pengguna/:penggunaId/:penggunaName"
                  element={<DetailPengguna />}
                />
                <Route path="/profile" element={<Profile />} />
                <Route path="/" element={<Navigate replace to="/aduan" />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        )}
      </Router>

      {loading && <Loader />}

      <ToastContainer theme="colored" position="bottom-right" />
    </div>
  );
}

export default App;
