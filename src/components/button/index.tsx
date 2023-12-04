import styles from "./styles.module.scss";
import { FC } from "react";

type buttonProps = {
  title: string;
  onClick: () => void;
  active: boolean;
};

const Button: FC<buttonProps> = ({ title, onClick, active }) => {
  return (
    <button onClick={onClick} className={`${styles.button} ${active ? "active" : ""}`}>
      {title}
    </button>
  );
};

export default Button;
