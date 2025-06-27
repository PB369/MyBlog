import { useNavigate } from "react-router-dom";
import styles from './css/LoginForm.module.scss';
import { useThemedIcon } from "../../hooks/ConditionalsHooks";
import { useState } from "react";
import { managerLogin } from "../../api/authenticationAPI";
import ErrorMessage, { Errors } from "../ErrorMessage/ErrorMessage";
import { getArticlesWithBanner } from "../../api/articlesAPI";

const LoginForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleManagerAccess = async (event: React.FormEvent) => {
    event.preventDefault();
    setShowErrorMessage(false);
    try {
      const token = await managerLogin(username, password);
      localStorage.setItem("token", token);
      localStorage.setItem("isGuest", "false");
      localStorage.setItem("showGuestWarning", "false");
      navigate("/management");
    } catch {
      setShowErrorMessage(true);
    }
  }

  const handleGuestAccess = async (event: React.FormEvent) => {
    event.preventDefault();
    setShowErrorMessage(false);
    try {
      const articles = await getArticlesWithBanner();
      localStorage.setItem("guestArticles", JSON.stringify(articles));
      localStorage.setItem("isGuest", "true");
      localStorage.setItem("showGuestWarning", "true");
      navigate("/management");
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
          <button className={styles.accessBtn} onClick={handleManagerAccess}>Access</button>
          <button className={styles.guestBtn} onClick={handleGuestAccess}>Or continue as a guest</button>
          {showErrorMessage && <ErrorMessage category={Errors.LoginValidation} />}
      </form>
    </div>
  )
}

export default LoginForm;