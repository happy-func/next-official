import styles from "./index.module.scss";
import PageTitle from "../../components/title";
import TWEEN from "@tweenjs/tween.js";
import { useEffect, useRef, useState } from "react";
import WaterButton from "../../components/WaterButton";

interface DEST {
  x: number;
  y: number;
}

const texts = ["全部", "待报价", "已报价", "已下单"];

export default function TweenPage() {
  const [activeAt, setActiveAt] = useState("全部");
  const coords: DEST = {
    x: 0,
    y: 0,
  };
  const box = useRef(null);
  // Setup the animation loop.
  function animate(time: number | undefined) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
  }
  function updateProperty() {
    // @ts-ignore
    box.current.style.setProperty(
      "transform",
      `translate(${coords.x}px, ${coords.y}px)`
    );
  }
  function initTween() {
    const tweenA = new TWEEN.Tween(coords)
      .to({ x: 300, y: 0 }, 1000)
      .easing(TWEEN.Easing.Cubic.Out) // Use an easing function to make the animation smooth.
      .onUpdate(updateProperty);
    const tweenB = new TWEEN.Tween(coords)
      .to({ x: 300, y: 300 }, 1000)
      .easing(TWEEN.Easing.Cubic.Out) // Use an easing function to make the animation smooth.
      .onUpdate(updateProperty);
    const tweenC = new TWEEN.Tween(coords)
      .to({ x: 0, y: 300 }, 1000)
      .easing(TWEEN.Easing.Cubic.Out) // Use an easing function to make the animation smooth.
      .onUpdate(updateProperty);
    const tweenD = new TWEEN.Tween(coords)
      .to({ x: 0, y: 0 }, 1000)
      .easing(TWEEN.Easing.Cubic.Out) // Use an easing function to make the animation smooth.
      .onUpdate(updateProperty)
      .onComplete(() => {
        tweenA.start();
      });
    tweenA.chain(tweenB);
    tweenB.chain(tweenC);
    tweenC.chain(tweenD);
    tweenA.start();
  }
  useEffect(() => {
    initTween();
    requestAnimationFrame(animate);
  }, []);
  return (
    <div className={styles.animateWrap}>
      <PageTitle title="tweenjs 实践" />
      <div className={styles.animateBox} id="animateBox" ref={box} />
      {texts.map((item) => (
        <WaterButton
          active={item === activeAt}
          key={item}
          style={{ marginRight: 16 }}
          onClick={() => setActiveAt(item)}
        >
          {item}
        </WaterButton>
      ))}
    </div>
  );
}
