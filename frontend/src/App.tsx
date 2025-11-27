// frontend/src/App.tsx

import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';

// Layouts & Pages
import AppLayout from './components/layout/AppLayout/AppLayout';
import Navbar from './components/layout/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import AuthPage from './pages/AuthPage/AuthPage';
import OnboardingPage from './pages/OnboardingPage/OnboardingPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import LeaderboardPage from './pages/LeaderboardPage/LeaderboardPage';

import CodePadPage from './pages/CodePadPage/CodePadPage';
import CareerSuitePage from './pages/CareerSuitePage/CareerSuitePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import CoursesPage from './pages/CoursesPage/CoursesPage';
import ContestsPage from './pages/ContestsPage/ContestsPage';
import './App.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// Note: We remove the '.tsx' extension from the import path to prevent common TS/bundler errors.
import StudentProfilePage from './pages/StudentProfilePage/StudentProfilePage'; 


function App() {
const [isLoggedIn, setIsLoggedIn] = useState(false);
 const [authReady, setAuthReady] = useState(false);
 const navigate = useNavigate();

useEffect(() => {
 const unsubscribe = onAuthStateChanged(auth, (user) => {
 setIsLoggedIn(!!user);
 setAuthReady(true);
 });
 return () => unsubscribe(); }, []);
 const handleLogin = () => {
navigate('/dashboard'); 
};

const handleLogout = () => {
signOut(auth).then(() => {
 navigate('/');
 });
 };

 if (!authReady) {
 return <div className="loading-screen">Loading...</div>;
 }

 return (
 <div className="app-wrapper">
 <Routes>
 <Route path="/"
 element={
 <>
 <Navbar isLoggedIn={false} onLogout={handleLogout} />
 <div className="container"><HomePage /></div>
 </>
}
 />

 <Route path="/auth" element={<AuthPage onLogin={handleLogin} />} />
 <Route path="/onboarding" element={<OnboardingPage onLogin={handleLogin} />} />

        {/* 🔑 NEW PUBLIC PROFILE ROUTE: This must be defined outside AppLayout 
             if you don't want the student profile to show the sidebar/navbar
             of the logged-in app, as requested previously. 
             If you want the full app chrome, move it inside AppLayout. 
        */}
        <Route path="/profile/:studentId" element={
            <>
                <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
                <StudentProfilePage />
            </>
        } />


 {/* Logged-in pages still use the real isLoggedIn state */}
 <Route element={<AppLayout isLoggedIn={isLoggedIn} onLogout={handleLogout} />}>
 <Route path="/dashboard" element={<DashboardPage />} />
 <Route path="/leaderboard" element={<LeaderboardPage />} />
 <Route path="/codepad" element={<CodePadPage />} />
 <Route path="/career-suite" element={<CareerSuitePage />} />
<Route path="/courses" element={<CoursesPage />} />
 <Route path="/contests" element={<ContestsPage />} />
 <Route path="/profile" element={<ProfilePage />} />
 <Route path="/settings" element={<SettingsPage />} />
 </Route>
</Routes>
 </div>
 );
}

export default App;