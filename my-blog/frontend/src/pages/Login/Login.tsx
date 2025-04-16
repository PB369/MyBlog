import styles from './css/Login.module.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useTheme } from '../../context/ThemeContext';
import LoginForm from '../../components/LoginForm/LoginForm';

const Login = () => {
  const { theme } = useTheme();

  return (
    <div className={`${styles.loginPageContainer} ${styles[theme]}`}>
      <Header/>
      <LoginForm/>
      <Footer/>
    </div>
  )
}

export default Login;