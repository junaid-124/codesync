import React from 'react';
import styles from './LeaderboardPage.module.css';

// --- ICONS ---
const UserIcon = () => <span>👥</span>;
const GlobeIcon = () => <span>🌍</span>;
const TrophyIcon = () => <span>🏆</span>;

// --- MOCK DATA: PODIUM (Top 3) ---
const PODIUM_DATA = [
  {
    rank: 1,
    name: "Avuthu Kushwant Kumar Reddy",
    branch: "CSM",
    section: "C",
    score: "191527",
    color: "#FFA500", // Orange
    themeClass: styles.goldTheme,
    icon: "🏅",
    avatar: "https://i.pravatar.cc/150?u=1",
    stats: [57576, 31066, 735, 101497]
  },
  {
    rank: 2,
    name: "Srinivas Chundi",
    branch: "CSIT",
    section: "A",
    score: "132163",
    color: "#00FF7F", // Green
    themeClass: styles.greenTheme,
    icon: "🏆",
    avatar: null,
    stats: [29836, 40426, 350, 60963]
  },
  {
    rank: 3,
    name: "Govindu Stephenalex",
    branch: "CSM",
    section: "C",
    score: "101881",
    color: "#00BFFF", // Blue
    themeClass: styles.blueTheme,
    icon: "🔥",
    avatar: null,
    stats: [335, 19, 101497, 30]
  }
];

// --- MOCK DATA: TABLE ---
const TABLE_DATA = [
  { rank: 1, name: "AVUTHU KUSHWANT KUMAR REDDY", subtitle: "CSM - Fourth", avatar: "https://i.pravatar.cc/150?u=1", roll: "22R21A66D5", dept: "CSM", sec: "C", year: "2026", total: 191527, lc: 57576, cc: 31066, hr: 735, cf: 101497, gh: 0, gfg: 653 },
  { rank: 2, name: "Srinivas Chundi", subtitle: "CSIT - Third", avatar: null, roll: "23R21A3316", dept: "CSIT", sec: "A", year: "2027", total: 132163, lc: 29836, cc: 40426, hr: 350, cf: 60963, gh: 225, gfg: 363 },
  { rank: 3, name: "GOVINDU STEPHENALEX", subtitle: "CSM - Second", avatar: null, roll: "24R21A66F2", dept: "CSM", sec: "C", year: "2028", total: 101881, lc: 335, cc: 19, hr: 0, cf: 101497, gh: 30, gfg: 0 },
  { rank: 4, name: "POREDDY VIGNESWAR REDDY", subtitle: "CSD - Fourth", avatar: "https://i.pravatar.cc/150?u=4", roll: "22R21A6746", dept: "CSD", sec: "A", year: "2026", total: 84805, lc: 45068, cc: 20738, hr: 450, cf: 18399, gh: 150, gfg: 0 },
  { rank: 5, name: "SHAIK ABDUL HASEEB", subtitle: "CSE - Second", avatar: "https://i.pravatar.cc/150?u=5", roll: "24R21A05L6", dept: "CSE", sec: "G", year: "2028", total: 82581, lc: 40, cc: 12, hr: 0, cf: 82529, gh: 0, gfg: 0 },
  { rank: 6, name: "TRIVARDHAN REDDY", subtitle: "CSE - Second", avatar: null, roll: "24R21A05LK", dept: "CSE", sec: "G", year: "2028", total: 82529, lc: 0, cc: 0, hr: 0, cf: 82529, gh: 0, gfg: 0 },
  { rank: 7, name: "V. SATWIK REDDY", subtitle: "CSM - Fourth", avatar: null, roll: "22R21A66C7", dept: "CSM", sec: "B", year: "2026", total: 59228, lc: 30093, cc: 22967, hr: 485, cf: 0, gh: 55, gfg: 0 },
  { rank: 8, name: "MUDDADA HARSHAVARDHAN", subtitle: "IT - Fourth", avatar: "https://i.pravatar.cc/150?u=8", roll: "22R21A12H1", dept: "IT", sec: "C", year: "2026", total: 58926, lc: 26492, cc: 14350, hr: 555, cf: 0, gh: 0, gfg: 10 },
  { rank: 9, name: "TADIVAKA NAGA SAI VAIBHAV T", subtitle: "IT - Third", avatar: "https://i.pravatar.cc/150?u=9", roll: "23R21A12B4", dept: "IT", sec: "B", year: "2027", total: 56223, lc: 21292, cc: 14175, hr: 15, cf: 0, gh: 0, gfg: 0 },
  { rank: 10, name: "MADDALA SREEKAR", subtitle: "CSD - Fourth", avatar: "https://i.pravatar.cc/150?u=10", roll: "22R21A6734", dept: "CSD", sec: "A", year: "2026", total: 54370, lc: 22610, cc: 13944, hr: 230, cf: 0, gh: 0, gfg: 0 },
];

