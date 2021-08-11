import styles from "./index.module.scss";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectFade, Autoplay } from "swiper";

SwiperCore.use([EffectFade, Autoplay]);

export default function Banner() {
  const radio = 1920 / 645;
  const banner = useRef(null);
  const [bannerHeight, setBannerHeight] = useState(645);
  function updateBannerHeight() {
    setBannerHeight(Math.floor(window.innerWidth / radio));
  }
  useEffect(() => {
    window.addEventListener("resize", updateBannerHeight, false);
    updateBannerHeight();
    return () => {
      window.removeEventListener("resize", updateBannerHeight, false);
    };
  }, []);
  return (
    <div
      className={styles.bannerBox}
      ref={banner}
      style={{ height: `${bannerHeight}px` }}
    >
      <link
        href="https://unpkg.com/swiper@6.8.1/swiper-bundle.min.css"
        rel="stylesheet"
      />
      <Swiper autoplay effect="fade" speed={2000} height={bannerHeight}>
        {["1.png", "2.png", "3.jpeg", "4.png", "5.png", "6.png"].map((name) => (
          <SwiperSlide key={name}>
            <Image src={`/banner/${name}`} width={1920} height={645} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
