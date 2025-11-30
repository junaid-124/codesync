// frontend/src/pages/StudentProfilePage/Heatmap.tsx
import React, { useMemo } from "react";
import styles from "./StudentProfilePage.module.css";

interface Props {
  weeks?: number;
  contributions?: number[]; // optional flattened array
}

const clamp = (v: number, min = 0, max = 4) => Math.max(min, Math.min(max, v));

const Heatmap: React.FC<Props> = ({ weeks = 20, contributions }) => {
  const total = weeks * 7;

  const arr = useMemo(() => {
    if (contributions && contributions.length >= total) {
      return contributions.slice(0, total);
    }
    return Array.from({ length: total }, () => Math.floor(Math.random() * 5));
  }, [weeks, contributions, total]);

  const columns: number[][] = [];
  for (let w = 0; w < weeks; w++) {
    columns.push(arr.slice(w * 7, w * 7 + 7));
  }

  return (
    <div className={styles.heatmapWrapper}>
      <div className={styles.heatmapScroll}>
        {columns.map((col, ci) => (
          <div key={ci} className={styles.week}>
            {col.map((lvl, di) => (
              <div
                key={di}
                className={`${styles.day} ${styles[`level${clamp(lvl)}`]}`}
                title={`Week ${ci + 1} · Day ${di + 1} — level ${lvl}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Heatmap;
