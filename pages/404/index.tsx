import styles from "./index.module.scss";
import PageTitle from "../../components/title";

export default function Custom404() {
  return (
    <div className={styles.wrap}>
      <PageTitle title="404 page not found" />
      <div className={styles["text-magic"]} data-word="404">
        <div className={styles.white}></div>
      </div>
    </div>
  );
}
