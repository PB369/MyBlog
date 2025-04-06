import { Link } from 'react-router-dom';
import './css/Header.module.scss';

const Header = () => {
  return (
    <header>
      <h1>My Blog</h1>
      <div>
        <Link to={'/login'}>Login</Link>
        <img src="../../../public/moon-icon.png" alt="moon-icon" />
      </div>
    </header>
  )
}

export default Header;