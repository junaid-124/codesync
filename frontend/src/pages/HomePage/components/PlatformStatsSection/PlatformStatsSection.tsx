import styles from './PlatformStatsSection.module.css';

const platformData = [
  { name: 'LeetCode', color: '#A587FF', users: '8,500+' },
  { name: 'Codeforces', color: '#61A9FF', users: '6,200+' },
  { name: 'CodeChef', color: '#FF9B57', users: '4,100+' },
  { name: 'GitHub', color: '#FFFFFF', users: '9,800+' },
  { name: 'GeeksforGeeks', color: '#6BDB6B', users: '3,700+' },
  { name: 'HackerRank', color: '#F2B824', users: '5,300+' },
];

const PlatformStatsSection = () => {
  return (
    <section className={styles.sectionContainer}>
      <div className={styles.titleWrapper}>
        <h2 className={styles.mainTitle}>Platform Integration</h2>
        <p className={styles.subTitle}>See how many users are tracking each platform</p>
      </div>
      <div className={styles.statsGrid}>
        {platformData.map((platform) => (
          <div 
            key={platform.name} 
            className={styles.statCard}
            // --- ADD THIS LINE ---
            // This sets the color variable for each card
            style={{ '--platform-color': platform.color } as React.CSSProperties}
          >
            <h3 className={styles.platformName} style={{ color: platform.color }}>
              {platform.name}
            </h3>
            <div className={styles.userCount}>{platform.users}</div>
            <div className={styles.userLabel}>active users</div>
          </div>
        ))}
      </div>
      <div className={styles.liveStatus}>
        <span className={styles.liveDot}></span> Live stats updating every 12 hours
      </div>
    </section>
  );
};

export default PlatformStatsSection;