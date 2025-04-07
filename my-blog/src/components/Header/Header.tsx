import { Link } from 'react-router-dom';
import styles from './css/Header.module.scss';
import { useTheme } from '../../context/ThemeContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={`${styles.pageHeader} ${styles[theme]}`}>
      <h1>My Blog</h1>
      <div>
        <Link to={'/login'} className={styles.link}>Login</Link>
        <button onClick={toggleTheme}>
          <img src={theme === "light" ? "../../../moon-icon.png" : "../../../sun-icon.png"} alt={theme === "light" ? "moon-icon" : "sun-icon"} />
        </button>
      </div>
    </header>
  )
}

export default Header;