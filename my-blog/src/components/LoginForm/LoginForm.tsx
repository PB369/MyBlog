import { Link } from "react-router-dom";
import styles from './css/LoginForm.module.scss';

const LoginForm = () => {
  return (
    <form action="*" method='post' className={styles.loginForm}>
        <h2>Administrator Login</h2>
        <label htmlFor="usernameInput">Username:</label>
        <input type="text" id="usernameInput"/>
        <label htmlFor="passwordInput">Password:</label>
        <input type="text" id="passwordInput"/>
        <Link to={'/management'}>Access</Link>
        {/* <p>Username or password is invalid</p> */}
      </form>
  )
}

export default LoginForm;