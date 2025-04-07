import { Link } from 'react-router-dom';
import styles from './css/Header.module.scss';
import { useTheme } from '../../context/ThemeContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={`${styles.pageHeader} ${styles[theme]}`}>
      <div id={styles.left}/> {/*This empty div is to allow the desired position for h1 and the login/themeToggle div */}
      <div id={styles.center}>
        <h1>My Blog</h1>
      </div>
      <div id={styles.right}>
        <Link to={'/login'} className={styles.link}>Login</Link>
        <button onClick={toggleTheme}>
          <img src={theme === "light" ? "../../../moon-icon.png" : "../../../sun-icon-dark.png"} alt={theme === "light" ? "moon-icon" : "sun-icon"} />
        </button>
      </div>
    </header>
  )
}

export default Header;