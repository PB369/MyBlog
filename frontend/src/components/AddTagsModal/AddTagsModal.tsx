import { useRef, useState } from 'react';
import ErrorMessage, { Errors } from '../ErrorMessage/ErrorMessage';
import styles from './css/AddTagsModal.module.scss';
import { useThemedIcon } from '../../hooks/ConditionalsHooks';

type Props = {
  isVisible: boolean,
  confirmChoice: () => void,
  closeModal: () => void,
  tags: string[],
  setArticleTags: React.Dispatch<React.SetStateAction<string[]>>,
}

const AddTagsModal = ({isVisible, confirmChoice, closeModal, tags, setArticleTags}: Props) => {

  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [errorCategory, setErrorCategory] = useState<Errors | null>(null);
  const arrowHeadToLeftIconPath = useThemedIcon('arrow-head-to-left-icon.png');
  const arrowHeadToRightIconPath = useThemedIcon('arrow-head-to-right-icon.png');
  const [selectedTagsList, setSelectedTagsList] = useState<string[]>([]);
  const inputAddTag = useRef<HTMLInputElement | null>(null);

  const handleSelectTag = (tagName: string) => {
    setSelectedTagsList(prev => prev.includes(tagName) ? prev.filter(tag => tag !== tagName) : [...prev, tagName]);
  }

  const handleConfirmChoice = () => {
    if(selectedTagsList.length > 0) {
      setArticleTags(prev => prev.filter((tag) => !tags.includes(tag)));
    }
    
    const modalInput = inputAddTag.current
    
    if(modalInput && modalInput.value.length > 0 && !selectedTagsList.includes(modalInput.value)) {
      setArticleTags(prev => [...prev, modalInput.value])
    }
    closeModal();
  }

  return (
    <div className={styles.modalContainer}>
      <div className={styles.addNewTagContainer}>
        <p>Add a new tag</p>
        <input type="text" placeholder='New tag name...' ref={inputAddTag}/>
      </div>

      {tags.length > 0 && 
        <div className={styles.deleteTagsContainer}>
          <p>Or select an existing one to delete:</p>
          <div className={styles.selectTagsContainer}>
            <div className={styles.existingTagsContainer}>
              {tags.map((tag, index) => <span key={index} className={`${styles.tags} ${selectedTagsList.includes(tag) ? styles.selectedTag : ''}`} onClick={() => handleSelectTag(tag)}>{tag}</span>)}
            </div>
          </div>
        </div>
      }

      {showErrorMessage && errorCategory && <ErrorMessage category={errorCategory}/>}

      <div className={styles.buttonsContainer}>
        <button className={styles.cancelButton} onClick={closeModal}>Cancel</button>
        <button className={styles.confirmButton} onClick={handleConfirmChoice}>Confirm</button>
      </div>
    </div>
  )
}

export default AddTagsModal;