import styles from "./index.module.scss";
import { useEffect, useRef } from "react";

export default function Macbook() {
  const startOpen = useRef(0);
  const animate = useRef<{
    loadImages: any;
    ctx: any;
    canvas: any;
  }>({
    loadImages: {},
    ctx: null,
    canvas: null,
  });
  function drawImg(index: number) {
    if (animate.current.ctx && animate.current.loadImages[index]) {
      animate.current.ctx.drawImage(
        animate.current.loadImages[index],
        0,
        0,
        animate.current.canvas.width,
        animate.current.canvas.height
      );
    }
  }
  // 滚动事件
  const scrollEvent = () => {
    // 实时的 scrollTop
    // @ts-ignore
    const scrollTop = document.getElementsByTagName("html")[0].scrollTop;
    let newAsset = 0;

    if (scrollTop > startOpen.current && scrollTop < startOpen.current + 400) {
      let offset = Math.floor(((scrollTop - startOpen.current) / 400) * 121);

      if (offset < 1) {
        offset = 1;
      } else if (offset > 121) {
        offset = 121;
      }
      newAsset = offset;
    } else if (scrollTop >= startOpen.current + 400) {
      newAsset = 121;
    }
    // 设置图片 url
    drawImg(newAsset);
  };
  function loadImg(index: number) {
    const img = new Image();
    img.onload = function () {
      animate.current.loadImages[index] = img;
      if (!index) {
        drawImg(index);
      }
    };
    img.crossOrigin = "Anonymous";
    img.src = `/home/macbook/large_${index.toString().padStart(4, "0")}.jpg`;
  }

  useEffect(() => {
    for (let i = 0; i < 122; i++) {
      loadImg(i);
    }
  }, []);
  useEffect(() => {
    animate.current.canvas = document.querySelector("#canvas");
    animate.current.ctx = animate.current.canvas.getContext("2d");
  }, []);
  useEffect(() => {
    // 绑定事件
    window.addEventListener("scroll", scrollEvent, false);

    // 开始动画的滚动距离
    // @ts-ignore
    startOpen.current = 100;

    return () => {
      window.removeEventListener("scroll", scrollEvent, false);
    };
  }, []);
  return (
    <div className={styles.stickyContainer}>
      <div className={styles.stickyWrapper}>
        <div className={styles.imgWrapper} id="imgWrapper">
          <canvas id="canvas" width={8580} height={5210} />
        </div>
      </div>
    </div>
  );
}
