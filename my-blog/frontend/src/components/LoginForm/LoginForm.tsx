import { Link } from "react-router-dom";
import styles from './css/LoginForm.module.scss';
import { useThemedIcon } from "../../utils/conditionalsHooks";

const LoginForm = () => {

  return (
    <div className={styles.formContainer}>
      <form action="*" method='post' className={styles.loginForm}>
          <h2>Administrator Login</h2>
          <fieldset>
            <label htmlFor="usernameInput">Username:</label>
            <div className={styles.inputContainer}>
              <input type="text" id="usernameInput"/>
              <img src={useThemedIcon("user-icon.png")} alt="user-icon" />
            </div>
          </fieldset>
          <fieldset>
            <label htmlFor="passwordInput">Password:</label>
            <div className={styles.inputContainer}>
              <input type="password" id="passwordInput"/>
              <img src={useThemedIcon("padlock-icon.png")} alt="padlock-icon" />
            </div>
          </fieldset>
          <Link to={'/management'} className={styles.link}>Access</Link>
          {/* <p>Username or password is invalid</p> */}
      </form>
    </div>
  )
}

export default LoginForm;