import styles from "./Loading.module.css";
import logo from "../../../assets/img_logo_pc.svg";

export default function Loading() {
  return (
    <div className={styles[`spinner-wrap`]}>
      <img claseName={styles.logo} src={logo} />
      <div className={styles.spinner}></div>
      <p className={styles.text}>Loading...</p>
    </div>
  );
}
