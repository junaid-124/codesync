// frontend/src/pages/StudentProfilePage/StudentProfile.tsx

import React, { useState } from 'react';
import styles from './StudentProfilePage.module.css';

// --- TYPE DEFINITIONS & MOCK DATA STRUCTURE ---

interface CodingProfile {
    platform: string;
    username: string;
    link: string;
}

interface GithubStats {
    publicRepos: number;
    totalCommits: number;
    stars: number;
    followers: number;
}

interface Achievement {
    type: 'Projects' | 'Internships' | 'Certifications' | 'Achievements';
    title: string;
}

interface ProfileData {
    name: string;
    avatarUrl: string;
    department: string;
    section: string;
    score: number;
    about: string;
    email: string;
    contact: string;
    year: string;
    skills: string[];
    interests: string[];
    codingProfiles: CodingProfile[];
    githubStats: GithubStats;
    contributions: {
        total: number;
        currentStreak: number;
        longestStreak: number;
    };
    achievements: Achievement[];
}

// NOTE: This mock data should be moved to mockProfiles.ts in a real setup.
const mockProfileData: ProfileData = {
    name: "AVUTHU KUSHWANT KUMAR REDDY",
    avatarUrl: "https://i.imgur.com/8N6D4B87.png",
    department: "CSM",
    section: "C",
    score: 191541,
    about: "Carve your own niche.",
    email: "zzyy.kushwant@gmail.in",
    contact: "94XX-XX-48180",
    year: "Third",
    skills: ["Javascript", "TypeScript", "React", "Node.js", "MongoDB"],
    interests: ["Startups", "Cloud Computing", "AI/ML"],
    codingProfiles: [
        { platform: "LeetCode", username: "kush_lc", link: "#" },
        { platform: "CodeChef", username: "rushkwr32", link: "#" },
        { platform: "HackerRank", username: "rushkwr32", link: "#" },
        { platform: "CodeForces", username: "kushwant", link: "#" },
        { platform: "GitHub", username: "kushwantar", link: "#" },
        { platform: "GeeksForGeeks", username: "user123", link: "#" },
    ],
    githubStats: {
        publicRepos: 0,
        totalCommits: 0,
        stars: 0,
        followers: 0,
    },
    contributions: {
        total: 315,
        currentStreak: 0,
        longestStreak: 6,
    },
    achievements: [],
};


// --- COMPONENT IMPLEMENTATION ---

