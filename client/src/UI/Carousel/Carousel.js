import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Keyboard, Mousewheel, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/keyboard";
import "swiper/css/mousewheel";
import "swiper/css/navigation";

function Carousel({ components }) {
  return (
    <Swiper
      modules={[FreeMode, Keyboard, Mousewheel, Navigation]}
      spaceBetween={10}
      keyboard={true}
      navigation={true}
      mousewheel={true}
      slidesPerGroup={5}
      slidesPerView={6}
      freeMode={true}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      className="carousel"
    >
      {components.map((item, index) => {
        return <SwiperSlide key={index}>{item}</SwiperSlide>;
      })}
    </Swiper>
  );
}

export default Carousel;
