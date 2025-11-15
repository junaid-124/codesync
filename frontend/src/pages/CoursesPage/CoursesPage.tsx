import React, { useState, useMemo } from 'react';
import styles from './CoursesPage.module.css';
import { RiSearchLine } from 'react-icons/ri';

const coursesData = [
  { title: 'Data Structures & Algorithms', description: 'Master the fundamentals of DSA for interviews and competitive programming.', difficulty: 'Beginner', lessons: 42 },
  { title: 'Dynamic Programming Mastery', description: 'A deep dive into DP concepts with step-by-step examples and problems.', difficulty: 'Intermediate', lessons: 28 },
  { title: 'Graph Theory Algorithms', description: 'Explore BFS, DFS, Dijkstra, and other essential graph techniques.', difficulty: 'Intermediate', lessons: 35 },
  { title: 'Advanced Algorithms', description: 'Tackle complex topics like segment trees, FFT, and advanced string algorithms.', difficulty: 'Advanced', lessons: 18 },
  { title: 'Number Theory & Math', description: 'Learn the mathematical concepts crucial for solving complex CP problems.', difficulty: 'Advanced', lessons: 22 },
  { title: 'System Design Fundamentals', description: 'An introduction to designing scalable systems for technical interviews.', difficulty: 'Beginner', lessons: 30 },
];

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  const filteredCourses = useMemo(() => {
    return coursesData.filter(course => {
      const difficultyMatch = difficultyFilter === 'All' || course.difficulty === difficultyFilter;
      const searchMatch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
      return difficultyMatch && searchMatch;
    });
  }, [searchTerm, difficultyFilter]);

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1>Courses & Learning Paths</h1>
        <p>Sharpen your skills with our curated collection of courses and resources.</p>
      </header>

      <div className={styles.controlsBar}>
        <div className={styles.searchInput}>
          <RiSearchLine />
          <input 
            type="text" 
            placeholder="Search courses..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <select value={difficultyFilter} onChange={e => setDifficultyFilter(e.target.value)} className={styles.filterSelect}>
          <option value="All">All Difficulties</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      <div className={styles.coursesGrid}>
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course, index) => (
            <div key={index} className={styles.courseCard}>
              <div className={styles.cardContent}>
                <span className={`${styles.difficultyTag} ${styles[course.difficulty.toLowerCase()]}`}>
                  {course.difficulty}
                </span>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
              </div>
              <div className={styles.cardFooter}>
                <span>{course.lessons} Lessons</span>
                <button className={styles.ctaButton}>Start Learning</button>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noResults}>No courses found. Try adjusting your filters.</div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;