import { useState } from "react";
import Navbar from "./components/Navbar";
import Slideshow from "./components/Slideshow";
import Footer from "./components/Footer";

function App() {
  const [currentView, setCurrentView] = useState("home");

  return (
    <div className="app">
      <Navbar currentView={currentView} onNavigate={setCurrentView} />
      <main className="main-content">
        {currentView === "home" && (
          <div className="home">
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
        {currentView === "about" && <p>About page coming soon</p>}
        {currentView === "contact" && <p>Contact page coming soon</p>}
      </main>
      <Footer />
    </div>
  );
}

export default App;
