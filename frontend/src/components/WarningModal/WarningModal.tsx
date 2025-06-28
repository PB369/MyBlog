import { useEffect, useRef } from 'react';
import styles from './css/WarningModal.module.scss';

export enum WarningCategory {
  guestModeIsTrue = "guestModeIsTrue",
}

type Modal = {
  category: 'guestModeIsTrue',
  closeModal: () => void,
  isVisible: boolean,
}

const modalMensages: Record<WarningCategory, string> = {
  [WarningCategory.guestModeIsTrue]: 'Guest Mode is enabled. You will be able to experience all the features of a real administrator, but the changes will not reflect the real data of the application, article banners will not be saved, and the view metrics and like button will be disabled. To exit Guest Mode, click the log out button and confirm. After that, all modified data will be reset.',
}

const WarningModal = ({category, isVisible, closeModal} : Modal) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const handleOutsideClick = (event: MouseEvent) => {
      if(modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    }

    if(isVisible){document.addEventListener('mousedown', handleOutsideClick);}
    
    return () => document.removeEventListener('mousedown', handleOutsideClick);

  }, [isVisible, closeModal]);

  return (
    <div className={styles.centralizedModalContainer} ref={modalRef}>
      <h2>Warning</h2>
      <p>{modalMensages[category]}</p>
      <div className={styles.buttonsContainer}>
        <button className={styles.okButton} onClick={closeModal}>Ok, I understood</button>
      </div>
    </div>
  )
}

export default WarningModal;