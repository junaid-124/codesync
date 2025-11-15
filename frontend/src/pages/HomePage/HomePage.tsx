import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import Integrations from './components/Integrations/Integrations';
import LeaderboardSection from './components/LeaderboardSection/LeaderboardSection';
import CodePadSection from './components/CodePadSection/CodePadSection';
import CoursesSection from './components/CoursesSection/CoursesSection';
import HeatmapSection from './components/HeatmapSection/HeatmapSection';
import MoreFeaturesSection from './components/MoreFeaturesSection/MoreFeaturesSection';
import StatsSection from './components/StatsSection/StatsSection';
import PlatformStatsSection from './components/PlatformStatsSection/PlatformStatsSection'; // <-- Import

import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.homePageContainer}>
      <Hero />
      <Features />
      <Integrations />
      <LeaderboardSection />
      <CodePadSection />
      <CoursesSection />
      <HeatmapSection />
      <MoreFeaturesSection />
      <StatsSection />
      <PlatformStatsSection /> {/* <-- Add it here */}
    </div>
  );
};

export default HomePage;