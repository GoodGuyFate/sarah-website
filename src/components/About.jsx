function About() {
  return (
    <div className="about page-transition">
      <div className="about-inner">
        <div className="about-photo-wrap">
          <img
            src="https://picsum.photos/seed/sarah/380/500"
            alt="Sarah Malak"
            className="about-photo"
          />
        </div>
        <div className="about-text-wrap">
          <h2 className="page-title">About</h2>
          <p className="about-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p className="about-text">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
