import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Keyboard } from "swiper/modules";
import "swiper/css";

const slides = [
  { id: 1, src: "https://picsum.photos/seed/art1/1600/900", alt: "Artwork 1" },
  { id: 2, src: "https://picsum.photos/seed/art2/1600/900", alt: "Artwork 2" },
  { id: 3, src: "https://picsum.photos/seed/art3/1600/900", alt: "Artwork 3" },
  { id: 4, src: "https://picsum.photos/seed/art4/1600/900", alt: "Artwork 4" },
];

function Slideshow() {
  return (
    <div className="slideshow">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, Keyboard]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        keyboard={{ enabled: true }}
        loop
        speed={1000}
        style={{ width: "100%", height: "100%" }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <img src={slide.src} alt={slide.alt} className="slideshow-img" fetchPriority={index === 0 ? "high" : undefined} loading={index === 0 ? "eager" : "lazy"}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Slideshow;
