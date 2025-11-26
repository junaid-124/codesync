import React, { useState } from 'react';
import styles from './ProfileSetupForm.module.css';

// UI Icons
import { 
    RiCheckLine, 
    RiArrowRightLine,
    RiCloseCircleFill 
} from 'react-icons/ri'; 

// Brand Icons (Simple Icons)
import { 
    SiLeetcode, 
    SiCodeforces, 
    SiCodechef, 
    SiHackerrank, 
    SiGeeksforgeeks 
} from 'react-icons/si';

// --- SUGGESTION DATA ---
const commonSkills = ['JavaScript', 'TypeScript', 'React', 'Angular', 'Vue.js', 'Node.js', 'Express', 'Python', 'Java', 'C++', 'Go', 'SQL', 'MongoDB', 'PostgreSQL', 'HTML', 'CSS', 'Docker'];
const commonInterests = ['Web Development', 'Mobile Development', 'Game Development', 'Data Science', 'Machine Learning', 'Artificial Intelligence', 'Cloud Computing', 'Cybersecurity', 'Open Source', 'Startups'];

// --- INITIAL FORM DATA ---
const initialData = {
    name: 'BEESA MANISH B',
    phone: '6301055280',
    department: 'Computer Science & Engineering',
    rollNumber: '23R21A05C9',
    section: 'Section G',
    graduationYear: '2027',
    leetCode: 'manishbeesa05',
    codeforces: 'manishbeesa05',
    codeChef: 'manishbeesa05',
    hackerRank: 'MANISH_BEESA',
    geeksForGeeks: 'manishbeesa0elt',
    skills: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'Python', 'Java', 'HTML', 'CSS', 'C++', 'MySQL'],
    interests: ['Full Stack Development', 'Machine Learning', 'Startups', 'Open Source'],
    linkedinUrl: 'www.linkedin.com/in/manish-beesa-64308723',
    githubUsername: 'MANISH-BEESA',
    about: "My name is Manish Beesa, and I am currently pursuing a Bachelor of Technology (B.Tech) degree at MLR Institute of Technology, specializing in Computer Science I am expected to graduate in 2027. I enjoy solving real-world problems through code and continuously strive to improve my technical and analytical skills. I'm also actively involved in coding communities and always eager to collaborate on innovative tech projects.",
};

const steps = [
    { id: 1, name: 'Basic Information' },
    { id: 2, name: 'Coding Platforms' },
    { id: 3, name: 'Skills & Interests' },
    { id: 4, name: 'Social Media' },
    { id: 5, name: 'About Yourself' },
];

