import styles from "./styles.module.scss";
import { FC } from "react";

type progressIconProps = {
  value: number;
  color: string;
  title: string;
};

const ProgressIcon: FC<progressIconProps> = ({ title, value, color }) => {
  return (
    <div className={`${styles.icon} ${color}`}>
      {title}: {value}
    </div>
  );
};

export default ProgressIcon;
