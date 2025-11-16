import type { StatItem } from '../../../data/dummyStats';
import styles from './StatsBlock.module.css';

interface StatsBlockProps {
  platformName: string;
  platformColor: string;
  stats: StatItem[];
  className?: string; // <-- THIS LINE IS THE FIX
}

const StatsBlock = ({ platformName, platformColor, stats, className }: StatsBlockProps) => { // <-- Add 'className' here
  const lastUpdated = new Date().toLocaleDateString();

  return (
    // And apply it here, adding an empty string fallback
    <div className={`${styles.statsBlock} ${className || ''}`}> 
      <header 
        className={styles.header}
        style={{ '--platform-color': platformColor } as React.CSSProperties}
      >
        <span className={styles.headerTitle}>{platformName} Stats</span>
        <span className={styles.headerDate}>Last updated: {lastUpdated}</span>
      </header>
      <ul className={styles.statsList}>
        {stats.map((stat) => (
          <li key={stat.label} className={styles.statRow}>
            <span className={styles.statLabel}>
              <span 
                className={styles.statDot}
                style={{ backgroundColor: platformColor }}
              ></span>
              {stat.label}
            </span>
            <span 
              className={styles.statValue}
              style={{ color: platformColor }}
            >
              {stat.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StatsBlock;