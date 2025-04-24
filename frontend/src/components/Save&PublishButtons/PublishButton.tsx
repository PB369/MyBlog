import { ReactNode, useState } from 'react';
import { ArticleType, createArticle, updateArticle } from '../../api/articlesAPI';
import { Errors } from '../ErrorMessage/ErrorMessage';
import styles from './css/Save&PublishButtons.module.scss'

type Props = {
  isNewArticle: boolean,
  setShowErrorMessage: (argument: boolean) => void,
  setErrorCategory: (argument: Errors) => void,
  article: ArticleType,
}

const PublishButton = ({isNewArticle, setShowErrorMessage, setErrorCategory, article}: Props) => {
  
  const [publishButtonText, setPublishButtonText] = useState<string | ReactNode>("Save");

  const buttonsTextReset = () => {return setTimeout(() => {
    setPublishButtonText("Publish");
  }, 2000)};
  const timeoutId = buttonsTextReset();

  const publishArticle = () => {
    setShowErrorMessage(false);
    if(isNewArticle) {
      createArticle(article)
      .then(() => {
        setPublishButtonText("Published!");
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
        setPublishButtonText("Saved!");
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
    <button className={styles.publishButton} onClick={publishArticle}>{publishButtonText}</button>
  )
}

export default PublishButton;