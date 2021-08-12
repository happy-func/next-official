import styles from "./index.module.scss";

export default function Attachment() {
  return (
    <div className={styles.attachmentBox}>
      <div
        className={`${styles.attachmentItem} ${styles.attachmentItemPic1}`}
      />
      <div
        className={`${styles.attachmentItem} ${styles.attachmentItemPic2}`}
      />
    </div>
  );
}
