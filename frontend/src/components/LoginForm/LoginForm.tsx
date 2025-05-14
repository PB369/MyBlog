import { useNavigate } from "react-router-dom";
import styles from './css/LoginForm.module.scss';
import { useThemedIcon } from "../../hooks/ConditionalsHooks";
import { useState } from "react";
import { managerLogin } from "../../api/authenticationAPI";
import ErrorMessage, { Errors } from "../ErrorMessage/ErrorMessage";

const LoginForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setShowErrorMessage(false);
    try {
      const token = await managerLogin(username, password);
      localStorage.setItem("token", token);
      navigate("/management");
    } catch {
      setShowErrorMessage(true);
    }
  }

  return (
    <div className={styles.formContainer}>
      <form action="*" method='post' className={styles.loginForm} onSubmit={handleSubmit}>
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
          <button className={styles.link}>Access</button>
          {showErrorMessage && <ErrorMessage category={Errors.LoginValidation} />}
      </form>
    </div>
  )
}

export default LoginForm;