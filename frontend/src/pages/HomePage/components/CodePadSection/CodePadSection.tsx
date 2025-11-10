import { RiCodeBoxLine } from 'react-icons/ri';
import styles from './CodePadSection.module.css';

const featuresList = [
  'Monaco Editor with syntax highlighting',
  'C, C++, Java, Python, JavaScript support',
  'Judge0 API integration',
  'Real-time compilation & execution',
];

const CodePadSection = () => {
  return (
    <section className={styles.sectionContainer}>
      <div className={styles.contentGrid}>
        {/* Left Column: Code Editor Mockup */}
        <div className={styles.leftColumn}>
          {/* This new div creates the outer frame */}
          <div className={styles.editorFrame}>
            <div className={styles.codeEditor}>
              <div className={styles.editorHeader}>
                <span className={`${styles.dot} ${styles.red}`}></span>
                <span className={`${styles.dot} ${styles.yellow}`}></span>
                <span className={`${styles.dot} ${styles.green}`}></span>
              </div>
              <pre className={styles.codeBlock}>
                <code>
                  {/* Updated span classes for new colors */}
                  <span className={styles.preprocessor}>#include &lt;iostream&gt;</span>
                  <br />
                  <br />
                  <span className={styles.keyword}>using namespace</span> std;
                  <br />
                  <br />
                  <span className={styles.type}>int</span> <span className={styles.function}>main</span>() {'{'}
                  <br />
                  {'  '}cout &lt;&lt; <span className={styles.string}>"Hello CodeArena!"</span>;
                  <br />
                  {'}'}
                </code>
              </pre>
            </div>
          </div>
        </div>

        {/* Right Column: Feature Details (No changes here) */}
        <div className={styles.rightColumn}>
          <div className={styles.featureTitleContainer}>
            <div className={styles.featureIcon}>
              <RiCodeBoxLine />
            </div>
            <h3>CodePad - Online IDE</h3>
          </div>
          <p className={styles.featureDescription}>
            Practice coding with our full-featured online editor supporting multiple languages
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

export default CodePadSection;