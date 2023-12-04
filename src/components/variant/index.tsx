import styles from "./styles.module.scss";
import { FC, ReactElement } from "react";

type variantProps = {
  color: "green" | "red";
  title: string;
  percent: string;
  yesterday: number;
  friday: number;
  infoTitle: string;
  infoText: ReactElement;
  infoTextGray: string;
};

const Variant: FC<variantProps> = ({
  color,
  title,
  percent,
  yesterday,
  friday,
  infoTitle,
  infoText,
  infoTextGray,
}) => {
  return (
    <div className={`${styles.wrapper} ${color}`}>
      <div className={styles.icon}>
        <span></span>
      </div>

      <div className={styles.main}>
        <p className={styles.mainTitle}>
          {title} {percent ? <span>{percent}</span> : ""}
        </p>
        <p className={styles.mainText}>
          <span>{yesterday}</span> Yesterday
        </p>
        <p className={`${styles.mainText} gray`}>{friday} Last friday</p>
      </div>

      <div className={styles.info}>
        <p className={styles.infoTitle}>{infoTitle}</p>
        <p className={`gray`}>{infoTextGray}</p>
        {infoText}
      </div>
    </div>
  );
};

export default Variant;
