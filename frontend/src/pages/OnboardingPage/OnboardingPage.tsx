import React, { useState, useEffect } from 'react';
import styles from './OnboardingPage.module.css';
import { auth, db } from '../../firebase'; 
import { doc, setDoc } from 'firebase/firestore'; 
import { motion, AnimatePresence } from 'framer-motion';

// UI Icons
import { 
    RiArrowRightLine,
    RiArrowLeftLine,
    RiCloseCircleFill,
    RiCheckLine
} from 'react-icons/ri'; 

// Brand Icons
import { 
    SiLeetcode, 
    SiCodeforces, 
    SiCodechef, 
    SiHackerrank, 
    SiGeeksforgeeks 
} from 'react-icons/si';

const initialData = {
    name: '',
    phone: '',
    department: 'Computer Science & Engineering',
    rollNumber: '',
    section: 'Section A',
    graduationYear: '',
    leetCode: '',
    codeforces: '',
    codeChef: '',
    hackerRank: '',
    geeksForGeeks: '',
    skills: [] as string[],
    interests: [] as string[],
    linkedinUrl: '',
    githubUsername: '',
    about: '',
};

// Used for Sidebar labels
const steps = [
    { id: 1, name: "Basic Info" },
    { id: 2, name: "Platforms" },
    { id: 3, name: "Skills" },
    { id: 4, name: "Socials" },
    { id: 5, name: "Bio" },
];

