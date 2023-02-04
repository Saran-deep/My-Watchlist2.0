import React, { useState, useEffect } from "react";
import PlaceholderImage from "./Placeholder.jpg";

function Image({ lowQualityImageURL, highQualityImageURL, className, alt }) {
  const [imageSrc, setImageSrc] = useState(
    lowQualityImageURL ? lowQualityImageURL : PlaceholderImage
  );
  const imgRef = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageSrc(
              highQualityImageURL ? highQualityImageURL : PlaceholderImage
            );
            observer.disconnect();
          }
        });
      },
      {
        root: null,
        rootMargin: "50px",
        threshold: 0.5,
      }
    );
    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [imgRef]);

  return <img className={className} ref={imgRef} src={imageSrc} alt={alt} />;
}

export default Image;
