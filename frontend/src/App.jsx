import { useState, useEffect } from "react";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/Footer";
import Loader from "./components/Loader/Loader";
import "./App.css";
import "./index.css";
import ScrollTop from "./components/scrolltop/ScrollTop";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        <div className="app-container">
          <Navbar />

          {/* Main Content */}
          <main className="main-content">
            <h1 style={{ padding: "100px 20px" }}>
              Your Page Content Here
            </h1>
          </main>

          <Footer />
          <ScrollTop />
        </div>
      )}
    </>
  );
}

export default App;