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
    SiGeeksforgeeks,
    SiHackerearth,
    SiCoder,
    SiCodingninjas
} from 'react-icons/si';

// --- SUGGESTION DATA ---
const commonSkills = ['JavaScript', 'TypeScript', 'React', 'Angular', 'Vue.js', 'Node.js', 'Express', 'Python', 'Java', 'C++', 'Go', 'SQL', 'MongoDB', 'PostgreSQL', 'HTML', 'CSS', 'Docker'];
const commonInterests = ['Web Development', 'Mobile Development', 'Game Development', 'Data Science', 'Machine Learning', 'Artificial Intelligence', 'Cloud Computing', 'Cybersecurity', 'Open Source', 'Startups'];

// --- INITIAL FORM DATA ---
const initialData = {
    name: 'BEESA MANISH B',
    phone: '6301055280',
    department: 'CSE',
    rollNumber: '23R21A05C9',
    section: 'A',
    graduationYear: '2027',
    leetCode: 'manishbeesa05',
    codeforces: 'manishbeesa05',
    codeChef: 'manishbeesa05',
    hackerRank: 'MANISH_BEESA',
    geeksForGeeks: 'manishbeesa0elt',
    hackerEarth: 'manishbeesa05',
    atcoder: 'manishbeesa05',
    code360: 'manishbeesa05',
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

const departments = [
    "CSE", "CSE-AIML", "CSE-DS", "CSE-IoT",
    "CSIT", "IT", "ECE", "EEE", "MECH", "CIVIL"
];

const sections = ["A", "B", "C", "D"];

const ProfileSetupForm: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [data, setData] = useState(initialData);
    
    const [showSkillsSuggestions, setShowSkillsSuggestions] = useState(false);
    const [showInterestsSuggestions, setShowInterestsSuggestions] = useState(false);
    
    type DataKey = 'skills' | 'interests';

    const addTag = (type: DataKey, tag: string) => {
        const trimmed = tag?.trim();
        if (!trimmed) return;
        if (!data[type].includes(trimmed)) {
            setData(prev => ({ ...prev, [type]: [...prev[type], trimmed] }));
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

    const updateField = (field: string, value: any) => {
        setData(prev => ({ ...prev, [field]: value }));
    };

    const renderContent = () => {
        const filteredSkills = commonSkills.filter(s => !data.skills.includes(s));
        const filteredInterests = commonInterests.filter(i => !data.interests.includes(i));
        
        switch (currentStep) {

            /* -----------------------------------------------------
                STEP 1 — BASIC INFORMATION
            ----------------------------------------------------- */
            case 1:
                return (
                    <div className={styles.formSection}>
                        <div className={styles.inputGroupGrid}>
                            
                            <div className={styles.inputContainer}>
                                <label>Name *</label>
                                <input
                                  type="text"
                                  value={data.name}
                                  onChange={(e) => updateField('name', e.target.value)}
                                  required
                                />
                            </div>

                            <div className={styles.inputContainer}>
                                <label>Phone *</label>
                                <input
                                  type="text"
                                  value={data.phone}
                                  onChange={(e) => updateField('phone', e.target.value)}
                                  required
                                />
                                <small>Enter exactly 10 digits (e.g., 9876543210)</small>
                            </div>

                            <div className={styles.inputContainer}>
                                <label>Department *</label>
                                <select
                                  value={data.department}
                                  onChange={(e) => {
                                      const dept = e.target.value;
                                      setData(prev => ({
                                          ...prev,
                                          department: dept,
                                          section: ['CSE', 'IT'].includes(dept) ? prev.section || 'A' : ''
                                      }));
                                  }}
                                  required
                                >
                                    {departments.map((d) => (
                                        <option key={d} value={d}>{d}</option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.inputContainer}>
                                <label>Roll Number *</label>
                                <input
                                  type="text"
                                  value={data.rollNumber}
                                  onChange={(e) => updateField('rollNumber', e.target.value)}
                                  required
                                />
                            </div>

                            {['CSE', 'IT'].includes(data.department) && (
                                <div className={styles.inputContainer}>
                                    <label>Section *</label>
                                    <select
                                      value={data.section}
                                      onChange={(e) => updateField('section', e.target.value)}
                                      required
                                    >
                                        {sections.map((s) => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                    <small>Select your class section (required)</small>
                                </div>
                            )}

                            <div className={styles.inputContainer}>
                                <label>Graduation Year *</label>
                                <input
                                  type="text"
                                  value={data.graduationYear}
                                  onChange={(e) => updateField('graduationYear', e.target.value)}
                                  required
                                />
                            </div>
                        </div>
                    </div>
                );

            /* -----------------------------------------------------
                STEP 2 — CODING PLATFORMS
            ----------------------------------------------------- */
            case 2:
                return (
                    <div className={styles.formSection}>

                        <p className={styles.descText}>Connect your coding platform accounts to track your progress</p>
                        <p className={styles.infoText}>
                            Enter your usernames for coding platforms. All platform usernames are required.
                        </p>

                        <div className={styles.successMessage}>
                            <div className={styles.successIconWrapper}><RiCheckLine /></div>
                            <span>All platform usernames saved successfully!</span>
                        </div>

                        <div className={styles.platformGrid}>

                            {/* LEETCODE */}
                            <div className={styles.platformItem}>
                                <label>LeetCode</label>
                                <div className={styles.iconInputWrapper} data-abs="true">
                                    <span className={styles.inputIcon}><SiLeetcode color="#FFA116" /></span>
                                    <input
                                      type="text"
                                      value={data.leetCode}
                                      onChange={(e) => updateField('leetCode', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* CODEFORCES */}
                            <div className={styles.platformItem}>
                                <label>Codeforces</label>
                                <div className={styles.iconInputWrapper} data-abs="true">
                                    <span className={styles.inputIcon}><SiCodeforces color="#1F8ACB" /></span>
                                    <input
                                      type="text"
                                      value={data.codeforces}
                                      onChange={(e) => updateField('codeforces', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* CODECHEF */}
                            <div className={styles.platformItem}>
                                <label>CodeChef</label>
                                <div className={styles.iconInputWrapper} data-abs="true">
                                    <span className={styles.inputIcon}><SiCodechef color="#5B4638" /></span>
                                    <input
                                      type="text"
                                      value={data.codeChef}
                                      onChange={(e) => updateField('codeChef', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* HACKERRANK */}
                            <div className={styles.platformItem}>
                                <label>HackerRank</label>
                                <div className={styles.iconInputWrapper} data-abs="true">
                                    <span className={styles.inputIcon}><SiHackerrank color="#00EA64" /></span>
                                    <input
                                      type="text"
                                      value={data.hackerRank}
                                      onChange={(e) => updateField('hackerRank', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* HACKEREARTH */}
                            <div className={styles.platformItem}>
                                <label>HackerEarth</label>
                                <div className={styles.iconInputWrapper} data-abs="true">
                                    <span className={styles.inputIcon}><SiHackerearth color="#2C6CF7" /></span>
                                    <input
                                      type="text"
                                      value={data.hackerEarth}
                                      onChange={(e) => updateField('hackerEarth', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* ATCODER */}
                            <div className={styles.platformItem}>
                                <label>AtCoder</label>
                                <div className={styles.iconInputWrapper} data-abs="true">
                                    <span className={styles.inputIcon}><SiCoder color="#1F8ACB" /></span>
                                    <input
                                      type="text"
                                      value={data.atcoder}
                                      onChange={(e) => updateField('atcoder', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* CODE360 */}
                            <div className={styles.platformItem}>
                                <label>Code360</label>
                                <div className={styles.iconInputWrapper} data-abs="true">
                                    <span className={styles.inputIcon}><SiCodingninjas color="#FF6D00" /></span>
                                    <input
                                      type="text"
                                      value={data.code360}
                                      onChange={(e) => updateField('code360', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* GFG (Full Width) */}
                            <div className={styles.platformFullWidth}>
                                <label>GeeksforGeeks</label>
                                <div className={styles.iconInputWrapper} data-abs="true">
                                    <span className={styles.inputIcon}><SiGeeksforgeeks color="#2F8D46" /></span>
                                    <input
                                      type="text"
                                      value={data.geeksForGeeks}
                                      onChange={(e) => updateField('geeksForGeeks', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );

            /* -----------------------------------------------------
                STEP 3 — SKILLS & INTERESTS
            ----------------------------------------------------- */
            case 3:
                return (
                    <div className={styles.formSection}>
                        <p className={styles.descText}>Tell us about your skills and interests</p>
                        <div className={styles.inputGroupGrid}>

                            {/* SKILLS */}
                            <div className={styles.inputContainer}>
                                <label>Skills</label>
                                <div className={styles.tagInputContainer}
                                     onFocus={() => setShowSkillsSuggestions(true)}
                                     onBlur={() => setTimeout(() => setShowSkillsSuggestions(false), 150)}>
                                    
                                    {data.skills.map((tag, index) => (
                                        <span key={index} className={styles.tagChip}>
                                            {tag} 
                                            <RiCloseCircleFill className={styles.removeTagIcon} onClick={() => removeTag('skills', tag)} />
                                        </span>
                                    ))}

                                    <input
                                        type="text"
                                        placeholder="Add skills and press enter"
                                        className={styles.tagInput}
                                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                const value = (e.target as HTMLInputElement).value;
                                                addTag('skills', value);
                                                (e.target as HTMLInputElement).value = '';
                                            }
                                        }}
                                    />
                                    
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

                            {/* INTERESTS */}
                            <div className={styles.inputContainer}>
                                <label>Interests</label>
                                <div className={styles.tagInputContainer}
                                     onFocus={() => setShowInterestsSuggestions(true)}
                                     onBlur={() => setTimeout(() => setShowInterestsSuggestions(false), 150)}>
                                    
                                    {data.interests.map((tag, index) => (
                                        <span key={index} className={styles.tagChip}>
                                            {tag} 
                                            <RiCloseCircleFill className={styles.removeTagIcon} onClick={() => removeTag('interests', tag)} />
                                        </span>
                                    ))}

                                    <input
                                        type="text"
                                        placeholder="Add interests and press enter"
                                        className={styles.tagInput}
                                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                const value = (e.target as HTMLInputElement).value;
                                                addTag('interests', value);
                                                (e.target as HTMLInputElement).value = '';
                                            }
                                        }}
                                    />
                                    
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

            /* -----------------------------------------------------
                STEP 4 — SOCIAL MEDIA
            ----------------------------------------------------- */
            case 4:
                return (
                    <div className={styles.formSection}>
                        <p className={styles.descText}>
                            Add your social media links.  
                            For GitHub, please enter your username only (not the full URL).
                        </p>

                        <div className={styles.inputGroupGrid}>
                            <div className={styles.inputContainer}>
                                <label>LinkedIn URL</label>
                                <input
                                  type="text"
                                  value={data.linkedinUrl}
                                  onChange={(e) => updateField('linkedinUrl', e.target.value)}
                                />
                            </div>

                            <div className={styles.inputContainer}>
                                <label>GitHub Username *</label>
                                <input
                                  type="text"
                                  value={data.githubUsername}
                                  onChange={(e) => updateField('githubUsername', e.target.value)}
                                  required
                                />
                                <small>Enter your GitHub username (required)</small>
                            </div>
                        </div>
                    </div>
                );

            /* -----------------------------------------------------
                STEP 5 — ABOUT YOURSELF
            ----------------------------------------------------- */
            case 5:
                return (
                    <div className={styles.formSection}>

                        <p className={styles.descText}>Add a short bio about yourself</p>

                        <div className={styles.aboutContainer}>
                            <label className={styles.aboutLabel}>About</label>
                            <textarea 
                                className={styles.aboutTextarea} 
                                value={data.about}
                                onChange={(e) => updateField('about', e.target.value)}
                                spellCheck={false}
                            ></textarea>
                        </div>

                    </div>
                );

            default: 
                return null;
        }
    };

    const isStepDone = (stepId: number) => stepId < currentStep;

    return (
        <div className={styles.overlay}>
            <div className={styles.modalContainer}>

                <div className={styles.header}>
                    <h2 className={styles.title}>Complete Your Profile</h2>
                    <p className={styles.subtitle}>
                        Please complete your profile information to continue.  
                        This will help us provide a better experience.
                    </p>
                </div>

                <div className={styles.contentGrid}>

                    {/* LEFT SIDEBAR */}
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

                    {/* RIGHT: FORM CONTENT */}
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
