import React, { useState } from 'react';
import styles from './CareerSuitePage.module.css';
import { RiUploadCloud2Line } from 'react-icons/ri';

const dummyResumeData = {
  name: 'Junaid',
  email: 'junaid@example.com',
  university: 'MVSR Engineering College',
  skills: 'C++, Python, React, TypeScript, Firebase',
  projects: 'CodeSync - A competitive programming tracker built with React.',
};

const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState(dummyResumeData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  return (
    <div className={`${styles.toolContent} ${styles.resumeLayout}`}>
      <div className={styles.resumeForm}>
        <h3>Resume Details</h3>
        <label htmlFor="name">Full Name</label>
        <input id="name" name="name" type="text" value={resumeData.name} onChange={handleChange} />
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" value={resumeData.email} onChange={handleChange} />
        <label htmlFor="university">University</label>
        <input id="university" name="university" type="text" value={resumeData.university} onChange={handleChange} />
        <label htmlFor="skills">Skills (comma-separated)</label>
        <textarea id="skills" name="skills" value={resumeData.skills} onChange={handleChange} />
        <label htmlFor="projects">Projects</label>
        <textarea id="projects" name="projects" value={resumeData.projects} onChange={handleChange} />
        <button type="button" onClick={() => window.print()} className={styles.downloadButton}>
          Download as PDF
        </button>
      </div>
      <div className={styles.resumePreview}>
        <div className={styles.previewHeader}>
          <h1>{resumeData.name}</h1>
          <p>{resumeData.email}</p>
        </div>
        <div className={styles.previewSection}>
          <h2>Education</h2>
          <p>{resumeData.university}</p>
        </div>
        <div className={styles.previewSection}>
          <h2>Skills</h2>
          <div className={styles.skillsContainer}>
            {resumeData.skills.split(',').map((skill, i) => skill && <span key={i} className={styles.skillTag}>{skill.trim()}</span>)}
          </div>
        </div>
        <div className={styles.previewSection}>
          <h2>Projects</h2>
          <p>{resumeData.projects}</p>
        </div>
      </div>
    </div>
  );
};

const AtsAnalyzer = () => (
  <div className={styles.toolContent}>
    <div className={styles.dropzone}>
      <RiUploadCloud2Line />
      <h3>Upload Your Resume</h3>
      <p>Drag and drop your PDF file here, or click to browse.</p>
      <button>Select File</button>
    </div>
  </div>
);

const CareerSuitePage = () => {
  const [activeTab, setActiveTab] = useState('builder');

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1>Career Suite</h1>
        <p>Build your resume and analyze it for ATS compatibility</p>
      </header>
      <nav className={styles.tabNav}>
        <button className={`${styles.tabButton} ${activeTab === 'builder' ? styles.activeTab : ''}`} onClick={() => setActiveTab('builder')}>
          Resume Builder
        </button>
        <button className={`${styles.tabButton} ${activeTab === 'analyzer' ? styles.activeTab : ''}`} onClick={() => setActiveTab('analyzer')}>
          ATS Analyzer
        </button>
      </nav>
      <div className={styles.contentArea}>
        {activeTab === 'builder' ? <ResumeBuilder /> : <AtsAnalyzer />}
      </div>
    </div>
  );
};

export default CareerSuitePage;