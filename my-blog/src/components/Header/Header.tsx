import { Link } from 'react-router-dom';
import './css/Header.module.scss';
import { useTheme } from '../../context/ThemeContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header>
      <h1>My Blog</h1>
      <div>
        <Link to={'/login'}>Login</Link>
        <button onClick={toggleTheme}>
          <img src={theme === "light" ? "../../../public/moon-icon.png" : "../../../public/sun-icon.png"} alt={theme === "light" ? "moon-icon" : "sun-icon"} />
        </button>
      </div>
    </header>
  )
}

export default Header;