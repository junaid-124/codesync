import { RiBookOpenLine } from 'react-icons/ri';
import styles from './CoursesSection.module.css';

const featuresList = [
  'Topic-wise course organization',
  'Difficulty-based filtering',
  'External platform integration',
  'Progress tracking',
];

const coursesData = [
  {
    title: 'Dynamic Programming Mastery',
    description: 'Master DP concepts with step-by-step examples',
    difficulty: 'Beginner',
    progress: 75, // Progress percentage
  },
  {
    title: 'Graph Algorithms',
    description: 'BFS, DFS, Dijkstra, and advanced graph techniques',
    difficulty: 'Intermediate',
  },
];

const CoursesSection = () => {
  return (
    <section className={styles.sectionContainer}>
      <div className={styles.contentGrid}>
        {/* Left Column */}
        <div className={styles.leftColumn}>
          <div className={styles.featureTitleContainer}>
            <div className={styles.featureIcon}>
              <RiBookOpenLine />
            </div>
            <h3>Courses & Resources</h3>
          </div>
          <p className={styles.featureDescription}>
            Curated learning materials and courses to improve your competitive programming skills
          </p>
          <ul className={styles.featureList}>
            {featuresList.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        {/* Right Column */}
        <div className={styles.rightColumn}>
          <div className={styles.coursesContainer}>
            {coursesData.map((course, index) => (
              <div key={index} className={styles.courseCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.courseTitle}>{course.title}</span>
                  <span className={`${styles.difficultyTag} ${styles[course.difficulty.toLowerCase()]}`}>
                    {course.difficulty}
                  </span>
                </div>
                <p className={styles.courseDescription}>{course.description}</p>
                {course.progress && (
                  <div className={styles.progressBar}>
                    <div 
                      className={styles.progressFill} 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;