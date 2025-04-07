import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './css/Header.module.scss';
import { useTheme } from '../../context/ThemeContext';
import { useMediaQuery } from '../../utils/windowWidth';
import { useCheckDarkMode, useThemedIcon } from '../../utils/conditionalsHooks';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const navigateTo = useNavigate();
  const actualURL = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const themedLoginIcon = useThemedIcon("login-icon.png");

  return (
    <header className={`${styles.pageHeader} ${styles[theme]}`}>
      <div id={styles.left}/> {/*This empty div is to allow the desired position for h1 and the login/themeToggle div */}
      <div id={styles.center}>
        <h1 onClick={() => navigateTo('/')} tabIndex={0} role='link' onKeyDown={(event) => event.key === "Enter" && navigateTo('/')}>My Blog</h1>
      </div>
      <div id={styles.right}>
        {actualURL.pathname !== "/login" && <Link to={'/login'} className={styles.link}>{isMobile ? <img src={themedLoginIcon} alt=''/> : "Login"}</Link>}
        <button onClick={toggleTheme}>
          <img src={useThemedIcon("toggleTheme-icon.png")} alt={useCheckDarkMode() ? "sun-icon" : "moon-icon"} />
        </button>
      </div>
    </header>
  )
}

export default Header;