import { ReactNode, useState } from 'react';
import styles from './css/Save&PublishButtons.module.scss'
import { ArticleType, createArticle, putArticleBanner, updateArticle } from '../../api/articlesAPI';
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

  console.log("file: ", article.banner_file);
  console.log("file name: ", article.banner_name);
  const saveArticle = async () => {
    setShowErrorMessage(false);
    setSaveButtonText("Saving...");

    if(article.banner_file !== undefined){
      await putArticleBanner(article.banner_file)
      .then((response) => {
        article.banner_name = response;
        console.log(article.banner_name);
      })
      .catch((error) => console.error(error));
    }

    if(isNewArticle) {
      await createArticle(article)
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
      await updateArticle(article)
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