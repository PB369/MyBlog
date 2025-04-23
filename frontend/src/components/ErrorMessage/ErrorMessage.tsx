import { useRef } from 'react';
import styles from './css/ErrorModal.module.scss';

type Props = {
  hideMessage: () => void,
  isVisible: boolean,
  actionName: string,
  errorCategory: string,
}

const ErrorMessage = ({actionName, errorCategory, isVisible, hideMessage} : Props) => {

  const errorMessages = {
    "LoginInvalidError": "Username or password is invalid.",
    "ServerIssuesError": `The ${actionName} action couldn't be done due to server issues.`,
    
  }

  const modalRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.errorContainer} ref={modalRef}>
      <img src="../../../OtherIcons/error-icon.png" alt="Error-icon" />
      <p>{errorMessages[errorCategory]}</p>
    </div>
  )
}

export default ErrorMessage;