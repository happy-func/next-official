import styles from "./index.module.scss";
import TWEEN from "@tweenjs/tween.js";
import React, { CSSProperties, useEffect, useRef } from "react";
import classNames from "classnames";

export default function WaterButton(props: IProps) {
  const { active, onClick, children, className, style } = props;
  const water = useRef(null);
  function animate(time: number | undefined) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
  }
  function updateProperty(coords: { width: number }) {
    if (water.current) {
      // @ts-ignore
      water.current.style.setProperty("width", `${coords.width}%`);
    }
  }
  function _onMouseEnter() {
    const coords = { width: 0 };
    const tween = new TWEEN.Tween(coords)
      .to({ width: 100 }, 250)
      .easing(TWEEN.Easing.Cubic.InOut) // Use an easing function to make the animation smooth.
      .onUpdate(updateProperty);
    // @ts-ignore
    water.current.style.removeProperty("right");
    // @ts-ignore
    water.current.style.setProperty("left", `0px`);
    tween.start();
  }
  function _onMouseLeave() {
    const coords = { width: 100 };
    const tween = new TWEEN.Tween(coords)
      .to({ width: 0 }, 250)
      .easing(TWEEN.Easing.Cubic.InOut) // Use an easing function to make the animation smooth.
      .onUpdate(updateProperty);
    // @ts-ignore
    water.current.style.removeProperty("left");
    // @ts-ignore
    water.current.style.setProperty("right", `0px`);
    tween.start();
  }
  function _onClick() {
    onClick && onClick();
  }
  useEffect(() => {
    requestAnimationFrame(animate);
  }, []);
  return (
    <div
      className={classNames(styles["button-box"], className, {
        [styles["button-box-active"]]: active,
      })}
      onMouseEnter={_onMouseEnter}
      onMouseLeave={_onMouseLeave}
      onClick={_onClick}
      style={style}
    >
      <div
        ref={water}
        className={classNames(styles["button-water"])}
        style={{ left: 0 }}
      />
      <button className={classNames(styles.button)}>{children}</button>
    </div>
  );
}

interface IProps {
  active?: boolean;
  onClick?: () => void;
  children?: React.ReactChildren | string;
  className?: string;
  style?: CSSProperties;
}
