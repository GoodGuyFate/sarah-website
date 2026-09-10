import { useState } from "react";
import Navbar from "./components/Navbar";

function App() {
  const [currentView, setCurrentView] = useState("home");

  return (
    <div className="app">
      <Navbar currentView={currentView} onNavigate={setCurrentView} />
      <main className="main-content">
        <p>Current view: {currentView}</p>
      </main>
    </div>
  );
}

export default App;