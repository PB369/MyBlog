import { useEffect, useRef, useState } from 'react';
import ErrorMessage, { Errors } from '../ErrorMessage/ErrorMessage';
import styles from './css/TagSettingsModal.module.scss';

type Props = {
  closeModal: () => void,
  tags: string[],
  setArticleTags: React.Dispatch<React.SetStateAction<string[]>>,
}

const TagSettingsModal = ({closeModal, tags, setArticleTags}: Props) => {

  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [errorCategory, setErrorCategory] = useState<Errors | null>(null);
  const [selectedTagsList, setSelectedTagsList] = useState<string[]>([]);
  const inputAddTag = useRef<HTMLInputElement | null>(null);

  const handleSelectTag = (tagName: string) => {
    setSelectedTagsList(prev => prev.includes(tagName) ? prev.filter(tag => tag !== tagName) : [...prev, tagName]);
  }

  const removeTag = () => {

    setArticleTags(prev => prev.filter((tag) => !selectedTagsList.includes(tag)));
  }

  const addTag = () => {
    const modalInput = inputAddTag.current;
    if(modalInput) {
      setArticleTags(prev => [...prev, modalInput.value]);
    }
  }

  const throwError = (category: Errors) => {
    setErrorCategory(category)
    setShowErrorMessage(true);
  }

  const handleConfirmChoice = () => {
    const modalInput = inputAddTag.current;
    const inputHasValue = modalInput && modalInput.value.length > 0;
    const hasSelectedTags = selectedTagsList.length > 0;
    const articleHasTags = tags.length > 0;

    setShowErrorMessage(false);
    setErrorCategory(null);

    if (articleHasTags) {
      if(!inputHasValue && !hasSelectedTags){
        throwError(Errors.NoTagSettingsActionDefined);
        return
      }
      
      if (hasSelectedTags) {
        removeTag();
        closeModal();
      }

      if(inputHasValue) {
        if(!tags.includes(modalInput.value)) {
          if(tags.length < 5) {
            addTag();
            closeModal();
          } else {
            throwError(Errors.TagsLimitReached);
          }
        } else {
          throwError(Errors.TagAlreadyExist);
        }
      }
    } else {
      if (inputHasValue){
        addTag();
        closeModal();
      } else {
        throwError(Errors.TagNameIsMissing);
      }
    }
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

export default TagSettingsModal;