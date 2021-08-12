import styles from "./index.module.scss";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectFade, Autoplay } from "swiper";
import AnimateHead from "../../../components/animate/AnimateHead";
import SwiperHead from "../../../components/swiper/SwiperHead";

SwiperCore.use([EffectFade, Autoplay]);

export default function Banner() {
  const radio = 1920 / 645;
  const banner = useRef(null);
  const [bannerHeight, setBannerHeight] = useState("645");
  const [winWid, setWinWid] = useState(0);
  const bannerSlidePerSliceWidth = useMemo(() => winWid / 10, [winWid]);
  const bannerList = ["1.png", "2.png", "3.jpeg", "4.png", "5.png", "6.png"];
  function updateBannerHeight() {
    const wid = window.innerWidth;
    setWinWid(wid);
    setBannerHeight((wid / radio).toFixed(4));
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
      <SwiperHead />
      <AnimateHead />
      <Swiper autoplay={{ delay: 5000 }} effect="fade" speed={2000}>
        {bannerList.map((name, index) => (
          <SwiperSlide key={name} className={styles.bannerSlide}>
            {({ isActive }) => (
              <>
                <Image src={`/banner/${name}`} width={1920} height={645} />
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundImage: `url(/banner/${
                        bannerList[
                          index + 1 === bannerList.length ? 0 : index + 1
                        ]
                      })`,
                      height: `${bannerHeight}px`,
                      backgroundPositionX: `-${
                        bannerSlidePerSliceWidth * idx
                      }px`,
                      left: `${bannerSlidePerSliceWidth * idx}px`,
                      backgroundSize: `${winWid}px ${bannerHeight}px`,
                      width: `${bannerSlidePerSliceWidth}px`,
                      // zIndex: isActive ? 90 : 60,
                      animationDelay: `${idx * 100}ms`,
                    }}
                    className={`${
                      styles.bannerSlidePerSlice
                    } animate__animated ${
                      isActive ? "animate__slideInDown" : ""
                    }`}
                  />
                ))}
              </>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