const StudentProfile: React.FC = () => {
    const data = mockProfileData;
    const [codingTab, setCodingTab] = useState('Overall Score');
    const [achievementsTab, setAchievementsTab] = useState('Projects');

    const renderTabs = (tabs: string[], activeTab: string, setActiveTab: (tab: string) => void) => (
        <div className={styles.tabContainer}>
            {tabs.map(tab => (
                <button
                    key={tab}
                    className={`${styles.tabButton} ${activeTab === tab ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab(tab)}
                >
                    {tab}
                </button>
            ))}
        </div>
    );

    const AchievementTabs = ['Projects', 'Internships', 'Certifications', 'Achievements'];
    const CodingTabs = ['Overall Score', 'Problems Solved', 'Contests', 'Rating'];
    const SocialIcons = (
        <>
            <a href="#" className={styles.socialIcon} aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M22.23 0H1.77C.79 0 0 .774 0 1.729v20.542C0 23.227.79 24 1.77 24h20.46c.98 0 1.77-.773 1.77-1.729V1.729C24 .774 23.21 0 22.23 0zM7.18 20.45h-3.56V10.95h3.56v9.5zM5.36 7.68c-1.05 0-1.9-.85-1.9-1.9s.85-1.9 1.9-1.9 1.9.85 1.9 1.9-.85 1.9-1.9 1.9zM20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.84-3.04-1.85 0-2.12 1.45-2.12 2.94v5.67h-3.58v-9.5h3.42v1.56c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.23z"/></svg>
            </a>
            <a href="#" className={styles.socialIcon} aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.287-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.332-1.756-1.332-1.756-1.087-.743.082-.728.082-.728 1.205.084 1.838 1.238 1.838 1.238 1.07 1.835 2.809 1.305 3.495.998.108-.77.42-1.305.762-1.604-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3-1.22.96.26 1.98.39 3 .395 1.02-.005 2.04-.135 3-.395 2.292.898 3.3 1.22 3.3 1.22.645 1.653.24 2.873.105 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.805 5.62-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.897-.015 3.28 0 .322.21.697.825.575C20.565 22.094 24 17.59 24 12.297c0-6.627-5.37-12-12-12z"/></svg>
            </a>
        </>
    );

    return (
        <div className={styles.container}>
            
            {/* 1. PROFILE HEADER CARD */}
            <header className={styles.profileHeaderCard}>
                <div className={styles.headerBlueStrip}></div>
                <div className={styles.headerContent}>
                    <img src={data.avatarUrl} alt={data.name} className={styles.avatar} />

                    <div className={styles.profileInfo}>
                        <h2>{data.name}</h2>
                        <p>{data.department} • {data.section}</p>
                        <div className={styles.scoreGroup}>
                            <p className={styles.scoreLabel}>Score</p>
                            <p className={styles.scoreValue}>{data.score.toLocaleString()}</p>
                        </div>
                    </div>
                    
                    <div className={styles.socialLinks}>
                        {SocialIcons}
                    </div>
                </div>
            </header>

            <div className={styles.profileContentGrid}>
                
                {/* 2. LEFT SIDEBAR */}
                <div className={styles.sidebar}>
                    
                    {/* About Section */}
                    <section className={styles.cardBase}>
                        <h3>About</h3>
                        <p className={styles.aboutText}>{data.about}</p>
                    </section>

                    {/* Coding Profiles List */}
                    <section className={styles.cardBase}>
                        <h3>Coding Profiles</h3>
                        <div className={styles.codingProfilesList}>
                            {data.codingProfiles.map(p => (
                                <div key={p.platform} className={styles.profileItem}>
                                    <span className={styles.profilePlatform}>{p.platform}</span>
                                    <a href={p.link} target="_blank" rel="noopener noreferrer" className={styles.profileUsername}>
                                        {p.username}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </section>
                    
                    {/* Details Card */}
                    <section className={styles.cardBase}>
                        <h3>Details</h3>
                        <div className={styles.detailsGrid}>
                            <div className={styles.detailItem}><span>Email:</span> <span className={styles.detailValue}>{data.email}</span></div>
                            <div className={styles.detailItem}><span>Dept:</span> <span className={styles.detailValue}>{data.department}</span></div>
                            <div className={styles.detailItem}><span>Section:</span> <span className={styles.detailValue}>{data.section}</span></div>
                            <div className={styles.detailItem}><span>Year:</span> <span className={styles.detailValue}>{data.year}</span></div>
                            <div className={styles.detailItem}><span>Contact:</span> <span className={styles.detailValue}>{data.contact}</span></div>
                        </div>
                    </section>
                    
                    {/* Skills */}
                    <section className={styles.cardBase}>
                        <h3>Skills</h3>
                        <div className={styles.tagsContainer}>
                            {data.skills.map(skill => (
                                <span key={skill} className={styles.tag}>{skill}</span>
                            ))}
                        </div>
                    </section>
                    
                    {/* Interests */}
                    <section className={styles.cardBase}>
                        <h3>Interests</h3>
                        <div className={styles.tagsContainer}>
                            {data.interests.map(interest => (
                                <span key={interest} className={styles.tag}>{interest}</span>
                            ))}
                        </div>
                    </section>

                </div>

                {/* 3. MAIN CONTENT AREA */}
                <div className={styles.mainContent}>
                    
                    {/* Coding Profiles Section */}
                    <section className={styles.mainCard}>
                        <h3>Coding Profiles</h3>
                        {renderTabs(CodingTabs, codingTab, setCodingTab)}

                        <div className={styles.codingChartArea}>
                            {codingTab === 'Overall Score' && (
                                <div className={styles.overallScoreContent}>
                                    {/* Donut Chart Placeholder */}
                                    <div className={styles.donutChartPlaceholder}>
                                        <div className={styles.donutRing}>
                                            <div className={styles.donutCenter}>
                                                <p className={styles.chartScore}>{data.score.toLocaleString()}</p>
                                                <p className={styles.chartLabel}>Total Score</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Legend and Platforms */}
                                    <div className={styles.chartLegend}>
                                        {data.codingProfiles.slice(0, 4).map((p, index) => (
                                            <div key={p.platform} className={styles.legendItem}>
                                                <span className={`${styles.legendDot} ${styles[`platform${index + 1}`]}`}></span>
                                                {p.platform}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                    
                    {/* GitHub Stats Grid */}
                    <section className={styles.mainCard}>
                        <h3>GitHub Stats</h3>
                        <div className={styles.statsGrid}>
                            <div className={styles.statBox}>
                                <span className={styles.statValuePrimary}>{data.githubStats.publicRepos.toLocaleString()}</span>
                                <span className={styles.statLabelMuted}>Public Repos</span>
                            </div>
                            <div className={styles.statBox}>
                                <span className={styles.statValuePrimary}>{data.githubStats.totalCommits.toLocaleString()}</span>
                                <span className={styles.statLabelMuted}>Total Commits</span>
                            </div>
                            <div className={styles.statBox}>
                                <span className={styles.statValuePrimary}>{data.githubStats.stars.toLocaleString()}</span>
                                <span className={styles.statLabelMuted}>Stars</span>
                            </div>
                            <div className={styles.statBox}>
                                <span className={styles.statValuePrimary}>{data.githubStats.followers.toLocaleString()}</span>
                                <span className={styles.statLabelMuted}>Followers</span>
                            </div>
                        </div>
                    </section>

                    {/* Contribution Graph Section */}
                    <section className={styles.mainCard}>
                        <h3>Contribution Activity</h3>
                        <div className={styles.contributionGraph}>
                            <div className={styles.heatmapPlaceholder}>
                                {Array(5).fill(0).map((_, week) => (
                                    <div key={week} className={styles.week}>
                                        {Array(7).fill(0).map((_, day) => (
                                            <div key={day} className={`${styles.day} ${styles[`level${Math.floor(Math.random() * 5)}`]}`}></div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                            <div className={styles.contributionFooter}>
                                <a href="#" className={styles.learnMore}>Learn how we count contributions</a>
                                <div className={styles.legend}>
                                    <span>Less</span>
                                    {Array(5).fill(0).map((_, i) => (
                                        <div key={i} className={`${styles.day} ${styles[`level${i}`]}`}></div>
                                    ))}
                                    <span>More</span>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    {/* Contribution Streak Section */}
                    <div className={styles.contributionStreakGrid}>
                        <div className={styles.streakBox}>
                            <span className={styles.streakValue}>{data.contributions.total.toLocaleString()}</span>
                            <span className={styles.streakLabel}>Total Contributions</span>
                        </div>
                        <div className={styles.streakBox}>
                            <span className={styles.streakValue}>{data.contributions.currentStreak.toLocaleString()}</span>
                            <span className={styles.streakLabel}>Current Streak</span>
                        </div>
                        <div className={styles.streakBox}>
                            <span className={styles.streakValue}>{data.contributions.longestStreak.toLocaleString()}</span>
                            <span className={styles.streakLabel}>Longest Streak</span>
                        </div>
                    </div>

                    {/* Achievements Section */}
                    <section className={styles.mainCard}>
                        <h3>Achievements</h3>
                        {renderTabs(AchievementTabs, achievementsTab, setAchievementsTab)}
                        
                        <div className={styles.achievementsContent}>
                            {achievementsTab === 'Projects' && (
                                <p className={styles.noDataFound}>No {achievementsTab} found</p>
                            )}
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default StudentProfile;