const OnboardingPage = ({ onLogin }: { onLogin: () => void }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(false);
    
    // Inputs for tags
    const [skillInput, setSkillInput] = useState('');
    const [interestInput, setInterestInput] = useState('');

    useEffect(() => {
        if (auth.currentUser?.displayName) {
            setData(prev => ({ ...prev, name: auth.currentUser?.displayName || '' }));
        }
    }, []);
    
    type DataKey = 'skills' | 'interests';

    // Add tag on Enter
    const handleTagKeyDown = (e: React.KeyboardEvent, type: DataKey, value: string, setInput: React.Dispatch<React.SetStateAction<string>>) => {
        if (e.key === 'Enter' && value.trim()) {
            e.preventDefault();
            if (!data[type].includes(value.trim())) {
                setData(prev => ({ ...prev, [type]: [...prev[type], value.trim()] }));
            }
            setInput('');
        }
    };
    
    const removeTag = (type: DataKey, tag: string) => {
        setData(prev => ({ ...prev, [type]: prev[type].filter(t => t !== tag) }));
    };

    const handleChange = (field: string, value: string) => {
        setData(prev => ({ ...prev, [field]: value }));
    };

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentStep < steps.length) setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const handleCompleteSetup = async () => {
        setLoading(true);
        const user = auth.currentUser;
        if (user) {
            try {
                const userDocRef = doc(db, 'users', user.uid);
                await setDoc(userDocRef, {
                    ...data,
                    email: user.email,
                    uid: user.uid,
                    photoURL: user.photoURL,
                    onboardingCompleted: true
                }, { merge: true });
                onLogin();
            } catch (error) {
                console.error("Error saving data:", error);
            }
        }
        setLoading(false);
    };

    // --- Dynamic Header Logic (Restored) ---
    const getHeaderInfo = () => {
        switch(currentStep) {
            case 1: return { title: "Let's get started!", sub: "First, tell us a bit about your academic background." };
            case 2: return { title: "Show off your stats", sub: "Connect your coding platform accounts to track progress." };
            case 3: return { title: "What are you good at?", sub: "List your technical skills and interests." };
            case 4: return { title: "Where can people find you?", sub: "Add your social links for your public profile." };
            case 5: return { title: "The final touch", sub: "Write a short bio to introduce yourself." };
            default: return { title: "Welcome", sub: "" };
        }
    };

    const headerInfo = getHeaderInfo();

    const renderStepContent = () => {
        let content;

        switch (currentStep) {
            case 1:
                content = (
                    <>
                        <div className={styles.inputGroup}>
                            <label>Name *</label>
                            <input type="text" value={data.name} onChange={(e) => handleChange('name', e.target.value)} required />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Phone *</label>
                            <input type="text" value={data.phone} onChange={(e) => handleChange('phone', e.target.value)} placeholder="e.g., 9876543210" required />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Department *</label>
                            <select value={data.department} onChange={(e) => handleChange('department', e.target.value)} required>
                                <option>Computer Science & Engineering</option>
                                <option>Information Technology</option>
                                <option>Electronics & Communication</option>
                                <option>Mechanical Engineering</option>
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Roll Number *</label>
                            <input type="text" value={data.rollNumber} onChange={(e) => handleChange('rollNumber', e.target.value)} required />
                        </div>
                        <div className={styles.row}>
                            <div className={styles.inputGroup}>
                                <label>Section *</label>
                                <select value={data.section} onChange={(e) => handleChange('section', e.target.value)} required>
                                    <option>Section A</option>
                                    <option>Section B</option>
                                    <option>Section C</option>
                                    <option>Section G</option>
                                </select>
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Graduation Year *</label>
                                <input type="text" value={data.graduationYear} onChange={(e) => handleChange('graduationYear', e.target.value)} placeholder="2027" required />
                            </div>
                        </div>
                    </>
                );
                break;
            case 2:
                content = (
                    <>
                        <div className={styles.infoBox}>
                            <RiCheckLine /> All platform usernames are optional but recommended.
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.iconLabel}><SiLeetcode color="#FFA116"/> LeetCode</label>
                            <input type="text" value={data.leetCode} onChange={(e) => handleChange('leetCode', e.target.value)} placeholder="username" />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.iconLabel}><SiCodeforces color="#1F8ACB"/> Codeforces</label>
                            <input type="text" value={data.codeforces} onChange={(e) => handleChange('codeforces', e.target.value)} placeholder="handle" />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.iconLabel}><SiCodechef color="#5B4638"/> CodeChef</label>
                            <input type="text" value={data.codeChef} onChange={(e) => handleChange('codeChef', e.target.value)} placeholder="username" />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.iconLabel}><SiHackerrank color="#2EC866"/> HackerRank</label>
                            <input type="text" value={data.hackerRank} onChange={(e) => handleChange('hackerRank', e.target.value)} placeholder="username" />
                        </div>
                    </>
                );
                break;
            case 3:
                content = (
                    <>
                        <div className={styles.inputGroup}>
                            <label>Primary Skills</label>
                            <div className={styles.tagContainer}>
                                {data.skills.map((tag, idx) => (
                                    <span key={idx} className={styles.tag}>{tag} <RiCloseCircleFill onClick={() => removeTag('skills', tag)}/></span>
                                ))}
                                <input 
                                    type="text" 
                                    placeholder="Type and press Enter..." 
                                    className={styles.tagInput} 
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    onKeyDown={(e) => handleTagKeyDown(e, 'skills', skillInput, setSkillInput)}
                                />
                            </div>
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Interests</label>
                            <div className={styles.tagContainer}>
                                {data.interests.map((tag, idx) => (
                                    <span key={idx} className={styles.tag}>{tag} <RiCloseCircleFill onClick={() => removeTag('interests', tag)}/></span>
                                ))}
                                <input 
                                    type="text" 
                                    placeholder="Type and press Enter..." 
                                    className={styles.tagInput} 
                                    value={interestInput}
                                    onChange={(e) => setInterestInput(e.target.value)}
                                    onKeyDown={(e) => handleTagKeyDown(e, 'interests', interestInput, setInterestInput)}
                                />
                            </div>
                        </div>
                    </>
                );
                break;
            case 4:
                content = (
                    <>
                        <div className={styles.inputGroup}>
                            <label>LinkedIn URL</label>
                            <input type="text" value={data.linkedinUrl} onChange={(e) => handleChange('linkedinUrl', e.target.value)} placeholder="https://linkedin.com/in/..." />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>GitHub Username</label>
                            <input type="text" value={data.githubUsername} onChange={(e) => handleChange('githubUsername', e.target.value)} placeholder="username" />
                        </div>
                    </>
                );
                break;
            case 5:
                content = (
                    <div className={styles.aboutWrapper}>
                        <label className={styles.floatingLabel}>About</label>
                        <textarea 
                            className={styles.aboutArea} 
                            value={data.about} 
                            onChange={(e) => handleChange('about', e.target.value)}
                            placeholder="Tell us about yourself..."
                        ></textarea>
                    </div>
                );
                break;
            default: return null;
        }

        // Animation Wrapper
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
            <form className={styles.card} onSubmit={(e) => e.preventDefault()}>
                <div className={styles.header}>
                    
                    {/* Dynamic Header Title & Subtitle */}
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2>{headerInfo.title}</h2>
                        <p className={styles.subtitle}>{headerInfo.sub}</p>
                    </motion.div>
                    
                    {/* Segmented Progress Bar */}
                    <div className={styles.progressContainer}>
                        <div className={styles.segmentedBar}>
                            {[1, 2, 3, 4, 5].map((item) => (
                                <div 
                                    key={item} 
                                    className={`${styles.segment} ${item <= currentStep ? styles.activeSegment : ''}`}
                                ></div>
                            ))}
                        </div>
                        <span className={styles.stepCount}>Step {currentStep} of 5</span>
                    </div>
                </div>

                {renderStepContent()}

                <div className={styles.footer}>
                    {currentStep > 1 ? (
                        <button className={styles.backBtn} onClick={handleBack}>
                            <RiArrowLeftLine /> Back
                        </button>
                    ) : (
                        <div></div> /* Spacer */
                    )}

                    {currentStep < 5 ? (
                        <button className={styles.nextBtn} onClick={handleNext}>
                            Continue <RiArrowRightLine />
                        </button>
                    ) : (
                        <button className={styles.finishBtn} onClick={handleCompleteSetup} disabled={loading}>
                            {loading ? 'Saving...' : 'Finish & Go to Dashboard'}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default OnboardingPage;