import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import styles from './AppLayout.module.css';

const AppLayout = ({ isLoggedIn, onLogout }: { isLoggedIn: boolean, onLogout: () => void }) => {
  return (
    <div className={styles.appLayout}>
      <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;