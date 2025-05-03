import { useState } from 'react';
import ErrorMessage, { Errors } from '../ErrorMessage/ErrorMessage';
import styles from './css/AddTagsModal.module.scss';
import { useThemedIcon } from '../../hooks/ConditionalsHooks';

type Props = {
  isVisible: boolean,
  confirmChoice: () => void,
  closeModal: () => void,
  tags: string[],
  setArticleTags:  () => void,
}

const AddTagsModal = ({isVisible, confirmChoice, closeModal, tags, setArticleTags}: Props) => {

  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [errorCategory, setErrorCategory] = useState<Errors | null>(null);
  const arrowHeadToLeftIconPath = useThemedIcon('arrow-head-to-left-icon.png');
  const arrowHeadToRightIconPath = useThemedIcon('arrow-head-to-right-icon.png');

  return (
    <div className={styles.modalContainer}>
      <div className={styles.addNewTagContainer}>
        <p>Add a new tag</p>
        <input type="text" placeholder='New tag name...'/>
      </div>

      <div className={styles.deleteTagsContainer}>
        <p>Or select an existing one to delete:</p>
        <div className={styles.selectTagsContainer}>
          <button><img src={arrowHeadToLeftIconPath} alt="arrow-to-left-icon" /></button>
          <div className={styles.existingTagsContainer}>
            {tags.map((tag, index) => <span key={index} className={styles.tags}>{tag}</span>)}
          </div>
          <button><img src={arrowHeadToRightIconPath} alt="arrow-to-right-icon" /></button>
        </div>
      </div>

      {showErrorMessage && errorCategory && <ErrorMessage category={errorCategory}/>}

      <div className={styles.buttonsContainer}>
        <button className={styles.cancelButton} onClick={closeModal}>Cancel</button>
        <button className={styles.confirmButton} onClick={confirmChoice}>Confirm</button>
      </div>
    </div>
  )
}

export default AddTagsModal;