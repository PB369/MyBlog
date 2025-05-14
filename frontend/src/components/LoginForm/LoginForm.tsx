import { Link } from "react-router-dom";
import styles from './css/LoginForm.module.scss';
import { useThemedIcon } from "../../hooks/ConditionalsHooks";
import { useState } from "react";
import { managerLogin } from "../../api/authenticationAPI";
import ErrorMessage, { Errors } from "../ErrorMessage/ErrorMessage";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setShowErrorMessage(false);
    try {
      
      const token = await managerLogin(username, password);
      localStorage.setItem("token", token);
    } catch {
      setShowErrorMessage(true);
    }
  }

  return (
    <div className={styles.formContainer}>
      <form action="*" method='post' className={styles.loginForm}>
          <h2>Administrator Login</h2>
          <fieldset>
            <label htmlFor="usernameInput">Username:</label>
            <div className={styles.inputContainer}>
              <input type="text" id="usernameInput" onChange={e => setUsername(e.target.value)}/>
              <img src={useThemedIcon("user-icon.png")} alt="user-icon" />
            </div>
          </fieldset>
          <fieldset>
            <label htmlFor="passwordInput">Password:</label>
            <div className={styles.inputContainer}>
              <input type="password" id="passwordInput" onChange={e => setPassword(e.target.value)}/>
              <img src={useThemedIcon("padlock-icon.png")} alt="padlock-icon" />
            </div>
          </fieldset>
          <Link to={'/management'} className={styles.link}>Access</Link>
          {showErrorMessage && <ErrorMessage category={Errors.LoginValidation} />}
      </form>
    </div>
  )
}

export default LoginForm;