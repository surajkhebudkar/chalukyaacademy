import { useState, useEffect } from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Loader from "./components/Loader/Loader";
import "./App.css";
import "./index.css";
import ScrollTop from "./components/scrolltop/ScrollTop";
import Home from "./pages/Home";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        await fetchData();
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
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
              <Home />
          </main>

          <Footer />
          <ScrollTop />
        </div>
      )}
    </>
  );
}

export default App;