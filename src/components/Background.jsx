function Background({ view }) {
  const splashes = {
    home: (
      <svg
        className="bg-splash"
        viewBox="0 0 1440 900"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M-100,200 C100,50 300,400 500,300 C700,200 800,500 1000,400 C1200,300 1400,100 1600,250 L1600,600 C1400,500 1100,700 900,600 C700,500 500,700 300,650 C100,600 -50,500 -100,450 Z"
          fill="rgba(173, 216, 230, 0.3)"
        />
      </svg>
    ),
    gallery: (
      <svg
        className="bg-splash"
        viewBox="0 0 1440 900"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M1600,100 C1400,0 1100,200 900,150 C700,100 600,300 400,250 C200,200 50,350 -100,300 L-100,550 C100,600 300,450 500,500 C700,550 900,400 1100,450 C1300,500 1500,400 1600,450 Z"
          fill="rgba(173, 216, 230, 0.3)"
        />
      </svg>
    ),
    about: (
      <svg
        className="bg-splash"
        viewBox="0 0 1440 900"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M-100,400 C200,300 400,600 600,500 C800,400 900,200 1100,300 C1300,400 1500,250 1600,300 L1600,700 C1300,650 1100,800 900,750 C700,700 500,850 300,800 C100,750 -50,650 -100,600 Z"
          fill="rgba(173, 216, 230, 0.3)"
        />
      </svg>
    ),
    contact: (
      <svg
        className="bg-splash"
        viewBox="0 0 1440 900"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M-100,50 C100,150 400,0 600,100 C800,200 900,50 1100,100 C1300,150 1500,50 1600,100 L1600,400 C1400,350 1200,450 1000,400 C800,350 600,500 400,450 C200,400 0,300 -100,350 Z"
          fill="rgba(173, 216, 230, 0.3)"
        />
      </svg>
    ),
  };

  return (
    <div className="bg-splash-wrap">{splashes[view] || splashes.home}</div>
  );
}

export default Background;
