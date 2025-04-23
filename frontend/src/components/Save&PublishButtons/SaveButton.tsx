import { ReactNode, useState } from 'react';
import styles from './css/Save&PublishButtons.module.scss'
import { createArticle, updateArticle } from '../../api/articlesAPI';

type Props = {
  isNewArticle: boolean,
  setShowErrorMessage: (argument: boolean) => void,
}

const SaveButton = ({isNewArticle, setShowErrorMessage}: Props) => {

  const [saveButtonText, setSaveButtonText] = useState<string | ReactNode>("Save");

  const buttonsTextReset = () => {return setTimeout(() => {
    setSaveButtonText("Save");
  }, 2000)};
  const timeoutId = buttonsTextReset();

  const saveArticle = () => {
    setShowErrorMessage(false);
    if(isNewArticle) {
      createArticle(article)
      .then(() => {
        setSaveButtonText("Saved!");
        buttonsTextReset();
        clearTimeout(timeoutId);
      })
      .catch((error) => {
        console.error(error);
        setShowErrorMessage(true);
        setErrorCategory(Errors.ServerError);
      });
    } else {
      updateArticle(article)
      .then(() => {
        setSaveButtonText("Saved!");
        buttonsTextReset();
        clearTimeout(timeoutId);
      })
      .catch((error) => {
        console.error(error);
        setShowErrorMessage(true);
        setErrorCategory(Errors.ServerError);
      });
    }
  }

  return (
    <button className={styles.saveButton} onClick={saveArticle}>{saveButtonText}</button>
  )
}

export default SaveButton;