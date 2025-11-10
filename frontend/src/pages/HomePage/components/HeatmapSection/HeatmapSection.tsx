import { RiCalendarEventLine } from 'react-icons/ri';
import styles from './HeatmapSection.module.css';

const featuresList = [
  'Daily activity heatmap',
  'Streak tracking & milestones',
  'Color-coded intensity levels',
  'Historical data analysis',
];

// --- UPDATE THIS LINE ---
// Generate data for a wider grid (7 rows * 20 columns = 140 dots)
const heatmapData = Array.from({ length: 140 }, () => Math.floor(Math.random() * 4));

const HeatmapSection = () => {
  return (
    <section className={styles.sectionContainer}>
      <div className={styles.contentGrid}>
        {/* Left Column: Heatmap Mockup */}
        <div className={styles.leftColumn}>
          <div className={styles.heatmapContainer}>
            <div className={styles.heatmapHeader}>
              <span>2024 Activity</span>
            </div>
            <div className={styles.heatmapGrid}>
              {heatmapData.map((level, index) => (
                <div 
                  key={index} 
                  className={`${styles.heatmapDot} ${styles[`level${level}`]}`}
                ></div>
              ))}
            </div>
            <div className={styles.heatmapFooter}>
              <span>Current Streak: 23 days</span>
              <span>Best Streak: 67 days</span>
            </div>
          </div>
        </div>

        {/* Right Column: Feature Details (No changes here) */}
        <div className={styles.rightColumn}>
          <div className={styles.featureTitleContainer}>
            <div className={styles.featureIcon}>
              <RiCalendarEventLine />
            </div>
            <h3>Heatmap Streak Tracker</h3>
          </div>
          <p className={styles.featureDescription}>
            GitHub-style activity visualization showing your daily coding commitment
          </p>
          <ul className={styles.featureList}>
            {featuresList.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HeatmapSection;