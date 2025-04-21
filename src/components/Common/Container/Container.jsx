import styles from "./Container.module.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Container({ children }) {
  const location = useLocation();
  const [fadeKey, setFadeKey] = useState(0);

  useEffect(() => {
    setFadeKey((prev) => prev + 1);
  }, [location.pathname]);

  return (
    <div key={fadeKey} className={styles.container}>
      {children}
    </div>
  );
}
