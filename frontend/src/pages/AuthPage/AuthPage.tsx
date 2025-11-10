import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiArrowLeftLine, RiGoogleFill } from 'react-icons/ri';
import styles from './AuthPage.module.css';

// --- FIREBASE IMPORTS ---
import { auth } from '../../firebase';
import { GoogleAuthProvider, signInWithPopup, getAdditionalUserInfo } from 'firebase/auth';

// --- IMAGE IMPORTS ---
import slide1 from '../../assets/images/slide-1.svg';
import slide2 from '../../assets/images/slide-2.svg';
import slide3 from '../../assets/images/slide-3.svg';
import slide4 from '../../assets/images/coding-illustration.svg';

// --- SLIDE DATA ---
const slides = [
  {
    image: slide1,
    title: 'Connect with peers and access learning resources',
    description: 'Join a community of like-minded programmers.',
  },
  {
    image: slide2,
    title: 'Monitor your progress across coding platforms',
    description: 'Visualize your growth with comprehensive performance metrics.',
  },
  {
    image: slide3,
    title: 'Showcase your technical skills and competitive achievements',
    description: 'Build your coding portfolio with verified accomplishments.',
  },
  {
    image: slide4,
    title: 'Track your coding journey, showcase',
    description: 'All in one platform tailored for MVSR students.',
  },
];


const AuthPage = ({ onLogin }: { onLogin: () => void }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Effect for the carousel timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // --- GOOGLE SIGN-IN FUNCTION WITH ONBOARDING LOGIC ---
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      
      // Check if this is the first time the user has signed in
      const additionalInfo = getAdditionalUserInfo(result);

      if (additionalInfo?.isNewUser) {
        // If it's a new user, send them to the questionnaire
        navigate('/onboarding');
      } else {
        // If it's a returning user, call onLogin to go to the dashboard
        onLogin();
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  return (
    <div className={styles.authContainer}>
      {/* Left Panel */}
      <div className={styles.leftPanel}>
        <Link to="/" className={styles.goBack}>
          <span className={styles.backIcon}><RiArrowLeftLine /></span>
          <span className={styles.backText}>Go Back</span>
        </Link>
        <div className={styles.carouselWrapper}>
          <div className={styles.illustrationContainer} key={currentSlide}>
            <img src={slides[currentSlide].image} alt="Feature illustration" className={styles.illustration} />
            <div className={styles.carouselDots}>
              {slides.map((_, index) => (
                <span key={index} className={`${styles.dot} ${currentSlide === index ? styles.activeDot : ''}`} ></span>
              ))}
            </div>
          </div>
          <div className={styles.panelText} key={currentSlide + '-text'}>
            <h3>{slides[currentSlide].title}</h3>
            <p>{slides[currentSlide].description}</p>
          </div>
        </div>
      </div>

      {/* Right Panel (Simplified for Google-Only Sign-In) */}
      <div className={styles.rightPanel}>
        <div className={styles.formContent}>
          <div className={styles.logoContainer}>
            <h2>CodeSync - Code Stats</h2>
          </div>
          <h3 className={styles.title}>Get Started</h3>
          <p className={styles.description}>
            Sign in with your Google account to start tracking your competitive programming progress.
          </p>
          <button className={styles.googleButton} onClick={handleGoogleSignIn}>
            <RiGoogleFill /> Sign In with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;