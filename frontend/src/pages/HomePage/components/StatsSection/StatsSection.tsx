import { RiTeamLine, RiCodeBoxFill, RiTrophyLine, RiLineChartLine, RiArrowUpLine } from 'react-icons/ri';
import styles from './StatsSection.module.css';

const statsData = [
  {
    icon: <RiTeamLine />,
    stat: '12,000+',
    label: 'Active Users',
    description: 'Competitive programmers tracking their journey',
    increase: '+23%',
  },
  {
    icon: <RiCodeBoxFill />,
    stat: '2.5M+',
    label: 'Problems Tracked',
    description: 'Solutions monitored across all platforms',
    increase: '+156%',
  },
  {
    icon: <RiTrophyLine />,
    stat: '45,000+',
    label: 'Contest Participations',
    description: 'Competitions tracked and analyzed',
    increase: '+89%',
  },
  {
    icon: <RiLineChartLine />,
    stat: '94%',
    label: 'Success Rate',
    description: 'Users report improved performance',
    increase: '+12%',
  },
];

const StatsSection = () => {
  return (
    <section className={styles.sectionContainer}>
      <div className={styles.titleWrapper}>
        <h2 className={styles.mainTitle}>
          Trusted by <span className={styles.gradientText}>Thousands</span>
        </h2>
        <p className={styles.subTitle}>Join the growing community of competitive programmers</p>
      </div>
      <div className={styles.statsGrid}>
        {statsData.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.icon}>{stat.icon}</div>
            <div className={styles.statNumber}>{stat.stat}</div>
            <div className={styles.statLabel}>{stat.label}</div>
            <p className={styles.statDescription}>{stat.description}</p>
            <div className={styles.statIncrease}>
              <RiArrowUpLine /> {stat.increase}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;