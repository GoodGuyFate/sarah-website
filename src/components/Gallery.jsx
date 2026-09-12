import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

function Lightbox({ images, startIndex, onClose }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return createPortal(
    <div className="lightbox">
      <div className="lightbox-backdrop" onClick={onClose} />
      <button className="lightbox-close" onClick={onClose}>
        ✕
      </button>
      <div className="lightbox-swiper">
        <Swiper
          modules={[Navigation, Keyboard]}
          navigation
          keyboard={{ enabled: true }}
          initialSlide={startIndex}
          speed={400}
          style={{ width: "100%", height: "100%" }}
        >
          {images.map((image) => (
            <SwiperSlide key={image.id}>
              <div className="lightbox-slide">
                <img src={image.url} alt={image.name} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>,
    document.body,
  );
}

function Gallery({ imageCache, setImageCache }) {
  const [loading, setLoading] = useState(!imageCache);
  const [error, setError] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    if (imageCache) return;
    fetch("/api/images")
      .then((r) => r.json())
      .then((data) => {
        setImageCache(data.files);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load gallery.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  if (loading) return <p className="gallery-status">Loading...</p>;
  if (error) return <p className="gallery-status">{error}</p>;

  return (
    <div className="gallery">
      <div className="gallery-grid">
        {imageCache.map((image, index) => (
          <div
            key={image.id}
            className="gallery-item"
            onClick={() => setLightboxIndex(index)}
          >
            <img src={image.thumbnail} alt={image.name} loading="lazy" />
          </div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={imageCache}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}

export default Gallery;
