import React from 'react';
import styles from "../styles/Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingOverlay} />
      <div className={styles.loadingCircle}>
        <div className={styles.loadingCircle1} />
        <div className={styles.loadingCircle2} />
        <div className={styles.loadingCircle3} />
        <div className={styles.loadingCircle4} />
      </div>
    </div>
  );
};

export default Loading;
