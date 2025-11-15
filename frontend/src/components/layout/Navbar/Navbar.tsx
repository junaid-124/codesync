import { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import { 
  RiNotification3Line, 
  RiUserLine, 
  RiSettings3Line, 
  RiLogoutBoxRLine 
} from 'react-icons/ri';
import { auth } from '../../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';

const initialNotifications = [
  { id: 1, text: 'Alex Coder just passed you on the leaderboard!', read: false },
  { id: 2, text: 'Your submission for "Two Sum" was accepted.', read: false },
  { id: 3, text: 'A new course "Advanced Algorithms" has been added.', read: true },
];

const Navbar = ({ isLoggedIn, onLogout }: { isLoggedIn: boolean, onLogout: () => void }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const hasUnread = notifications.some(n => !n.read);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <header className={styles.navbarWrapper}>
      <nav className={styles.navbar}>
        <Link to={isLoggedIn ? "/dashboard" : "/"} className={styles.logoContainer}>
          <div className={styles.logoIcon}>&lt;/&gt;</div>
          <span className={styles.logoText}>CodeSync</span>
        </Link>

        {isLoggedIn && (
          <ul className={styles.navLinks}>
            <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? styles.activeLink : ''}>Dashboard</NavLink></li>
            <li><NavLink to="/leaderboard" className={({ isActive }) => isActive ? styles.activeLink : ''}>Leaderboard</NavLink></li>
            <li><NavLink to="/contests" className={({ isActive }) => isActive ? styles.activeLink : ''}>Contests</NavLink></li> {/* <--- ADD THIS LINK */}
            <li><NavLink to="/codepad" className={({ isActive }) => isActive ? styles.activeLink : ''}>Codepad</NavLink></li>
            <li><NavLink to="/career-suite" className={({ isActive }) => isActive ? styles.activeLink : ''}>Career Suite</NavLink></li>
            <li><NavLink to="/courses" className={({ isActive }) => isActive ? styles.activeLink : ''}>Courses</NavLink></li>
          </ul>
        )}

        <div className={styles.navActions}>
          {isLoggedIn ? (
            <>
              <div className={styles.notificationMenu} ref={notificationsRef}>
                <button className={styles.iconButton} onClick={() => setNotificationsOpen(!notificationsOpen)}>
                  <RiNotification3Line />
                  {hasUnread && <span className={styles.notificationDot}></span>}
                </button>
                {notificationsOpen && (
                  <div className={`${styles.dropdownMenu} ${styles.notificationsDropdown}`}> {/* <-- Unique class here */}
                    <div className={styles.dropdownHeader}>
                      <strong>Notifications</strong>
                      <button className={styles.markAsRead} onClick={markAllAsRead}>Mark all as read</button>
                    </div>
                    {notifications.map(notification => (
                      <div key={notification.id} className={`${styles.notificationItem} ${notification.read ? styles.read : ''}`}>
                        {!notification.read && <div className={styles.unreadIndicator}></div>}
                        <p>{notification.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.profileMenu} ref={profileRef}>
                <button className={styles.avatarButton} onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}>
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt="Avatar" referrerPolicy="no-referrer" />
                  ) : (
                    <span>{user?.displayName?.charAt(0).toUpperCase() || 'U'}</span>
                  )}
                </button>
                {profileDropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    <div className={styles.dropdownHeader}>
                      <strong>{user?.displayName}</strong>
                      <span>{user?.email}</span>
                    </div>
                    <Link to="/profile" className={styles.dropdownItem} onClick={() => setProfileDropdownOpen(false)}><RiUserLine/> Profile</Link>
                    <Link to="/settings" className={styles.dropdownItem} onClick={() => setProfileDropdownOpen(false)}><RiSettings3Line/> Settings</Link>
                    <button onClick={onLogout} className={`${styles.dropdownItem} ${styles.logout}`}>
                      <RiLogoutBoxRLine/> Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/auth" className={styles.signIn}>Sign In</Link>
              <Link to="/auth" className={styles.getStarted}>Get Started</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;