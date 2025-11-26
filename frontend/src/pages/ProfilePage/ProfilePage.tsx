import React, { useState, useEffect } from "react";
import styles from "./ProfilePage.module.css";
import ProfileSetupForm from "./ProfileSetupForm";
import AddItemModal from "./AddItemModal"; // Import the AddItemModal

import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";

import {
  RiPencilFill,
  RiMailFill,
  RiPhoneFill,
  RiBuilding4Fill,
  RiIdCardFill,
  RiGithubFill,
  RiLinkedinFill,
  RiAddFill,
  RiTrophyFill,
  RiCodeSSlashLine,
  RiBriefcaseFill,
  RiCheckboxCircleFill,
} from "react-icons/ri";

// -----------------------------
// STATIC PROFILE DATA
// -----------------------------
const profileDetails = {
  rollNumber: "23RZ1A05C9",
  department: "CSE",
  phone: "6301055280",
  university: "MLR Institute of Technology",
  about:
    "My name is Manish Beesa, and I am currently pursuing a Bachelor of Technology (B.Tech) degree at MLR Institute of Technology, specializing in Computer Science. I am expected to graduate in 2027. I enjoy solving real-world problems through code and continuously strive to improve my technical and analytical skills. I'm also actively involved in coding communities and always eager to collaborate on innovative tech projects.",
  skills: [
    "JavaScript",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "Python",
    "Java",
    "HTML",
    "CSS",
    "C++",
    "MySQL",
  ],
  interests: ["Full Stack Development", "Machine Learning", "Startups", "Open Source"],
};

// -----------------------------
// TABS CONFIG
// -----------------------------
const tabsData = [
  { name: "Achievements", icon: RiTrophyFill, count: 0, limit: null },
  { name: "Projects", icon: RiCodeSSlashLine, count: 0, limit: 5 },
  { name: "Internships", icon: RiBriefcaseFill, count: 0, limit: 5 },
  { name: "Certifications", icon: RiCheckboxCircleFill, count: 0, limit: null },
];

