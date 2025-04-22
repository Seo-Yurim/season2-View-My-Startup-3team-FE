import styles from "./Description.module.css";

export default function Description({ item }) {
  return (
    <>
      <p className={styles.description}>{item.description}</p>
    </>
  );
}
