import { useState, useEffect } from "react";
import Background from "./components/Background";
import Navbar from "./components/Navbar";
import Slideshow from "./components/Slideshow";
import Gallery from "./components/Gallery";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const [currentView, setCurrentView] = useState("home");
  const [imageCache, setImageCache] = useState(null);
  const [viewHistory, setViewHistory] = useState([]);

  // Push a fake history entry on load
  useEffect(() => {
    window.history.pushState({ view: "home" }, "");
  }, []);

  // Intercept browser back button
  useEffect(() => {
    function handlePopState() {
      window.history.pushState({ view: currentView }, "");
      if (viewHistory.length > 0) {
        const prev = viewHistory[viewHistory.length - 1];
        setViewHistory((h) => h.slice(0, -1));
        setCurrentView(prev.view);
      }
    }
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [viewHistory, currentView]);

  function navigateTo(view) {
    setViewHistory((h) => [...h, { view: currentView }]);
    setCurrentView(view);
    window.history.pushState({ view }, "");
  }

  return (
    <div className="app">
      <Background view={currentView} />
      <Navbar currentView={currentView} onNavigate={navigateTo} />
      <main className="main-content">
        {currentView === "home" && (
          <div className="home page-transition">
            <div className="slideshow-wrapper">
              <Slideshow />
            </div>
            <div className="home-bottom">
              <div className="home-intro">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div className="home-cta">
                <button
                  className="cta-btn"
                  onClick={() => navigateTo("gallery")}
                >
                  View Gallery
                </button>
              </div>
            </div>
          </div>
        )}
        {currentView === "gallery" && (
          <div className="page-transition">
            <Gallery imageCache={imageCache} setImageCache={setImageCache} />
          </div>
        )}
        {currentView === "about" && <About />}
        {currentView === "contact" && <Contact />}
      </main>
      <Footer />
    </div>
  );
}

export default App;