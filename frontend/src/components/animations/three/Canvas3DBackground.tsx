import React from 'react';
import styles from './Canvas3DBackground.module.css';

/**
 * Animated CSS-only background replacing the WebGL canvas.
 * @react-three/fiber conflicts with React's bundled reconciler in this setup.
 * This provides a visually rich animated background without any WebGL dependency.
 */
export const Canvas3DBackground: React.FC = () => {
  return (
    <div className={styles.bg} aria-hidden>
      {/* Animated gradient orbs */}
      <div className={`${styles.orb} ${styles.orb1}`} />
      <div className={`${styles.orb} ${styles.orb2}`} />
      <div className={`${styles.orb} ${styles.orb3}`} />
      {/* Road lines */}
      <div className={styles.road}>
        <div className={`${styles.roadLine} ${styles.line1}`} />
        <div className={`${styles.roadLine} ${styles.line2}`} />
        <div className={`${styles.roadLine} ${styles.line3}`} />
      </div>
    </div>
  );
};
