import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';
import { 
  RiDashboardLine, 
  RiBarChartLine, 
  RiCodeBoxLine, 
  RiSuitcaseLine, 
  RiBookOpenLine, 
  RiUserLine,
  RiSettings3Line, 
  RiLogoutBoxRLine 
} from 'react-icons/ri';

// Data for your navigation links
const navLinks = [
  { to: '/dashboard', icon: <RiDashboardLine />, text: 'Dashboard' },
  { to: '/leaderboard', icon: <RiBarChartLine />, text: 'Leaderboard' },
  { to: '/codepad', icon: <RiCodeBoxLine />, text: 'Codepad' },
  { to: '/career-suite', icon: <RiSuitcaseLine />, text: 'Career Suite' },
  { to: '/courses', icon: <RiBookOpenLine />, text: 'Courses' },
  { to: '/profile', icon: <RiUserLine />, text: 'Profile' },
  { to: '/settings', icon: <RiSettings3Line />, text: 'Settings' },
];

const Sidebar = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.logo}>&lt;/&gt;</div>
        <span>CodeSync</span>
      </div>
      <nav className={styles.navigation}>
        <ul>
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink 
                to={link.to} 
                className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}
              >
                {link.icon}
                <span>{link.text}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.sidebarFooter}>
        <button onClick={onLogout} className={styles.logoutButton}>
          <RiLogoutBoxRLine />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;