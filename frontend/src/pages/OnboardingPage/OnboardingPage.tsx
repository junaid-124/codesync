import React, { useState } from 'react';
import { auth, db } from '../../firebase'; // Import 'db' for Firestore
import { doc, setDoc } from 'firebase/firestore'; 
import styles from './OnboardingPage.module.css';

const OnboardingPage = ({ onLogin }: { onLogin: () => void }) => {
  const [formData, setFormData] = useState({
    university: '',
    gradYear: '',
    skills: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFinish = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (user) {
      try {
        // Create a document in Firestore with the user's unique ID
        const userDocRef = doc(db, 'users', user.uid);
        
        // Save the form data along with some user details from Auth
        await setDoc(userDocRef, {
          ...formData,
          email: user.email,
          displayName: user.displayName,
          uid: user.uid,
        });

        // Trigger the login state change and navigate to the dashboard
        onLogin();
      } catch (error) {
        console.error("Error saving user data:", error);
      }
    } else {
      console.error("No user is signed in to save data.");
    }
  };

  return (
    <div className={styles.onboardingContainer}>
      <form className={styles.formCard} onSubmit={handleFinish}>
        <h2>Welcome to CodeSync!</h2>
        <p>Let's set up your profile. This info will be used to help generate your resume later.</p>
        
        <label htmlFor="university">University</label>
        <input 
          id="university"
          name="university" 
          value={formData.university} 
          onChange={handleChange} 
          placeholder="e.g., MVSR Engineering College" 
          className={styles.input} 
          required 
        />
        
        <label htmlFor="gradYear">Graduation Year</label>
        <input 
          id="gradYear"
          name="gradYear" 
          value={formData.gradYear} 
          onChange={handleChange} 
          placeholder="e.g., 2026" 
          className={styles.input} 
          required 
        />
        
        <label htmlFor="skills">Primary Skills</label>
        <textarea 
          id="skills"
          name="skills" 
          value={formData.skills} 
          onChange={handleChange} 
          placeholder="e.g., C++, Python, React, Data Structures" 
          className={styles.textarea} 
          required
        ></textarea>

        <button type="submit" className={styles.button}>Finish & Go to Dashboard</button>
      </form>
    </div>
  );
};

export default OnboardingPage;