const ProfileSetupForm: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [data, setData] = useState(initialData);
    
    const [showSkillsSuggestions, setShowSkillsSuggestions] = useState(false);
    const [showInterestsSuggestions, setShowInterestsSuggestions] = useState(false);
    
    type DataKey = 'skills' | 'interests';

    const addTag = (type: DataKey, tag: string) => {
        if (!data[type].includes(tag)) {
            setData(prev => ({ ...prev, [type]: [...prev[type], tag] }));
        }
    };
    
    const removeTag = (type: DataKey, tag: string) => {
        setData(prev => ({ ...prev, [type]: prev[type].filter(t => t !== tag) }));
    };

    const handleContinue = () => {
        if (currentStep < steps.length) setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const renderContent = () => {
        const filteredSkills = commonSkills.filter(s => !data.skills.includes(s));
        const filteredInterests = commonInterests.filter(i => !data.interests.includes(i));
        
        switch (currentStep) {
            case 1:
                return (
                    <div className={styles.formSection}>
                        <div className={styles.inputGroupGrid}>
                            <div className={styles.inputContainer}>
                                <label>Name *</label>
                                <input type="text" defaultValue={data.name} required />
                            </div>
                            <div className={styles.inputContainer}>
                                <label>Phone *</label>
                                <input type="text" defaultValue={data.phone} required />
                                <small>Enter exactly 10 digits (e.g., 9876543210)</small>
                            </div>
                            <div className={styles.inputContainer}>
                                <label>Department *</label>
                                <select defaultValue={data.department} required>
                                    <option>{data.department}</option>
                                </select>
                            </div>
                            <div className={styles.inputContainer}>
                                <label>Roll Number *</label>
                                <input type="text" defaultValue={data.rollNumber} required />
                            </div>
                            <div className={styles.inputContainer}>
                                <label>Section *</label>
                                <select defaultValue={data.section} required>
                                    <option>{data.section}</option>
                                </select>
                                <small>Select your class section (required)</small>
                            </div>
                            <div className={styles.inputContainer}>
                                <label>Graduation Year *</label>
                                <input type="text" defaultValue={data.graduationYear} required />
                            </div>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className={styles.formSection}>
                        <p className={styles.descText}>Connect your coding platform accounts to track your progress</p>
                        <p className={styles.infoText}>
                            Enter your usernames for coding platforms and click Save. All platform usernames are required.
                        </p>
                        
                        <div className={styles.successMessage}>
                            <div className={styles.successIconWrapper}><RiCheckLine /></div>
                            <span>All platform usernames have been successfully saved! You can now continue.</span>
                        </div>

                        <div className={styles.inputGroupGrid}>
                            <div className={styles.inputContainer}>
                                <label className={styles.platformLabel}>LeetCode Username</label>
                                <div className={styles.iconInputWrapper}>
                                    <span className={styles.inputIcon}>
                                        <SiLeetcode color="#FFA116" />
                                    </span>
                                    <input type="text" defaultValue={data.leetCode} />
                                </div>
                                <small>Your LeetCode username</small>
                            </div>
                            <div className={styles.inputContainer}>
                                <label className={styles.platformLabel}>Codeforces Username</label>
                                <div className={styles.iconInputWrapper}>
                                    <span className={styles.inputIcon}>
                                        <SiCodeforces color="#1F8ACB" />
                                    </span>
                                    <input type="text" defaultValue={data.codeforces} />
                                </div>
                                <small>Your Codeforces handle</small>
                            </div>
                            <div className={styles.inputContainer}>
                                <label className={styles.platformLabel}>CodeChef Username</label>
                                <div className={styles.iconInputWrapper}>
                                    <span className={styles.inputIcon}>
                                        <SiCodechef color="#5B4638" />
                                    </span>
                                    <input type="text" defaultValue={data.codeChef} />
                                </div>
                                <small>Your CodeChef username</small>
                            </div>
                            <div className={styles.inputContainer}>
                                <label className={styles.platformLabel}>HackerRank Username</label>
                                <div className={styles.iconInputWrapper}>
                                    <span className={styles.inputIcon}>
                                        <SiHackerrank color="#2EC866" />
                                    </span>
                                    <input type="text" defaultValue={data.hackerRank} />
                                </div>
                                <small>Your HackerRank username</small>
                            </div>
                            <div className={styles.inputContainer} style={{ gridColumn: '1 / -1' }}>
                                <label className={styles.platformLabel}>GeeksforGeeks Username</label>
                                <div className={styles.iconInputWrapper}>
                                    <span className={styles.inputIcon}>
                                        <SiGeeksforgeeks color="#2F8D46" />
                                    </span>
                                    <input type="text" defaultValue={data.geeksForGeeks} />
                                </div>
                                <small>Your GeeksForGeeks username</small>
                            </div>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className={styles.formSection}>
                        <p className={styles.descText}>Tell us about your skills and interests</p>
                        <div className={styles.inputGroupGrid}>
                            <div className={styles.inputContainer}>
                                <label>Skills</label>
                                <div className={styles.tagInputContainer}
                                     onFocus={() => setShowSkillsSuggestions(true)}
                                     onBlur={() => setTimeout(() => setShowSkillsSuggestions(false), 200)}>
                                    
                                    {data.skills.map((tag, index) => (
                                        <span key={index} className={styles.tagChip}>
                                            {tag} 
                                            <RiCloseCircleFill className={styles.removeTagIcon} onClick={() => removeTag('skills', tag)} />
                                        </span>
                                    ))}
                                    <input type="text" placeholder="Add skills and press enter" className={styles.tagInput} />
                                    
                                    {showSkillsSuggestions && (
                                        <div className={styles.suggestionsDropdown}>
                                            {filteredSkills.map(s => (
                                                <div key={s} className={styles.suggestionItem} onMouseDown={(e) => { e.preventDefault(); addTag('skills', s); }}>
                                                    {s}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <small>Enter your skills and press Enter or select from suggestions</small>
                            </div>
                            
                            <div className={styles.inputContainer}>
                                <label>Interests</label>
                                <div className={styles.tagInputContainer}
                                     onFocus={() => setShowInterestsSuggestions(true)}
                                     onBlur={() => setTimeout(() => setShowInterestsSuggestions(false), 200)}>
                                    
                                    {data.interests.map((tag, index) => (
                                        <span key={index} className={styles.tagChip}>
                                            {tag} 
                                            <RiCloseCircleFill className={styles.removeTagIcon} onClick={() => removeTag('interests', tag)} />
                                        </span>
                                    ))}
                                    <input type="text" placeholder="Add interests and press enter" className={styles.tagInput} />
                                    
                                    {showInterestsSuggestions && (
                                        <div className={styles.suggestionsDropdown}>
                                            {filteredInterests.map(s => (
                                                <div key={s} className={styles.suggestionItem} onMouseDown={(e) => { e.preventDefault(); addTag('interests', s); }}>
                                                    {s}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <small>Enter your interests and press Enter or select from suggestions</small>
                            </div>
                        </div>
                    </div>
                );

            case 4:
                return (
                    <div className={styles.formSection}>
                        <p className={styles.descText}>Add your social media links. For GitHub, please enter your username only (not the full URL).</p>
                        <div className={styles.inputGroupGrid}>
                            <div className={styles.inputContainer}>
                                <label>LinkedIn URL</label>
                                <input type="text" defaultValue={data.linkedinUrl} />
                            </div>
                            <div className={styles.inputContainer}>
                                <label>GitHub Username *</label>
                                <input type="text" defaultValue={data.githubUsername} required />
                                <small>Enter your GitHub username (required)</small>
                            </div>
                        </div>
                    </div>
                );

            case 5:
                return (
                    <div className={styles.formSection}>
                        <p className={styles.descText}>Add a short bio about yourself</p>
                        
                        {/* Exact 'About' box replication with floating label on border */}
                        <div className={styles.aboutContainer}>
                            <label className={styles.aboutLabel}>About</label>
                            <textarea 
                                className={styles.aboutTextarea} 
                                defaultValue={data.about}
                                spellCheck={false}
                            ></textarea>
                        </div>
                    </div>
                );
            default: return null;
        }
    };

    const isStepDone = (stepId: number) => stepId < currentStep;

    return (
        <div className={styles.overlay}>
            <div className={styles.modalContainer}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Complete Your Profile</h2>
                    <p className={styles.subtitle}>Please complete your profile information to continue. This will help us provide a better experience.</p>
                </div>

                <div className={styles.contentGrid}>
                    
                    {/* Sidebar */}
                    <div className={styles.sidebar}>
                        {steps.map((step) => {
                            const isActive = step.id === currentStep;
                            const isDone = isStepDone(step.id);
                            
                            return (
                                <div 
                                    key={step.id} 
                                    className={`${styles.stepItem} ${isActive ? styles.active : ''} ${isDone ? styles.done : ''}`}
                                >
                                    <div className={styles.stepIndicator}>
                                        <div className={styles.stepCircle}>
                                            {isDone ? <RiCheckLine size={16} /> : step.id}
                                        </div>
                                    </div>
                                    <div className={styles.stepName}>{step.name}</div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Content */}
                    <div className={styles.formContent}>
                        {renderContent()}

                        <div className={styles.actionButtons}>
                            {currentStep === 5 ? (
                                <button className={styles.completeBtn}>Complete Setup</button>
                            ) : (
                                <>
                                    <button className={styles.continueBtn} onClick={handleContinue}>
                                        Continue <RiArrowRightLine />
                                    </button>
                                    {currentStep > 1 && (
                                        <button className={styles.backBtn} onClick={handleBack}>Back</button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSetupForm;