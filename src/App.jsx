import { useState } from "react";
import Navbar from "./components/Navbar";
import Slideshow from "./components/Slideshow";
import Gallery from "./components/Gallery";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";


function App() {
  const [currentView, setCurrentView] = useState("home");
  const [imageCache, setImageCache] = useState(null);

  return (
    <div className="app">
      <Navbar currentView={currentView} onNavigate={setCurrentView} />
      <main className="main-content">
        {currentView === "home" && (
          <div className="home page-transition">
            <Slideshow />
            <div className="home-intro">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="home-cta">
              <button
                className="cta-btn"
                onClick={() => setCurrentView("gallery")}
              >
                View Gallery
              </button>
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
