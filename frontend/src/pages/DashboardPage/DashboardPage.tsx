import { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import styles from './DashboardPage.module.css';
import { RiCodeBoxFill, RiTrophyLine, RiGithubFill, RiTeamLine } from 'react-icons/ri';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// --- Mock Data for the Dashboard ---
const stats = [
  { icon: <RiCodeBoxFill />, value: '342', label: 'Problems Solved', desc: 'Total across all platforms', change: '+12%' },
  { icon: <RiTrophyLine />, value: '1,750', label: 'Contest Rating', desc: 'Current Codeforces rating', change: '+8%' },
  { icon: <RiGithubFill />, value: '68', label: 'GitHub Commits', desc: 'This month', change: '+23%' },
  { icon: <RiTeamLine />, value: '#3', label: 'College Rank', desc: 'Out of 1,247 students', change: '+2%' },
];

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: { 
    x: { ticks: { color: '#8b949e' }, grid: { color: 'rgba(139, 148, 158, 0.1)' } }, 
    y: { ticks: { color: '#8b949e' }, grid: { color: 'rgba(139, 148, 158, 0.1)' } } 
  },
};

const ratingData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Rating',
    data: [1200, 1350, 1400, 1550, 1600, 1800],
    borderColor: '#3B82F6',
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    tension: 0.4,
    fill: true,
  }],
};

const contributionsData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [{
    label: 'Contributions',
    data: [12, 19, 15, 22],
    borderColor: '#8B5CF6',
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    tension: 0.4,
    fill: true,
  }],
};

const DashboardPage = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  if (!user) {
    return <div className={styles.loading}>Loading Dashboard...</div>;
  }

  const firstName = user.displayName?.split(' ')[0];

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.headerText}>
          <h1>Welcome back, {firstName}! 👋</h1>
          <p>Ready to code and improve your skills today?</p>
        </div>
      </header>
      
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.cardIcon}>{stat.icon}</div>
            <div className={styles.cardValue}>{stat.value}</div>
            <div className={styles.cardLabel}>{stat.label}</div>
            <p className={styles.cardDesc}>{stat.desc}</p>
            <span className={styles.cardChange}>{stat.change}</span>
          </div>
        ))}
      </div>

      <div className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <h3>Rating Progress</h3>
          <div className={styles.chartContainer}>
            <Line options={chartOptions} data={ratingData} />
          </div>
        </div>
        <div className={styles.chartCard}>
          <h3>Weekly Contributions</h3>
          <div className={styles.chartContainer}>
            <Line options={chartOptions} data={contributionsData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;