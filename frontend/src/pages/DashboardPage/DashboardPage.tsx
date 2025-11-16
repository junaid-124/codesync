// Removed user-related imports as they are no longer needed
import styles from './DashboardPage.module.css'; // This line imports your CSS

import { platformData } from '../../data/platformData'; 
import PlatformCard from '../../components/layout/PlatformCard/PlatformCard'; 

const DashboardPage = () => {
  // Removed all user state and useEffect logic

  return (
    <div className={styles.dashboard}>
      {/* --- THIS IS THE UPDATED HEADER --- */}
      <header className={styles.header}>
        <div className={styles.headerText}>
          <h1>Dashboard</h1>
          <p>Track your progress across multiple competitive programming platforms.</p>
        </div>
      </header>
      {/* ---------------------------------- */}
      
      <div className={styles.platformGrid}>
        {platformData.map((platform) => (
          <PlatformCard key={platform.id} platform={platform} />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;