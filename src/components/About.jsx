function About() {
  return (
    <div className="about page-transition">
      <div className="about-inner">
        <div className="about-photo-wrap">
          <img
            src="/images/sarah.jpeg"
            alt="Sarah Malak"
            className="about-photo"
          />
        </div>
        <div className="about-text-wrap">
          <h2 className="page-title">About Sarah</h2>
          <p className="about-text">
            The themes in the artwork explore how material and colour can
            return our senses to stillness. Childlike wonder and inner stillness
            are the main theme in many of the works. My work aims to portray
            something many of us felt as children but may have not had the
            language of describing. Something that often goes beyond language...
            The hope is that through my artwork, the colours, materials,
            textures and shapes can quiet our senses and bring us to an inner
            stillness and sense of wonder.
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
