import { useEffect, useRef } from 'react';
import styles from './css/ChoiceModal.module.scss';

export enum ActionsCategory {
  deleteParagraph = "deleteParagraph",
  deleteArticle = "deleteArticle",
  logout = "logout",
}

type Modal = {
  category: 'deleteParagraph' | 'deleteArticle' | 'logout',
  closeModal: () => void,
  isVisible: boolean,
  confirmChoice: () => void,
}

const modalMensages: Record<ActionsCategory, string> = {
  [ActionsCategory.deleteArticle]: 'Do you want to delete this article?',
  [ActionsCategory.deleteParagraph]: 'Do you want to delete this paragraph?',
  [ActionsCategory.logout]: 'Do you want to logout?',
}

const ChoiceModal = ({category, isVisible, closeModal, confirmChoice} : Modal) => {
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
      <p>{modalMensages[category]}</p>
      <div className={styles.buttonsContainer}>
        <button className={styles.cancelButton} onClick={closeModal}>Cancel</button>
        <button className={styles.yesButton} onClick={confirmChoice}>Yes</button>
      </div>
    </div>
  )
}

export default ChoiceModal;