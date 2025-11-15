import React, { useState, useMemo } from 'react';
import styles from './LeaderboardPage.module.css';
import { RiSearchLine, RiVipCrownFill, RiArrowDownSLine, RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

// --- Added more mock data for pagination ---
const mockUsers = Array.from({ length: 45 }, (_, i) => ({
    rank: i + 1,
    name: `Student Name ${i + 1}`,
    username: `@student${i + 1}`,
    college: ['CMU Engineering', 'Berkeley Institute', 'Stanford Tech', 'MIT College'][i % 4],
    year: `${(i % 4) + 1}st Year`,
    branch: ['CSE', 'IT', 'ECE', 'EEE'][i % 4],
    problems: Math.floor(Math.random() * 1500),
    rating: Math.floor(Math.random() * 1500) + 1200,
    github: Math.floor(Math.random() * 1000),
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=Student%20${i + 1}`
}));

const ITEMS_PER_PAGE = 10; // You can change this value

const LeaderboardPage = () => {
    const [yearFilter, setYearFilter] = useState('All');
    const [branchFilter, setBranchFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredUsers = useMemo(() => {
        return mockUsers.filter(user => {
            const yearMatch = yearFilter === 'All' || user.year.includes(yearFilter.charAt(0));
            const branchMatch = branchFilter === 'All' || user.branch === branchFilter;
            const searchMatch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.username.toLowerCase().includes(searchTerm.toLowerCase());
            return yearMatch && branchMatch && searchMatch;
        });
    }, [yearFilter, branchFilter, searchTerm]);

    // Logic to get only the items for the current page
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const lastPageIndex = firstPageIndex + ITEMS_PER_PAGE;
        return filteredUsers.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, filteredUsers]);

    const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

    const getRankClass = (rank: number) => {
        if (rank === 1) return styles.gold;
        if (rank === 2) return styles.silver;
        if (rank === 3) return styles.bronze;
        return '';
    };

    return (
        <div className={styles.pageContainer}>
            <header className={styles.header}>
                <h1 className={styles.titleGradient}>CodeSync Leaderboard</h1>
                <p>Compete, collaborate, and climb the ranks</p>
            </header>

            <div className={styles.controlsContainer}>
                <div className={styles.searchInput}>
                    <RiSearchLine />
                    <input
                        type="text"
                        placeholder="Search by name or username..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className={styles.filters}>
                    <select value={yearFilter} onChange={e => setYearFilter(e.target.value)}>
                        <option value="All">All Years</option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                    </select>
                    <select value={branchFilter} onChange={e => setBranchFilter(e.target.value)}>
                        <option value="All">All Branches</option>
                        <option value="CSE">CSE</option>
                        <option value="IT">IT</option>
                        <option value="ECE">ECE</option>
                        <option value="EEE">EEE</option>
                    </select>
                </div>
            </div>

            <p className={styles.resultsCount}>Showing 1-{currentTableData.length} of {filteredUsers.length} students</p>

            <div className={styles.leaderboard}>
                <div className={styles.listHeader}>
                    <span>Rank</span>
                    <span>Student</span>
                    <span>College</span>
                    <span>Year</span>
                    <span>Branch</span>
                    <span className={styles.center}>Problems <RiArrowDownSLine/></span>
                    <span className={styles.center}>Rating <RiArrowDownSLine/></span>
                    <span className={styles.center}>GitHub <RiArrowDownSLine/></span>
                </div>
                <div className={styles.listBody}>
                {currentTableData.length > 0 ? (
                    currentTableData.map((user) => (
                        <div key={user.rank} className={`${styles.userRow} ${getRankClass(user.rank)}`}>
                            <span className={styles.rank}>
                                {user.rank <= 3 && <RiVipCrownFill />}
                                {user.rank}
                            </span>
                            <div className={styles.player}>
                                <img src={user.avatar} alt={user.name} className={styles.avatar} />
                                <div className={styles.playerInfo}>
                                    <span className={styles.playerName}>{user.name}</span>
                                    <span className={styles.playerUsername}>{user.username}</span>
                                </div>
                            </div>
                            <span>{user.college}</span>
                            <span>{user.year}</span>
                            <span className={styles.center}><div className={styles.branchTag}>{user.branch}</div></span>
                            <span className={`${styles.center} ${styles.problems}`}>{user.problems}</span>
                            <span className={`${styles.center} ${styles.rating}`}>{user.rating}</span>
                            <span className={styles.center}>{user.github}</span>
                        </div>
                    ))
                ) : (
                    <div className={styles.noResults}>No players found.</div>
                )}
                </div>
            </div>

            {/* --- PAGINATION COMPONENT --- */}
            <div className={styles.paginationNav}>
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className={styles.navButton}>
                    <RiArrowLeftSLine /> Previous
                </button>
                <div className={styles.pageNumbers}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                        <button key={number} onClick={() => setCurrentPage(number)} className={`${styles.pageButton} ${currentPage === number ? styles.active : ''}`}>
                            {number}
                        </button>
                    ))}
                </div>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} className={styles.navButton}>
                    Next <RiArrowRightSLine />
                </button>
            </div>
        </div>
    );
};

export default LeaderboardPage;