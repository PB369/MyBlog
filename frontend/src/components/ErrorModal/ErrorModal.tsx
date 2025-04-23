import { useEffect, useRef } from 'react';
import styles from './css/ErrorModal.module.scss';

type Modal = {
  closeModal: () => void,
  isVisible: boolean,
}

const ErrorModal = ({isVisible, closeModal} : Modal) => {
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
    <div className={styles.modalContainer} ref={modalRef}>
      <p>{`It was not possible to do this action. Check the browser console to more information.`}</p>
      <div className={styles.buttonsContainer}>
        <button className={styles.okButton} onClick={closeModal}>Ok</button>
      </div>
    </div>
  )
}

export default ErrorModal;