// --- MOCK DATA: CURRENT USER (You) ---
const CURRENT_USER = {
  rank: 268, name: "BEESA MANISH B", subtitle: "CSE - Third", roll: "23R21A05CR", dept: "CSE", sec: "G", year: "2027", total: 1619, lc: 811, cc: 294, hr: 355, cf: 0, gh: 0, gfg: 0
};

const LeaderboardPage: React.FC = () => {
  // Reordering: Visual order needs to be [Rank 2, Rank 1, Rank 3]
  const rank1 = PODIUM_DATA.find(u => u.rank === 1)!;
  const rank2 = PODIUM_DATA.find(u => u.rank === 2)!;
  const rank3 = PODIUM_DATA.find(u => u.rank === 3)!;
  const podiumOrder = [rank2, rank1, rank3];

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        
        {/* --- SECTION 1: HEADER & STATS --- */}
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
          <h1 className={styles.mainTitle}>Leaderboard</h1>
        </div>

        <p className={styles.subTitle}>MLRIT's Top Competitive Programmers</p>
        <h2 className={styles.sectionHeading}>Score Leaderboard</h2>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={`${styles.iconBox} ${styles.iconBlue}`}><UserIcon /></div>
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>Total Users</span>
              <span className={styles.statValue}>2,448</span>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={`${styles.iconBox} ${styles.iconGreen}`}><GlobeIcon /></div>
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>Active Platforms</span>
              <span className={styles.statValue}>6</span>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={`${styles.iconBox} ${styles.iconOrange}`}><TrophyIcon /></div>
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>Total Score</span>
              <span className={styles.statValue}>3,295,573</span>
            </div>
          </div>
        </div>

        {/* --- SECTION 2: THE PODIUM --- */}
        <div className={styles.podiumContainer}>
          {podiumOrder.map((user) => (
            <div key={user.rank} className={`${styles.podiumCard} ${user.themeClass}`}>
              
              {/* Floating Top Icon */}
              <div className={styles.topIconBadge} style={{ borderColor: user.color, color: user.color }}>
                {user.icon}
              </div>

              {/* Rank Pill */}
              <div className={styles.rankPill} style={{ backgroundColor: user.color }}>
                Rank: {user.rank}
              </div>

              {/* Avatar */}
              <div className={styles.avatarContainer} style={{ borderColor: user.color }}>
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className={styles.avatarImage} />
                ) : (
                  <span className={styles.avatarPlaceholder} style={{ color: user.color }}>
                    {user.name.charAt(0)}
                  </span>
                )}
              </div>

              {/* Name */}
              <h3 className={styles.userName}>{user.name}</h3>

              {/* Branch/Section Tags */}
              <div className={styles.tagsRow}>
                <span className={`${styles.tag} ${styles.highlightTag}`} style={{ color: user.color }}>
                  {user.branch}
                </span>
                <span className={styles.tag}>{user.section}</span>
              </div>

              {/* Small Stats Grid */}
              <div className={styles.statsBox}>
                {user.stats.map((stat, idx) => (
                  <div key={idx} className={styles.statItem}>
                      <span className={styles.dot} style={{ backgroundColor: idx % 2 === 0 ? '#FFA500' : '#444' }}></span>
                      {stat.toLocaleString()}
                  </div>
                ))}
              </div>

              {/* Total Score */}
              <div className={styles.totalScoreLabel}>Total Score</div>
              <div className={styles.totalScoreValue} style={{ color: user.color }}>
                {parseInt(user.score).toLocaleString()}
              </div>

            </div>
          ))}
        </div>

        {/* --- SECTION 3: SEARCH, FILTERS & TOGGLES --- */}
        
        {/* 1. Search Bar */}
        <div className={styles.searchWrapper}>
          <div className={styles.searchBox}>
             <span>🔍</span> 
             <input 
               type="text" 
               placeholder="Search by name, email, or roll" 
               className={styles.searchInput}
             />
          </div>
        </div>

        {/* 2. Filter Panel */}
        <div className={styles.filterPanel}>
          
          <div className={styles.filterHeader}>
            <div className={styles.filterTitle}>
              <span style={{color: '#00C2FF'}}>☰</span> 
              Filters & Sorting
            </div>
            <button className={styles.resetBtn}>
              <span>⟳</span> Reset Filters
            </button>
          </div>

          <div className={styles.filterGrid}>
            <div className={styles.dropdownBox}>
              <span className={styles.dropdownLabel}>Department</span>
              <div className={styles.dropdownValue}>
                All Departments <span>▼</span>
              </div>
            </div>
            <div className={styles.dropdownBox}>
              <span className={styles.dropdownLabel}>Year of Study</span>
              <div className={styles.dropdownValue}>
                All Students <span>▼</span>
              </div>
            </div>
            <div className={styles.dropdownBox}>
              <span className={styles.dropdownLabel}>Section</span>
              <div className={styles.dropdownValue}>
                All Sections <span>▼</span>
              </div>
            </div>
            <div className={styles.dropdownBox}>
              <span className={styles.dropdownLabel}>Sort Order</span>
              <div className={styles.dropdownValue}>
                Highest First <span>▼</span>
              </div>
            </div>
          </div>

          <div className={styles.resultsText}>
            Showing 10 users (Page 1 of 245)
          </div>
        </div>

        {/* 3. Toggle Buttons */}
        <div className={styles.toggleContainer}>
          <button className={`${styles.toggleBtn} ${styles.activeToggle}`}>
            <span>🏆</span> By Score
          </button>
          <button className={`${styles.toggleBtn} ${styles.inactiveToggle}`}>
            <span>&lt;/&gt;</span> By Problems Solved
          </button>
        </div>

        {/* --- SECTION 4: TABLE --- */}
        <div className={styles.tableContainer}>
          
          {/* Header */}
          <div className={`${styles.tableGrid} ${styles.tableHeader}`}>
            <div className={styles.headerCell}>Rank</div>
            <div className={styles.headerCell}>Name</div>
            <div className={styles.headerCell}>Roll No</div>
            <div className={styles.headerCell}>Dept</div>
            <div className={styles.headerCell}>Sec</div>
            <div className={styles.headerCell}>Year</div>
            <div className={`${styles.headerCell} ${styles.textCyan}`}>Problems Solved ↓</div>
            <div className={`${styles.headerCell} ${styles.textGreen}`}>GeeksforGeeks</div>
            <div className={`${styles.headerCell} ${styles.textOrange}`}>LeetCode</div>
            <div className={`${styles.headerCell} ${styles.textGreen}`}>HackerRank</div>
            <div className={`${styles.headerCell} ${styles.textGrey}`}>CodeChef</div>
            <div className={`${styles.headerCell} ${styles.textBlue}`}>CodeForces</div>
            <div className={`${styles.headerCell} ${styles.textGreen}`}>GitHub</div>
          </div>

          {/* Table Rows */}
          {TABLE_DATA.map((row) => (
            <div key={row.rank} className={`${styles.tableGrid} ${styles.tableRow}`}>
              
              {/* Rank Logic */}
              <div className={styles.rankCell}>
                {row.rank === 1 && <span className={`${styles.rankBadge} ${styles.rank1}`}>1</span>}
                {row.rank === 2 && <span className={`${styles.rankBadge} ${styles.rank2}`}>2</span>}
                {row.rank === 3 && <span className={`${styles.rankBadge} ${styles.rank3}`}>3</span>}
                {row.rank > 3 && <span className={styles.rankN}>{row.rank}</span>}
              </div>

              {/* Profile */}
              <div className={styles.profileCell}>
                <div className={styles.tableAvatar}>
                  {row.avatar ? <img src={row.avatar} alt="u" /> : <span>{row.name.charAt(0)}</span>}
                </div>
                <div className={styles.profileText}>
                  <div className={styles.profileName}>{row.name}</div>
                  <div className={styles.profileSubtitle}>{row.subtitle}</div>
                </div>
              </div>

              <div className={styles.textMuted}>{row.roll}</div>
              <div className={styles.textMuted}>{row.dept}</div>
              <div className={styles.textMuted}>{row.sec}</div>
              <div className={styles.textMuted}>{row.year}</div>
              
              {/* Stats Data matching new column order */}
              <div className={`${styles.fontBold} ${styles.textCyan}`}>{row.total.toLocaleString()}</div>
              <div className={`${styles.fontBold} ${row.gfg > 0 ? styles.textGreen : styles.textGrey}`}>{row.gfg}</div>
              <div className={`${styles.fontBold} ${row.lc > 0 ? styles.textOrange : styles.textGrey}`}>{row.lc}</div>
              <div className={`${styles.fontBold} ${row.hr > 0 ? styles.textGreen : styles.textGrey}`}>{row.hr}</div>
              <div className={`${styles.fontBold} ${row.cc > 0 ? styles.textGrey : styles.textGrey}`}>{row.cc}</div>
              <div className={`${styles.fontBold} ${row.cf > 0 ? styles.textBlue : styles.textGrey}`}>{row.cf}</div>
              <div className={`${styles.fontBold} ${row.gh > 0 ? styles.textGreen : styles.textGrey}`}>{row.gh}</div>
            </div>
          ))}

          {/* Sticky Current User Row */}
          <div className={`${styles.tableGrid} ${styles.currentUserRow}`}>
            <div className={styles.rankCell}>
               <span className={styles.rankN}>#{CURRENT_USER.rank}</span>
            </div>
            
            <div className={styles.profileCell}>
              <div className={`${styles.tableAvatar}`} style={{borderColor: '#00C2FF', color: '#00C2FF'}}>
                <span>{CURRENT_USER.name.charAt(0)}</span>
              </div>
              <div className={styles.profileText}>
                <div className={styles.profileName}>
                  {CURRENT_USER.name} <span className={styles.youTag}>YOU</span>
                </div>
                <div className={styles.profileSubtitle}>{CURRENT_USER.subtitle}</div>
              </div>
            </div>

            <div className={styles.textMuted}>{CURRENT_USER.roll}</div>
            <div className={styles.textMuted}>{CURRENT_USER.dept}</div>
            <div className={styles.textMuted}>{CURRENT_USER.sec}</div>
            <div className={styles.textMuted}>{CURRENT_USER.year}</div>

            <div className={`${styles.fontBold} ${styles.textCyan}`}>{CURRENT_USER.total.toLocaleString()}</div>
            <div className={`${styles.fontBold} ${styles.textGrey}`}>{CURRENT_USER.gfg}</div>
            <div className={`${styles.fontBold} ${styles.textOrange}`}>{CURRENT_USER.lc}</div>
            <div className={`${styles.fontBold} ${styles.textGreen}`}>{CURRENT_USER.hr}</div>
            <div className={`${styles.fontBold} ${styles.textGrey}`}>{CURRENT_USER.cc}</div>
            <div className={`${styles.fontBold} ${styles.textBlue}`}>{CURRENT_USER.cf}</div>
            <div className={`${styles.fontBold} ${styles.textGrey}`}>{CURRENT_USER.gh}</div>
          </div>

        </div>

        {/* --- SECTION 5: PAGINATION --- */}
        <div className={styles.paginationContainer}>
          
          <div className={styles.rowsPerPage}>
            <div className={styles.selectWrapper}>
               <select className={styles.pageSelect}>
                 <option>10</option>
                 <option>20</option>
                 <option>50</option>
               </select>
            </div>
            <span>per page</span>
          </div>

          <div className={styles.paginationControls}>
            <button className={styles.pageBtn}>←</button>
            <button className={`${styles.pageBtn} ${styles.activePage}`}>1</button>
            <button className={styles.pageBtn}>2</button>
            <button className={styles.pageBtn}>3</button>
            <button className={styles.pageBtn}>4</button>
            <button className={styles.pageBtn}>5</button>
            <button className={styles.pageBtn}>→</button>
          </div>

          <div className={styles.pageInfo}>
            1-10 of 2448
          </div>

        </div>

      </div>
    </div>
  );
};

export default LeaderboardPage;