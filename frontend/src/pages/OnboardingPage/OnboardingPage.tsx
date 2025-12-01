import React, { useState, useEffect } from 'react';
import styles from './OnboardingPage.module.css';
import { auth, db, storage } from '../../firebase'; 
import { doc, setDoc } from 'firebase/firestore';
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { motion, AnimatePresence } from 'framer-motion';

// Icons
import {
  RiArrowRightLine,
  RiArrowLeftLine,
  RiCloseCircleFill,
  RiCheckLine,
  RiAddLine,
  RiUpload2Line
} from 'react-icons/ri';

import {
  SiLeetcode,
  SiCodeforces,
  SiCodechef,
  SiHackerrank,
  SiGeeksforgeeks,
  SiHackerearth,
  SiCodingninjas,
  SiCoder
} from 'react-icons/si';

type Achievement = {
  title: string;
  category: string;
  image: string | null;
};

const initialData = {
  name: '',
  phone: '',
  department: 'CSE',
  rollNumber: '',
  section: 'Section A',
  graduationYear: '',
  leetCode: '',
  codeforces: '',
  codeChef: '',
  hackerRank: '',
  hackerEarth: '',
  geeksForGeeks: '',
  code360: '',
  atCoder: '',
  skills: [] as string[],
  interests: [] as string[],
  achievements: [] as Achievement[],
  linkedinUrl: '',
  githubUsername: '',
  about: '',
};

const steps = [
  { id: 1, name: 'Basic Info' },
  { id: 2, name: 'Platforms' },
  { id: 3, name: 'Skills' },
  { id: 4, name: 'Socials' },
  { id: 5, name: 'Bio' },
];

const branchesWithSections = ['CSE', 'CSIT', 'CSE-DS', 'CSE-AIML', 'CSE-IOT', 'IT'];

