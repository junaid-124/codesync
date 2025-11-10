import { RiTrophyLine, RiCodeLine, RiBarChartLine, RiSparklingLine } from 'react-icons/ri';
import styles from './Features.module.css';

const featuresData = [
  {
    icon: <RiTrophyLine />,
    title: 'Leaderboards',
    description: 'Track your progress across all platforms',
  },
  {
    icon: <RiCodeLine />,
    title: 'Code Editor',
    description: 'Practice with our online IDE',
  },
  {
    icon: <RiBarChartLine />,
    title: 'Analytics',
    description: 'Visualize your coding journey',
  },
  {
    icon: <RiSparklingLine />,
    title: 'Achievements',
    description: 'Unlock badges and milestones',
  },
];

const Features = () => {
  return (
    <section className={styles.featuresContainer}>
      {featuresData.map((feature, index) => (
        <div key={index} className={styles.featureCard}>
          <div className={styles.icon}>{feature.icon}</div>
          <h3 className={styles.title}>{feature.title}</h3>
          <p className={styles.description}>{feature.description}</p>
        </div>
      ))}
    </section>
  );
};

export default Features;