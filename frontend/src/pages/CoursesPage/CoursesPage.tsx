import React, { useState } from 'react';
import styles from './CoursesPage.module.css';
import { RiSearchLine, RiTimeLine, RiUser3Fill, RiArrowRightLine } from 'react-icons/ri';

// 1. Define the interface for the Course object
interface Course {
  id: number;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  duration: string;
  image: string;
}

// 2. Typed Data Array
const coursesData: Course[] = [
  { 
    id: 1,
    title: 'Introduction to Data Science', 
    description: 'Quintillion bytes of data are created EVERY day! Explore how data is transforming the world.', 
    difficulty: 'Beginner', 
    category: 'Data Science',
    duration: '4 Weeks',
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 2,
    title: 'Networking Essentials', 
    description: 'Networks keep the digital world connected. Learn how networks work and gain employable skills.', 
    difficulty: 'Beginner', 
    category: 'Networking',
    duration: '4 Weeks',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

const TABS: string[] = ['All Courses', 'Algorithms', 'Data Structures', 'Competitive', 'Problem Solving'];

const CoursesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('All Courses');

  const filteredCourses = coursesData.filter((course) => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.pageTitle}>Programming Courses</h1>
          <p className={styles.pageSubtitle}>Enhance your competitive programming skills with our expert-led courses</p>
        </header>

        {/* Search Bar */}
        <div className={styles.searchContainer}>
          <div className={styles.searchInputWrapper}>
            <RiSearchLine className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search courses..." 
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className={styles.tabsContainer}>
          {TABS.map((tab) => (
            <button 
              key={tab} 
              className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {filteredCourses.map((course) => (
            <div key={course.id} className={styles.card}>
              
              {/* Image Area */}
              <div className={styles.cardImageWrapper}>
                <img src={course.image} alt={course.title} className={styles.cardImage} />
                <span className={`${styles.badge} ${styles[course.difficulty.toLowerCase()]}`}>
                  {course.difficulty}
                </span>
                <div className={styles.imageOverlay}></div>
              </div>

              {/* Content Area */}
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{course.title}</h3>
                
                <div className={styles.iconRow}>
                  <div className={styles.userIconCircle}>
                    <RiUser3Fill />
                  </div>
                </div>

                <p className={styles.cardDesc}>{course.description}</p>
                
                <div className={styles.durationBox}>
                  <RiTimeLine /> {course.duration}
                </div>

                <button className={styles.actionButton}>
                  View Course <RiArrowRightLine />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;