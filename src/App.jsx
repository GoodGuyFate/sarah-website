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
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Push a fake history entry on load
  useEffect(() => {
    window.history.pushState({ view: "home" }, "");
  }, []);

  // Intercept browser back button
  useEffect(() => {
    function handlePopState() {
      window.history.pushState({ view: currentView }, "");
      if (lightboxOpen) return; // let Gallery handle it
      if (viewHistory.length > 0) {
        const prev = viewHistory[viewHistory.length - 1];
        setViewHistory((h) => h.slice(0, -1));
        setCurrentView(prev.view);
      }
    }
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [viewHistory, currentView, lightboxOpen]);

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
            <div className="home-quote">
              <p>"All beauty points back to Him who is Beautiful"</p>
              <span>— St. Maximus the Confessor</span>
            </div>
            <div className="slideshow-wrapper">
              <Slideshow />
            </div>
            <div className="home-bottom">
              <div className="home-intro">
                <p>
                  Original abstract works exploring colour, texture, and the
                  quiet wonder of seeing something for the first time.
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
            <Gallery
              imageCache={imageCache}
              setImageCache={setImageCache}
              onLightboxChange={setLightboxOpen}
            />
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
