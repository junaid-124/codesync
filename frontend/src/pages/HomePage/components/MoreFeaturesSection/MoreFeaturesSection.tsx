import { RiAwardLine, RiBarChart2Line, RiTeamLine, RiFocus2Line, RiTimeLine, RiGitBranchLine } from 'react-icons/ri';
import styles from './MoreFeaturesSection.module.css';

const featuresData = [
  {
    icon: <RiAwardLine />,
    title: 'Achievement System',
    description: 'Unlock badges for streaks, milestones, and special accomplishments',
  },
  {
    icon: <RiBarChart2Line />,
    title: 'Advanced Analytics',
    description: 'Detailed insights into your coding patterns and improvement areas',
  },
  {
    icon: <RiTeamLine />,
    title: 'Community Features',
    description: 'Connect with other competitive programmers and share your journey',
  },
  {
    icon: <RiFocus2Line />,
    title: 'Goal Setting',
    description: 'Set and track personalized coding goals and challenges',
  },
  {
    icon: <RiTimeLine />,
    title: 'Real-time Updates',
    description: 'Automated data synchronization every 12 hours across all platforms',
  },
  {
    icon: <RiGitBranchLine />,
    title: 'Version Control',
    description: 'Track your solution evolution and coding style improvements',
  },
];

const MoreFeaturesSection = () => {
  return (
    <section className={styles.sectionContainer}>
      <div className={styles.featuresGrid}>
        {featuresData.map((feature, index) => (
          <div key={index} className={styles.featureCard}>
            <div className={styles.icon}>{feature.icon}</div>
            <h3 className={styles.title}>{feature.title}</h3>
            <p className={styles.description}>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MoreFeaturesSection;