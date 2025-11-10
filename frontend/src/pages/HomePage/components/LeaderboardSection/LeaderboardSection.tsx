import { RiTrophyLine } from 'react-icons/ri';
import styles from './LeaderboardSection.module.css';

const leaderboardData = [
  { rank: 1, name: 'Alex_Coder', points: '2,405 points', lc: 892, cf: 1593 },
  { rank: 2, name: 'CodeMaster', points: '2,341 points', lc: 756, cf: 1585 },
];

const featuresList = [
  'LeetCode, Codeforces, CodeChef integration',
  'Contest participation tracking',
  'Advanced filtering & sorting',
  'Platform-specific scoring system',
];

const LeaderboardSection = () => {
  return (
    // This wrapper provides the different background color to separate the section
    <section className={styles.sectionWrapper}>
      <div className={styles.sectionContainer}>
        <h2 className={styles.mainTitle}>
          Everything You Need to <span className={styles.gradientText}>Excel</span>
        </h2>
        <p className={styles.subTitle}>
          A comprehensive platform designed for serious competitive programmers
        </p>

        <div className={styles.contentGrid}>
          {/* Left Column */}
          <div className={styles.leftColumn}>
            <div className={styles.featureTitleContainer}>
              <div className={styles.featureIcon}>
                <RiTrophyLine />
              </div>
              <h3>Competitive Programming Leaderboard</h3>
            </div>
            <p className={styles.featureDescription}>
              Track your ranking across multiple platforms with real-time updates every 12 hours
            </p>
            <ul className={styles.featureList}>
              {featuresList.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* Right Column */}
          <div className={styles.rightColumn}>
            <div className={styles.leaderboardCard}>
              {leaderboardData.map((user) => (
                <div key={user.rank} className={styles.userRow}>
                  <div className={styles.rank}>{user.rank}</div>
                  <div className={styles.userInfo}>
                    <span className={styles.userName}>{user.name}</span>
                    <span className={styles.userPoints}>{user.points}</span>
                  </div>
                  <div className={styles.platformScores}>
                    <span>LC: {user.lc}</span>
                    <span>CF: {user.cf}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeaderboardSection;