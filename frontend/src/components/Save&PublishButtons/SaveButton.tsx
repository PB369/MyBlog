import { ReactNode, useState } from 'react';
import styles from './css/Save&PublishButtons.module.scss'
import { ArticleType, createArticle, updateArticle } from '../../api/articlesAPI';
import { Errors } from '../ErrorMessage/ErrorMessage';

type Props = {
  isNewArticle: boolean,
  setShowErrorMessage: (argument: boolean) => void,
  setErrorCategory: (argument: Errors) => void,
  article: ArticleType,
}

const SaveButton = ({isNewArticle, setShowErrorMessage, setErrorCategory, article}: Props) => {

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