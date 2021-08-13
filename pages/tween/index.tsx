import styles from "./index.module.scss";
import PageTitle from "../../components/title";
import TWEEN from "@tweenjs/tween.js";
import { useEffect } from "react";

export default function TweenPage() {
  const coords = {
    x: 0,
    y: 0,
  };
  // Setup the animation loop.
  function animate(time: number | undefined) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
  }
  useEffect(() => {
    const box = document.querySelector("#animateBox");
    new TWEEN.Tween(coords)
      .to({ x: 300, y: 0 }, 1000)
      .easing(TWEEN.Easing.Cubic.Out) // Use an easing function to make the animation smooth.
      .onUpdate(() => {
        // @ts-ignore
        box.style.setProperty(
          "transform",
          `translate(${coords.x}px, ${coords.y}px)`
        );
      })
      .onComplete(({x, y}) => {
        if (x === 300 && y === 0) {
          coords.x = 300;
          coords.y = 300;
        }
      })
      .start(); // Start the tween immediately.
    requestAnimationFrame(animate);
  }, []);
  return (
    <div className={styles.animateWrap}>
      <PageTitle title="tweenjs 实践" />
      <div className={styles.animateBox} id="animateBox" />
    </div>
  );
}
