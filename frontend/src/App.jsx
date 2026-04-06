import { useState, useEffect } from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Loader from "./components/Loader/Loader";
import "./App.css";
import "./index.css";
import ScrollTop from "./components/scrolltop/ScrollTop";
import Home from "./pages/Home";
import News from "./pages/News";
import Events from "./pages/Events";
import Sports from "./pages/Sports";
import PhotoGallery from "./pages/PhotoGallery";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import AdminDashboard from "./adminpages/AdminDashboard";
import CoachDashboard from "./adminpages/CoachDashboard";
import PrivateRoute from "./components/PrivateRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simple loader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Router>
          <div className="app-container">
            <Navbar />

            {/* Main Content */}
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/news" element={<News />} />
                <Route path="/events" element={<Events />} />
                <Route path="/sports" element={<Sports />} />
                  <Route path="/gallery" element={<PhotoGallery />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/adminpages/admin-dashboard"
                    element={
                      <PrivateRoute role="admin">
                        <AdminDashboard />
                      </PrivateRoute>
                    }
                  />

                  <Route
                    path="/adminpages/coach-dashboard"
                    element={
                      <PrivateRoute role="coach">
                        <CoachDashboard />
                      </PrivateRoute>
                    }
                  />
              </Routes>
            </main>

            <Footer />
            <ScrollTop />
          </div>
        </Router>
      )}
    </>
  );
}

export default App;