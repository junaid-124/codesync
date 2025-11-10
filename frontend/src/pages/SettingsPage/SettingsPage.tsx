import React, { useState } from 'react';
import styles from './SettingsPage.module.css';

// --- DUMMY DATA FOR THE FORM ---
const dummyProfileData = {
  displayName: 'Junaid',
  university: 'MVSR Engineering College',
  skills: 'C++, Python, React, TypeScript',
  email: 'junaid@example.com',
};

const SettingsPage = () => {
  // The form state is now initialized with the dummy data
  const [profileData, setProfileData] = useState(dummyProfileData);

  // This function still allows you to edit the text in the form fields
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1>Settings</h1>
        <p>Manage your account and profile settings.</p>
      </header>

      {/* Profile Settings Card */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2>Profile Settings</h2>
          <p>This information will be displayed on your public profile.</p>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.formRow}>
            <label htmlFor="displayName">Display Name</label>
            <input id="displayName" name="displayName" type="text" value={profileData.displayName} onChange={handleProfileChange} className={styles.input} />
          </div>
          <div className={styles.formRow}>
            <label htmlFor="university">University</label>
            <input id="university" name="university" type="text" value={profileData.university} onChange={handleProfileChange} className={styles.input} />
          </div>
          <div className={styles.formRow}>
            <label htmlFor="skills">Skills</label>
            <textarea id="skills" name="skills" value={profileData.skills} onChange={handleProfileChange} className={styles.textarea} placeholder="Comma-separated, e.g., C++, Python, React"></textarea>
          </div>
        </div>
        <div className={styles.cardFooter}>
          <button className={styles.button}>Save Changes</button>
        </div>
      </div>

      {/* Account Settings Card */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2>Account Settings</h2>
          <p>Manage your login and account details.</p>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.formRow}>
            <label>Email</label>
            <input type="email" value={profileData.email} className={styles.input} disabled />
          </div>
          <div className={styles.formRow}>
            <label>Password</label>
            <button className={`${styles.button} ${styles.secondary}`}>Change Password</button>
          </div>
        </div>
        <div className={styles.cardFooter}>
          <button className={`${styles.button} ${styles.danger}`}>Delete Account</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;