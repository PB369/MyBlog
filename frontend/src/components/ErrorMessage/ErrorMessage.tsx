import styles from './css/ErrorModal.module.scss';

export enum Errors {
  LoginValidation = "LoginValidation",
  ServerError = "ServerError",
}

export const errorTexts: Record<Errors, string> = {
  [Errors.LoginValidation]: "Username or password is invalid.",
  [Errors.ServerError]: "This action couldn't be done due to server issues.",
}

interface Props {
  category: Errors,
}

const ErrorMessage: React.FC<Props> = ({category}) => {
  const errorIconPath = "/OtherIcons/error-icon.png";

  return (
    <div className={styles.errorContainer}>
      <img src={errorIconPath} alt="Error-icon" />
      <p>{errorTexts[category]}</p>
    </div>
  )
}

export default ErrorMessage;