const OnboardingPage = ({ onLogin }: { onLogin: () => void }) => {

  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const [skillInput, setSkillInput] = useState('');
  const [interestInput, setInterestInput] = useState('');

  const [achievementTitle, setAchievementTitle] = useState('');
  const [achievementCategory, setAchievementCategory] = useState('Projects');
  const [achievementFile, setAchievementFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const cleanLinkedIn = (input: string) => {
    if (!input) return '';
    let url = input.trim();
    if (!url.startsWith('http')) url = 'https://' + url;
    url = url.replace('://www.', '://');
    if (!url.includes('linkedin.com')) {
      if (!url.includes('/')) url = `https://linkedin.com/in/${url.replaceAll(' ', '')}`;
    }
    if (url.endsWith('/')) url = url.slice(0, -1);
    return url;
  };

  const cleanGitHub = (input: string) => {
    if (!input) return '';
    let v = input.trim();
    if (v.startsWith('http')) {
      try {
        const u = new URL(v);
        const seg = u.pathname.split('/');
        v = seg[1] || v;
      } catch {}
    }
    return v.replaceAll(' ', '');
  };

  useEffect(() => {
    if (auth.currentUser?.displayName) {
      setData(prev => ({ ...prev, name: auth.currentUser?.displayName || '' }));
    }
  }, []);

  type DataKey = 'skills' | 'interests';

  const handleTagKeyDown = (e: any, type: DataKey, val: string, setInput: any) => {
    if (e.key === 'Enter' && val.trim()) {
      e.preventDefault();
      if (!data[type].includes(val.trim())) {
        setData(prev => ({ ...prev, [type]: [...prev[type], val.trim()] }));
      }
      setInput('');
    }
  };

  const removeTag = (type: DataKey, tag: string) => {
    setData(prev => ({ ...prev, [type]: prev[type].filter(t => t !== tag) }));
  };

  const handleChange = (field: string, value: string) => {
    if (field === 'linkedinUrl') return setData(prev => ({ ...prev, linkedinUrl: cleanLinkedIn(value) }));
    if (field === 'githubUsername') return setData(prev => ({ ...prev, githubUsername: cleanGitHub(value) }));
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const uploadAchievementImage = async (file: File | null, userId: string) => {
    if (!file) return null;
    try {
      const fileName = `achievements/${userId}_${Date.now()}_${file.name.replaceAll(' ', '_')}`;
      const sRef = storageRef(storage, fileName);
      const task = uploadBytesResumable(sRef, file);

      return await new Promise<string | null>((resolve, reject) => {
        task.on(
          'state_changed',
          snap => {
            const prog = (snap.bytesTransferred / snap.totalBytes) * 100;
            setUploadProgress(Math.round(prog));
          },
          err => {
            setUploadProgress(null);
            reject(err);
          },
          async () => {
            const downloadURL = await getDownloadURL(task.snapshot.ref);
            setUploadProgress(null);
            resolve(downloadURL);
          }
        );
      });
    } catch {
      return null;
    }
  };

  const handleAddAchievement = async () => {
    const title = achievementTitle.trim();
    if (!title) return;

    const newAch: Achievement = {
      title,
      category: achievementCategory,
      image: null
    };

    const uid = auth.currentUser?.uid || 'anonymous';

    if (achievementFile) {
      newAch.image = await uploadAchievementImage(achievementFile, uid);
    }

    setData(prev => ({ ...prev, achievements: [...prev.achievements, newAch] }));

    setAchievementTitle('');
    setAchievementCategory('Projects');
    setAchievementFile(null);
    setUploadProgress(null);
  };

  const removeAchievement = (i: number) => {
    setData(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, idx) => idx !== i)
    }));
  };

  const handleCompleteSetup = async () => {
    setLoading(true);
    const user = auth.currentUser;
    try {
      if (user) {
        await setDoc(
          doc(db, 'users', user.uid),
          {
            ...data,
            email: user.email,
            uid: user.uid,
            photoURL: user.photoURL,
            onboardingCompleted: true
          },
          { merge: true }
        );
        onLogin();
      }
    } finally {
      setLoading(false);
    }
  };

  const getHeaderInfo = () => {
    switch (currentStep) {
      case 1: return { title: "Let's get started!", sub: 'Tell us about your academic background.' };
      case 2: return { title: 'Show off your stats', sub: 'Add your coding platform usernames.' };
      case 3: return { title: 'What are you good at?', sub: 'Add your skills, interests & achievements.' };
      case 4: return { title: 'Where can people find you?', sub: 'Add your social links.' };
      case 5: return { title: 'The final touch', sub: 'Write a short bio.' };
      default: return { title: 'Welcome', sub: '' };
    }
  };

  const headerInfo = getHeaderInfo();

  const renderStepContent = () => {
    let content = null;

    // ------------------- STEP 1 -------------------
    if (currentStep === 1) {
      content = (
        <>
          <div className={styles.inputGroup}>
            <label>Name *</label>
            <input type="text" value={data.name} onChange={e => handleChange('name', e.target.value)} />
          </div>
          <div className={styles.inputGroup}>
            <label>Phone *</label>
            <input type="text" value={data.phone} onChange={e => handleChange('phone', e.target.value)} />
          </div>
          <div className={styles.inputGroup}>
            <label>Department *</label>
            <select value={data.department} onChange={e => handleChange('department', e.target.value)}>
              <option>CSE</option>
              <option>CSIT</option>
              <option>CSE-DS</option>
              <option>CSE-AIML</option>
              <option>CSE-IOT</option>
              <option>IT</option>
              <option>MECH</option>
              <option>CIVIL</option>
              <option>ECE</option>
              <option>EE</option>
            </select>
          </div>

          {branchesWithSections.includes(data.department) && (
            <div className={styles.inputGroup}>
              <label>Section *</label>
              <select value={data.section} onChange={e => handleChange('section', e.target.value)}>
                <option>Section A</option>
                <option>Section B</option>
                <option>Section C</option>
                <option>Section G</option>
              </select>
            </div>
          )}

          <div className={styles.inputGroup}>
            <label>Roll Number *</label>
            <input type="text" value={data.rollNumber} onChange={e => handleChange('rollNumber', e.target.value)} />
          </div>

          <div className={styles.inputGroup}>
            <label>Graduation Year *</label>
            <input type="text" value={data.graduationYear} onChange={e => handleChange('graduationYear', e.target.value)} />
          </div>
        </>
      );
    }

    // ------------------- STEP 2 (UPDATED) -------------------
    if (currentStep === 2) {
      content = (
        <>
          <div className={styles.infoBox}>
            <RiCheckLine /> All platform usernames are optional but recommended.
          </div>

          {/* ⭐⭐ NEW TWO-COLUMN GRID START */}
          <div className={styles.platformGrid}>

            <div className={styles.inputGroup}>
              <label className={styles.iconLabel}>
                <SiLeetcode color="#FFA116" /> LeetCode
              </label>
              <input type="text" value={data.leetCode} onChange={e => handleChange('leetCode', e.target.value)} />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.iconLabel}>
                <SiCodeforces color="#1F8ACB" /> Codeforces
              </label>
              <input type="text" value={data.codeforces} onChange={e => handleChange('codeforces', e.target.value)} />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.iconLabel}>
                <SiCodechef color="#5B4638" /> CodeChef
              </label>
              <input type="text" value={data.codeChef} onChange={e => handleChange('codeChef', e.target.value)} />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.iconLabel}>
                <SiHackerrank color="#2EC866" /> HackerRank
              </label>
              <input type="text" value={data.hackerRank} onChange={e => handleChange('hackerRank', e.target.value)} />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.iconLabel}>
                <SiHackerearth color="#0097e6" /> HackerEarth
              </label>
              <input type="text" value={data.hackerEarth} onChange={e => handleChange('hackerEarth', e.target.value)} />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.iconLabel}>
                <SiGeeksforgeeks color="#2F8D46" /> GeeksforGeeks
              </label>
              <input type="text" value={data.geeksForGeeks} onChange={e => handleChange('geeksForGeeks', e.target.value)} />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.iconLabel}>
                <SiCodingninjas /> Code360
              </label>
              <input type="text" value={data.code360} onChange={e => handleChange('code360', e.target.value)} />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.iconLabel}>
                <SiCoder /> AtCoder
              </label>
              <input type="text" value={data.atCoder} onChange={e => handleChange('atCoder', e.target.value)} />
            </div>

          </div>
          {/* ⭐⭐ NEW GRID END */}
        </>
      );
    }

    // ------------------- STEP 3 -------------------
    if (currentStep === 3) {
      content = (
        <>
          <div className={styles.inputGroup}>
            <label>Primary Skills</label>
            <div className={styles.tagContainer}>
              {data.skills.map((t, i) => (
                <span key={i} className={styles.tag}>
                  {t}
                  <RiCloseCircleFill onClick={() => removeTag('skills', t)} />
                </span>
              ))}
              <input
                type="text"
                className={styles.tagInput}
                placeholder="Type and press Enter..."
                value={skillInput}
                onChange={e => setSkillInput(e.target.value)}
                onKeyDown={e => handleTagKeyDown(e, 'skills', skillInput, setSkillInput)}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Interests</label>
            <div className={styles.tagContainer}>
              {data.interests.map((t, i) => (
                <span key={i} className={styles.tag}>
                  {t}
                  <RiCloseCircleFill onClick={() => removeTag('interests', t)} />
                </span>
              ))}
              <input
                type="text"
                className={styles.tagInput}
                placeholder="Type and press Enter..."
                value={interestInput}
                onChange={e => setInterestInput(e.target.value)}
                onKeyDown={e => handleTagKeyDown(e, 'interests', interestInput, setInterestInput)}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Achievements</label>

            <div className={styles.achievementContainer}>
              {data.achievements.map((ach, idx) => (
                <motion.div
                  key={idx}
                  className={styles.achievementCard}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className={styles.achievementInfo}>
                    <div className={styles.achievementTitle}>{ach.title}</div>
                    <div className={styles.achievementCategory}>{ach.category}</div>
                  </div>

                  {ach.image ? (
                    <img src={ach.image} className={styles.achievementThumb} />
                  ) : (
                    <div className={styles.achievementThumbPlaceholder}>No Image</div>
                  )}

                  <button className={styles.achievementRemove} onClick={() => removeAchievement(idx)}>
                    <RiCloseCircleFill />
                  </button>
                </motion.div>
              ))}
            </div>

            <div className={styles.achievementFormRow}>
              <input
                type="text"
                className={styles.achievementInput}
                placeholder="Achievement title (e.g., Winner SIH 2023)"
                value={achievementTitle}
                onChange={e => setAchievementTitle(e.target.value)}
              />

              <select
                className={styles.achievementSelect}
                value={achievementCategory}
                onChange={e => setAchievementCategory(e.target.value)}
              >
                <option>Projects</option>
                <option>Hackathons</option>
                <option>Contests</option>
                <option>Awards</option>
                <option>Certifications</option>
              </select>
            </div>

            <div className={styles.achievementFileRow}>
              <label className={styles.uploadLabel}>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={e => setAchievementFile(e.target.files?.[0] || null)}
                />
                <span className={styles.uploadBtn}><RiUpload2Line /> Upload certificate</span>
              </label>

              <button
                type="button"
                className={styles.addAchievementBtn}
                onClick={handleAddAchievement}
                disabled={!achievementTitle.trim() || uploadProgress !== null}
              >
                <RiAddLine /> Add Achievement
              </button>

              {uploadProgress !== null && (
                <div className={styles.uploadProgress}>{uploadProgress}%</div>
              )}
            </div>
          </div>
        </>
      );
    }

    // ------------------- STEP 4 -------------------
    if (currentStep === 4) {
      content = (
        <>
          <div className={styles.inputGroup}>
            <label>LinkedIn URL</label>
            <input
              type="text"
              value={data.linkedinUrl}
              onChange={e => handleChange('linkedinUrl', e.target.value)}
              placeholder="https://linkedin.com/in/username"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>GitHub Username</label>
            <input
              type="text"
              value={data.githubUsername}
              onChange={e => handleChange('githubUsername', e.target.value)}
              placeholder="username only"
            />
          </div>
        </>
      );
    }

    // ------------------- STEP 5 -------------------
    if (currentStep === 5) {
      content = (
        <div className={styles.aboutWrapper}>
          <label className={styles.floatingLabel}>About</label>
          <textarea
            className={styles.aboutArea}
            value={data.about}
            onChange={e => handleChange('about', e.target.value)}
            placeholder="Tell us about yourself..."
          ></textarea>
        </div>
      );
    }

    return (
      <div className={styles.stepContentWrapper}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={styles.stepContent}
          >
            {content}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className={styles.pageContainer}>
      <form className={styles.card} onSubmit={e => e.preventDefault()}>
        <div className={styles.header}>
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2>{headerInfo.title}</h2>
            <p className={styles.subtitle}>{headerInfo.sub}</p>
          </motion.div>

          <div className={styles.progressContainer}>
            <div className={styles.segmentedBar}>
              {[1, 2, 3, 4, 5].map(step => (
                <div key={step} className={`${styles.segment} ${step <= currentStep ? styles.activeSegment : ''}`}></div>
              ))}
            </div>
            <span className={styles.stepCount}>Step {currentStep} of 5</span>
          </div>
        </div>

        {renderStepContent()}

        <div className={styles.footer}>
          {currentStep > 1 ? (
            <button type="button" className={styles.backBtn} onClick={handleBack}>
              <RiArrowLeftLine /> Back
            </button>
          ) : (
            <div />
          )}

          {currentStep < 5 ? (
            <button type="button" className={styles.nextBtn} onClick={handleNext}>
              Continue <RiArrowRightLine />
            </button>
          ) : (
            <button type="button" className={styles.finishBtn} disabled={loading} onClick={handleCompleteSetup}>
              {loading ? 'Saving...' : 'Finish & Go to Dashboard'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default OnboardingPage;
