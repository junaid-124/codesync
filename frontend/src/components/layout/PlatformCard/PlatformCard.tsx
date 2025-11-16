import { useState } from 'react';
import type { Platform } from '../../../data/platformData'; 
import styles from './PlatformCard.module.css';
import { FiEdit2, FiCheck, FiCheckCircle } from 'react-icons/fi';
import StatsBlock from '../StatsBlock/StatsBlock';
import { dummyStats } from '../../../data/dummyStats';

// --- ADD THIS NEW IMPORT ---
import statsBlockStyles from '../StatsBlock/StatsBlock.module.css';

interface PlatformCardProps {
  platform: Platform;
}

const PlatformCard = ({ platform }: PlatformCardProps) => {
  const [username, setUsername] = useState('jhon');
  const [inputValue, setInputValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showStats, setShowStats] = useState(false);
  
  const Icon = platform.icon;

  const handleSave = () => {
    setUsername(inputValue);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setInputValue(username);
    setIsEditing(true);
  };
  
  const handleToggleStats = () => {
    setShowStats(!showStats);
  };

  return (
    <div 
      className={styles.platformCard} 
      style={{ '--platform-color': platform.color } as React.CSSProperties}
    >
      <div className={styles.cardHeader}>
        <Icon className={styles.logo} />
        <span className={styles.platformName}>{platform.name}</span>
      </div>

      
      {isEditing || !username ? (
        // --- STATE: Editing or No Username ---
        <div className={styles.formGroup}>
          <input
            type="text"
            id={`${platform.id}-username`}
            className={styles.usernameInput}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Enter ${platform.name} username`}
          />
          <button className={styles.iconButton} onClick={handleSave} aria-label="Save">
            <FiCheck />
          </button>
        </div>
      ) : (
        // --- STATE: Username Saved ---
        <>
          <label htmlFor={`${platform.id}-username`} className={styles.label}>
            Username
          </label>
          <div className={styles.savedFormGroup}>
            <input
              type="text"
              id={`${platform.id}-username`}
              className={styles.savedUsernameInput}
              value={username}
              readOnly
            />
            <button className={styles.editButton} onClick={handleEdit} aria-label="Edit">
              <FiEdit2 />
            </button>
          </div>
          
          <div className={`${styles.currentUsername} ${styles[platform.id]}`}>
            <FiCheckCircle />
            <span>
              CURRENT USERNAME <br />
              <strong>{username}</strong>
            </span>
          </div>

          <button className={styles.updateButton}>
            Update {platform.name}
          </button>
          
          <button 
            className={styles.statsButton}
            onClick={handleToggleStats}
          >
            {showStats ? 'Hide Stats' : 'Show Stats'}
          </button>
          
          {/* --- THIS LINE IS NOW FIXED --- */}
          <StatsBlock
            platformName={platform.name}
            platformColor={platform.color}
            stats={dummyStats[platform.id]}
            className={showStats ? statsBlockStyles.expanded : ''} // Use the new import
          />
        </>
      )}

    </div>
  );
};

export default PlatformCard;