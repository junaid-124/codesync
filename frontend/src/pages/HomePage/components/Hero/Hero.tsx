import styles from './Hero.module.css';

const Hero = () => {
  return (
    <main className={styles.hero}>
      <h1 className={styles.headline}>
        Master <span className={styles.gradientText}>Competitive</span> Programming
      </h1>
      <p className={styles.subheadline}>
        Track your progress across LeetCode, Codeforces, CodeChef and more.
        Compete with others, analyze your performance, and level up your coding skills.
      </p>
      <div className={styles.ctaButtons}>
        <button className={styles.primaryBtn}>
      Unlock Your Potential
</button>
      </div>
    </main>
  );
};

export default Hero;