// -----------------------------
// MAIN COMPONENT
// -----------------------------
const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Achievements");
  
  // State for Modals
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingItem, setIsAddingItem] = useState(false); // New state for Add Item modal

  // Listen for authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSaveItem = (newItem: any) => {
    console.log("New Item Created:", newItem);
    // TODO: Add logic to save this new item to your backend/state
    // e.g., update a list of items for the current 'activeTab'
  };

  if (loading) {
    return <div className={styles.loading}>Loading Profile...</div>;
  }

  const displayUser = user || {
    displayName: "BEESA MANISH B",
    email: "23r21a05c9@mlrit.ac.in",
    photoURL: null,
  };

  const initialLetter = displayUser.displayName
    ? displayUser.displayName.charAt(0).toUpperCase()
    : "U";

  return (
    <div className={styles.pageContainer}>
      
      {/* Edit Profile Modal */}
      {isEditing && (
        // Wrapper to handle closing if ProfileSetupForm doesn't have internal close logic
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000 }}> 
             <ProfileSetupForm /> 
             {/* Ideally pass onClose={() => setIsEditing(false)} to ProfileSetupForm */}
        </div>
      )}

      {/* Add Item Modal */}
      {isAddingItem && (
        <AddItemModal 
          onClose={() => setIsAddingItem(false)} 
          onSave={handleSaveItem} 
        />
      )}

      {/* ---------------------------------
          MAIN PROFILE BLOCK
      --------------------------------- */}
      <div className={styles.mainProfileBlock}>
        {/* HEADER */}
        <div>
          <div className={styles.blueBanner}></div>

          <div className={styles.headerContent}>
            <div className={styles.profileFlex}>
              {displayUser.photoURL ? (
                <img
                  src={displayUser.photoURL}
                  alt="Profile"
                  className={styles.avatar}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className={styles.avatarPlaceholder}>{initialLetter}</div>
              )}

              <div className={styles.identity}>
                <h1 className={styles.name}>{displayUser.displayName}</h1>
                <span className={styles.roleBadge}>
                  {profileDetails.department} Department
                </span>
              </div>

              <button
                className={styles.editBtn}
                onClick={() => setIsEditing(true)}
              >
                <RiPencilFill /> Edit Profile
              </button>
            </div>

            {/* Contact Grid */}
            <div className={styles.contactGrid}>
              <div className={styles.contactItem}>
                <RiIdCardFill />
                <div className={styles.contactText}>
                  <span className={styles.contactLabel}>Roll Number</span>
                  <span className={styles.contactValue}>{profileDetails.rollNumber}</span>
                </div>
              </div>

              <div className={styles.contactItem}>
                <RiBuilding4Fill />
                <div className={styles.contactText}>
                  <span className={styles.contactLabel}>Department</span>
                  <span className={styles.contactValue}>{profileDetails.department}</span>
                </div>
              </div>

              <div className={styles.contactItem}>
                <RiMailFill />
                <div className={styles.contactText}>
                  <span className={styles.contactLabel}>Email</span>
                  <span className={styles.contactValue}>{displayUser.email}</span>
                </div>
              </div>

              <div className={styles.contactItem}>
                <RiPhoneFill />
                <div className={styles.contactText}>
                  <span className={styles.contactLabel}>Phone</span>
                  <span className={styles.contactValue}>{profileDetails.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ABOUT / SKILLS / INTERESTS / SOCIAL */}
        <div className={styles.sectionContainer}>
          {/* About */}
          <div className={styles.subCard}>
            <h3 className={styles.sectionTitle}>About</h3>
            <p className={styles.aboutText}>{profileDetails.about}</p>
          </div>

          {/* Split Grid */}
          <div className={styles.splitGrid}>
            <div className={styles.subCard}>
              <h3 className={styles.sectionTitle}>Skills</h3>
              <div className={styles.tagsContainer}>
                {profileDetails.skills.map((skill, idx) => (
                  <span key={idx} className={styles.tag}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.subCard}>
              <h3 className={styles.sectionTitle}>Interests</h3>
              <div className={styles.tagsContainer}>
                {profileDetails.interests.map((interest, idx) => (
                  <span key={idx} className={styles.tag}>
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Social */}
          <div className={styles.subCard}>
            <h3 className={styles.sectionTitle}>Social Links</h3>
            <div className={styles.socialIcons}>
              <a href="#" className={`${styles.iconBtn} ${styles.linkedinIcon}`}>
                <RiLinkedinFill />
              </a>
              <a href="#" className={`${styles.iconBtn} ${styles.githubIcon}`}>
                <RiGithubFill />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------
          PORTFOLIO SECTION
      --------------------------------- */}
      <div className={styles.card}>
        <div className={styles.portfolioHeader}>
          <h3 className={styles.sectionTitle}>Portfolio</h3>
          <button 
            className={styles.addBtn}
            onClick={() => setIsAddingItem(true)} // Triggers the Add Item Modal
          >
            <RiAddFill /> Add New
          </button>
        </div>

        {/* Tabs */}
        <div className={styles.tabsContainer}>
          {tabsData.map((tab) => {
            const Icon = tab.icon;
            const countDisplay =
              tab.limit !== null ? `${tab.count}/${tab.limit}` : `${tab.count}`;

            return (
              <button
                key={tab.name}
                className={`${styles.tab} ${
                  activeTab === tab.name ? styles.active : ""
                }`}
                onClick={() => setActiveTab(tab.name)}
              >
                <Icon style={{ fontSize: "1.1rem" }} />
                {tab.name}
                <span className={styles.tabCount}>{countDisplay}</span>
              </button>
            );
          })}
        </div>

        <div className={styles.portfolioContent}>
          <div className={styles.emptyState}>
            No {activeTab.toLowerCase()} added yet
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;