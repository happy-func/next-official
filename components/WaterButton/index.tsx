import styles from "./index.module.scss";
import TWEEN from "@tweenjs/tween.js";
import React, { CSSProperties, ReactElement, useEffect, useRef } from "react";
import classNames from "classnames";

export default function WaterButton(props: IProps) {
  const { active, onClick, children, className, style, icon, loading } = props;
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
    if (loading) return;
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
      <span className={classNames(styles.button)}>
        {icon && !loading && (
          <span className={classNames(styles["button-icon"])}>{icon}</span>
        )}
        {loading && (
          <span className={classNames(styles["button-icon"])}>
            <Loading />
          </span>
        )}
        {children}
      </span>
    </div>
  );
}

function Loading() {
  return (
    <span role="img" className={styles.loading}>
      <svg
        viewBox="0 0 1024 1024"
        focusable="false"
        data-icon="loading"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"/>
      </svg>
    </span>
  );
}

interface IProps {
  active?: boolean;
  onClick?: () => void;
  children?: React.ReactChildren | string;
  className?: string;
  style?: CSSProperties;
  icon?: ReactElement;
  loading?: boolean;
}
