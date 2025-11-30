// frontend/src/pages/StudentProfilePage/DonutChart.tsx

import React from "react";
import { Doughnut } from "react-chartjs-2";

// ⭐ FIX 1 — Register required chart elements manually
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

import styles from "./StudentProfilePage.module.css";

interface Props {
  value: number;
  labels: string[];
  values: number[];
  colors?: string[];
}

const DonutChart: React.FC<Props> = ({ value, labels, values, colors }) => {
  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors,
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "72%",
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className={styles.donutWrapper} style={{ width: 230, height: 230 }}>
      <Doughnut data={data} options={options} />

      {/* Center label */}
      <div className={styles.donutCenterOverlay}>
        <div className={styles.chartCenter}>
          <p className={styles.chartScore}>{value.toLocaleString()}</p>
          <p className={styles.chartLabel}>Total Score</p>
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
