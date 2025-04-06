import './css/Login.module.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <>
      <Header/>
      <form action="*" method='post'>
        <h2>Administrator Login</h2>
        <label htmlFor="usernameInput">Username:</label>
        <input type="text" id="usernameInput"/>
        <label htmlFor="passwordInput">Password:</label>
        <input type="text" id="passwordInput"/>
        <Link to={'/management'}>Access</Link>
        {/* <p>Username or password is invalid</p> */}
      </form>
      <Footer/>
    </>
  )
}

export default Login;