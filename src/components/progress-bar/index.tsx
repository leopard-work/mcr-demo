import styles from "./styles.module.scss";
import { FC } from "react";

type progressBarProps = {
  error500: number;
  error501: number;
  error502: number;
  other: number;
};

const ProgressBar: FC<progressBarProps> = ({ error500, error501, error502, other }) => {
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.item} color1`} style={{ width: error500 + "%" }}></div>
      <div className={`${styles.item} color2`} style={{ width: error501 + "%" }}></div>
      <div className={`${styles.item} color3`} style={{ width: error502 + "%" }}></div>
      <div className={`${styles.item} color4`} style={{ width: other + "%" }}></div>
    </div>
  );
};

export default ProgressBar;
