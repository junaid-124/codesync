import React, { useMemo, useState } from "react";
import styles from "./StudentProfilePage.module.css";

import DonutChart from "./DonutChart";
import Heatmap from "./Heatmap";

import { FaLinkedinIn, FaGithub } from "react-icons/fa";

import { mockProfiles } from "../../data/mockProfiles";
import type { StudentProfile as StudentProfileType } from "../../data/mockProfiles";
import { dummyStats } from "../../data/dummyStats";
import { platformData } from "../../data/platformData";

const CodingTabs = ["Overall Score", "Problems Solved", "Contests", "Rating"];
const AchievementTabs = [
  "Projects",
  "Internships",
  "Certifications",
  "Achievements",
];

/* PLATFORM COLORS (EXACT MATCH TO YOUR SCREENSHOT) */
const PLATFORM_COLORS: Record<string, string> = {
  LeetCode: "#f89f1b",
  CodeChef: "#5c4033",
  HackerRank: "#2ec866",
  CodeForces: "#4ea1ff",
  GitHub: "#6e6e6e",
  "Geeks For Geeks": "#6e6e6e", // OPTION A (Grey circle + G)
};

/* LETTERS SHOWN IN CIRCLES */
const PLATFORM_SHORT: Record<string, string> = {
  LeetCode: "L",
  CodeChef: "C",
  HackerRank: "H",
  CodeForces: "CF",
  GitHub: "G",
  "Geeks For Geeks": "G",
};

const SocialIcons = () => (
  <div className={styles.socialLinks}>
    <a href="#" className={styles.socialIcon}>
      <FaLinkedinIn size={18} />
    </a>
    <a href="#" className={styles.socialIcon}>
      <FaGithub size={18} />
    </a>
  </div>
);

