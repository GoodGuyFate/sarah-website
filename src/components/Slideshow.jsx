import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const slides = [
  { id: 1, src: "/images/slideshow/1.jpeg", alt: "Artwork 1" },
  { id: 2, src: "/images/slideshow/2.jpeg", alt: "Artwork 2" },
  { id: 3, src: "/images/slideshow/3.jpeg", alt: "Artwork 3" },
  { id: 4, src: "/images/slideshow/4.jpeg", alt: "Artwork 4" },
];

function Slideshow() {
  const swiperRef = useRef(null);

  return (
    <div className="slideshow">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade, Keyboard]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        navigation
        keyboard={{ enabled: true, onlyInViewport: false }}
        pagination={{ clickable: true }}
        loop
        speed={800}
        style={{ width: "100%", height: "100%" }}
        touchStartPreventDefault={false}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <img
              src={slide.src}
              alt={slide.alt}
              className="slideshow-img"
              fetchPriority={index === 0 ? "high" : undefined}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Slideshow;