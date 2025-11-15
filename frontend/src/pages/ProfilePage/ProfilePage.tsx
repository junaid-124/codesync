import React, { useState, useEffect } from 'react';
import styles from './ProfilePage.module.css';
import { auth } from '../../firebase'; // 'db' is no longer needed

// Corrected type-only import
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';

// Firestore imports are no longer needed
// import { doc, getDoc } from 'firebase/firestore'; 

import { RiCodeBoxFill, RiTrophyLine, RiGithubFill, RiTeamLine, RiPencilLine } from 'react-icons/ri';

// --- DUMMY DATA FOR PROFILE DETAILS ---
const dummyProfileData = {
  university: 'CodeSync University',
  gradYear: '2025',
  skills: 'React, TypeScript, Node.js, Firebase, C++',
};

// --- Mock Data for stats and activity ---
const mockStats = [
  { icon: <RiCodeBoxFill />, value: '342', label: 'Problems Solved' },
  { icon: <RiTrophyLine />, value: '1,750', label: 'Contest Rating' },
  { icon: <RiGithubFill />, value: '68', label: 'GitHub Commits' },
  { icon: <RiTeamLine />, value: '#3', label: 'College Rank' },
];
const mockRecentActivity = [
  { name: 'Two Sum', platform: 'LeetCode', status: 'Accepted' },
  { name: 'Div. 2 Contest #825', platform: 'Codeforces', status: 'Participated' },
  { name: 'Longest Substring', platform: 'LeetCode', status: 'Accepted' },
];

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // This effect is now simpler and only gets the authenticated user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading Profile...</div>;
  }

  if (!user) {
    return <div className={styles.loading}>Please sign in to view your profile.</div>;
  }

  return (
    <div className={styles.pageContainer}>
      {/* --- Profile Header --- */}
      <header className={styles.profileHeader}>
        {/* This avatar is still REAL data from Firebase Auth */}
        <img src={user.photoURL || ''} alt="User Avatar" className={styles.avatar} referrerPolicy="no-referrer" />
        <div className={styles.headerText}>
          {/* This name is still REAL data from Firebase Auth */}
          <h1>{user.displayName}</h1>
          {/* This now uses the DUMMY data */}
          <p>{dummyProfileData.university}</p>
        </div>
        <button className={styles.editButton}><RiPencilLine /> Edit Profile</button>
      </header>

      {/* --- Stats Grid (Uses mock data) --- */}
      <section className={styles.statsGrid}>
        {mockStats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.cardIcon}>{stat.icon}</div>
            <div className={styles.cardValue}>{stat.value}</div>
            <div className={styles.cardLabel}>{stat.label}</div>
          </div>
        ))}
      </section>

      {/* --- Skills & Recent Activity --- */}
      <section className={styles.mainContentGrid}>
        <div className={styles.skillsSection}>
          <h3>Skills</h3>
          <div className={styles.skillsContainer}>
            {/* This now uses the DUMMY data */}
            {dummyProfileData.skills.split(',').map((skill, index) => (
              <span key={index} className={styles.skillTag}>{skill.trim()}</span>
            ))}
          </div>
        </div>
        <div className={styles.activitySection}>
          <h3>Recent Activity</h3>
          <div className={styles.activityList}>
            {mockRecentActivity.map((activity, index) => (
              <div key={index} className={styles.activityItem}>
                <div className={styles.activityInfo}>
                  <span className={styles.activityName}>{activity.name}</span>
                  <span className={styles.activityPlatform}>{activity.platform}</span>
                </div>
                <span className={styles.activityStatus}>{activity.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;