const StudentProfile: React.FC = () => {
  const profile: StudentProfileType = useMemo(() => mockProfiles[0], []);

  const [codingTab, setCodingTab] = useState(CodingTabs[0]);
  const [achievementsTab, setAchievementsTab] = useState(
    AchievementTabs[0]
  );

  const donutLabels = platformData.map((p) => p.name);
  const donutValues = platformData.map((p) => {
    const obj = dummyStats[p.id]?.find((s) => s.label === "Score");
    return Number(obj?.value ?? 0);
  });
  const donutColors = platformData.map((p) => p.color);

  const heatmapLevels = [
    styles.lvl0,
    styles.lvl1,
    styles.lvl2,
    styles.lvl3,
    styles.lvl4,
  ];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* PROFILE HEADER */}
        <header className={styles.profileHeaderCard}>
          <div className={styles.headerBlueStrip}></div>

          <div className={styles.headerContent}>
            <img src={profile.avatar} className={styles.avatar} />

            <div className={styles.profileInfo}>
              <h2>{profile.name}</h2>
              <p>
                {profile.department} • {profile.section}
              </p>

              <div className={styles.scoreGroup}>
                <p className={styles.scoreLabel}>Score</p>
                <p className={styles.scoreValue}>
                  {profile.score.toLocaleString()}
                </p>
              </div>
            </div>

            <SocialIcons />
          </div>
        </header>

        {/* GRID */}
        <div className={styles.profileContentGrid}>
          {/* SIDEBAR */}
          <aside className={styles.sidebar}>
            <section className={styles.sidebarMergedCard}>
              {/* ABOUT */}
              <div>
                <h3>About</h3>
                <p className={styles.aboutText}>{profile.about}</p>
              </div>

              {/* CODING PROFILES */}
              <div>
                <h3 className={styles.sectionHeadingSpacing}>
                  Coding Profiles
                </h3>

                <div className={styles.codingProfilesList}>
                  {Object.entries(profile.codingProfiles).map(
                    ([site, username]) => (
                      <div key={site} className={styles.profileRow}>
                        <div
                          className={styles.profileIcon}
                          style={{
                            backgroundColor:
                              PLATFORM_COLORS[site] || "#444",
                          }}
                        >
                          {PLATFORM_SHORT[site]}
                        </div>

                        <div className={styles.profileSiteWithLink}>
                          <span className={styles.profileSite}>
                            {site}:
                          </span>
                          <a className={styles.profileLink}>{username}</a>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className={styles.sidebarDivider}></div>

              {/* DETAILS */}
              <div>
                <h3 className={styles.sectionHeadingSpacing}>Details</h3>

                <div className={styles.detailsGridMerged}>
                  <div className={styles.detailsRow}>
                    <span className="label">Email</span>
                    <span className="value">{profile.email}</span>
                  </div>

                  <div className={styles.detailsRow}>
                    <span className="label">Department</span>
                    <span className="value">{profile.department}</span>
                  </div>

                  <div className={styles.detailsRow}>
                    <span className="label">Section</span>
                    <span className="value">{profile.section}</span>
                  </div>

                  <div className={styles.detailsRow}>
                    <span className="label">Year</span>
                    <span className="value">{profile.year}</span>
                  </div>

                  <div className={styles.detailsRow}>
                    <span className="label">Contact</span>
                    <span className="value">{profile.contact}</span>
                  </div>
                </div>
              </div>

              <div className={styles.sidebarDivider}></div>

              {/* SKILLS */}
              <div>
                <h3 className={styles.sectionHeadingSpacing}>Skills</h3>

                <div className={styles.tagsContainer}>
                  {profile.skills.map((s) => (
                    <span key={s} className={styles.tag}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.sidebarDivider}></div>

              {/* INTERESTS */}
              <div>
                <h3 className={styles.sectionHeadingSpacing}>Interests</h3>

                <div className={styles.tagsContainer}>
                  {profile.interests.map((i) => (
                    <span key={i} className={styles.tag}>
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </aside>

          {/* MAIN CONTENT */}
          <main className={styles.mainContent}>
            {/* DONUT CHART */}
            <section className={styles.mainCard}>
              <h3>Coding Profiles</h3>

              <div className={styles.tabContainer}>
                {CodingTabs.map((item) => (
                  <button
                    key={item}
                    className={`${styles.tabButton} ${
                      codingTab === item ? styles.activeTab : ""
                    }`}
                    onClick={() => setCodingTab(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {codingTab === "Overall Score" && (
                <div className={styles.overallScoreContent}>
                  <DonutChart
                    value={profile.score}
                    labels={donutLabels}
                    values={donutValues}
                    colors={donutColors}
                  />

                  <div className={styles.chartLegend}>
                    {platformData.map((p) => (
                      <div
                        key={p.id}
                        className={styles.legendItem}
                      >
                        <span
                          className={styles.legendDot}
                          style={{ backgroundColor: p.color }}
                        ></span>
                        {p.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* GITHUB STATS */}
            <section className={styles.mainCard}>
              <h3>GitHub Stats</h3>

              <div className={styles.statsGrid}>
                <div className={styles.statBox}>
                  <p className={styles.statValue}>
                    {profile.githubStats.publicRepos}
                  </p>
                  <span>Public Repo's</span>
                </div>

                <div className={styles.statBox}>
                  <p className={styles.statValue}>
                    {profile.githubStats.totalCommits}
                  </p>
                  <span>Total Commits</span>
                </div>

                <div className={styles.statBox}>
                  <p className={styles.statValue}>
                    {profile.githubStats.stars}
                  </p>
                  <span>Stars</span>
                </div>

                <div className={styles.statBox}>
                  <p className={styles.statValue}>
                    {profile.githubStats.followers}
                  </p>
                  <span>Followers</span>
                </div>
              </div>
            </section>

            {/* HEATMAP */}
            <section className={styles.mainCard}>
              <h3>Contribution Activity</h3>

              <div className={styles.heatmapCard}>
                <Heatmap weeks={20} />

                <div className={styles.hmFooter}>
                  <a>Learn how we count contributions</a>

                  <div className={styles.hmLegend}>
                    <span>Less</span>

                    {[0, 1, 2, 3, 4].map((lvl) => (
                      <div
                        key={lvl}
                        className={`${styles.hmDay} ${heatmapLevels[lvl]}`}
                      />
                    ))}

                    <span>More</span>
                  </div>
                </div>
              </div>
            </section>

            {/* STREAK */}
            <div className={styles.streakRow}>
              <div className={styles.streakBox}>
                <p className={styles.streakValue}>
                  {profile.githubStats.totalCommits}
                </p>
                <span>Total Contributions</span>
              </div>

              <div className={styles.streakBox}>
                <p className={styles.streakValue}>
                  {profile.githubStats.contributionStreak}
                </p>
                <span>Current Streak</span>
              </div>

              <div className={styles.streakBox}>
                <p className={styles.streakValue}>
                  {profile.githubStats.stars}
                </p>
                <span>Longest Streak</span>
              </div>
            </div>

            {/* ACHIEVEMENTS */}
            <section className={styles.mainCard}>
              <h3>Achievements</h3>

              <div className={styles.tabContainer}>
                {AchievementTabs.map((item) => (
                  <button
                    key={item}
                    className={`${styles.tabButton} ${
                      achievementsTab === item ? styles.activeTab : ""
                    }`}
                    onClick={() => setAchievementsTab(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className={styles.achievementsContent}>
                <p className={styles.noDataFound}>
                  No {achievementsTab} found
                </p>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
