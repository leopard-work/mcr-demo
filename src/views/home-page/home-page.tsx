import styles from "./home-page.module.scss";
import DataParse from "@services/dataParse";
import { dataPropsElem } from "../../app";

function HomePage(data: dataPropsElem[]) {
  return (
    <main>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Main metrics</h1>
        <DataParse {...data} />
      </div>
    </main>
  );
}

export default HomePage;
