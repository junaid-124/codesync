import styles from './Integrations.module.css';

const platforms = [
  { name: 'LeetCode', color: '#A587FF' },
  { name: 'Codeforces', color: '#61A9FF' },
  { name: 'CodeChef', color: '#FF9B57' },
  { name: 'GitHub', color: '#FFFFFF' },
  { name: 'GeeksforGeeks', color: '#6BDB6B' },
  { name: 'HackerRank', color: '#F2B824' },
];

const Integrations = () => {
  return (
    <section className={styles.integrationsSection}>
      <h3 className={styles.title}>Integrate with your favorite platforms</h3>
      <div className={styles.platformsContainer}>
        {platforms.map((platform) => (
          <div 
            key={platform.name} 
            className={styles.platformTag}
            style={{ color: platform.color }} // Apply unique color here
          >
            {platform.name}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Integrations;