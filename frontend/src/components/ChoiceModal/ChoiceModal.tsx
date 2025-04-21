import { useEffect, useRef } from 'react';
import styles from './css/ChoiceModal.module.scss';

type Modal = {
  modalType: 'delete' | 'logout',
  closeModal: () => void,
  isVisible: boolean,
  confirmChoice: () => void,
}

const ChoiceModal = ({modalType, isVisible, closeModal, confirmChoice} : Modal) => {
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
      <p>{modalType === 'delete' ? 'Do you want to delete this article?' : 'Do you want to log out?'}</p>
      <div className={styles.buttonsContainer}>
        <button className={styles.cancelButton} onClick={closeModal}>Cancel</button>
        <button className={styles.yesButton} onClick={confirmChoice}>Yes</button>
      </div>
    </div>
  )
}

export default ChoiceModal;