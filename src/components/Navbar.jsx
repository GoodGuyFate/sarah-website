function Navbar({ currentView, onNavigate }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <a
          className="navbar-name"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("home");
          }}
        >
          Sarah Malak
        </a>

        <nav className="navbar-links">
          <a
            href="#"
            className={currentView === "about" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              onNavigate("about");
            }}
          >
            About
          </a>

          <a
            href="#"
            className={currentView === "contact" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              onNavigate("contact");
            }}
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;