import { ReactNode, useState } from 'react';
import styles from './css/Save&PublishButtons.module.scss'
import { ArticleType, createArticle, putArticleBanner, updateArticle } from '../../api/articlesAPI';
import { Errors } from '../ErrorMessage/ErrorMessage';
import { isGuest } from '../../utils/checkGuestMode';

type Props = {
  isNewArticle: boolean,
  setIsNewArticle: React.Dispatch<React.SetStateAction<boolean>>,
  setShowErrorMessage: (argument: boolean) => void,
  setErrorCategory: (argument: Errors) => void,
  article: ArticleType,
}

const SaveButton = ({isNewArticle, setIsNewArticle, setShowErrorMessage, setErrorCategory, article}: Props) => {

  const [saveButtonText, setSaveButtonText] = useState<string | ReactNode>("Save");

  const buttonsTextReset = () => {return setTimeout(() => {
    setSaveButtonText("Save");
  }, 2000)};
  const timeoutId = buttonsTextReset();

  const saveArticle = async () => {
    setShowErrorMessage(false);
    setSaveButtonText("Saving...");

    if (isGuest()) {
    try {
      const stored = localStorage.getItem("guestArticles");
      const guestArticles = stored ? JSON.parse(stored) : [];

      const updatedArticle = {
        ...article,
        id: isNewArticle ? Date.now() : article.id,
        banner_file: undefined,
      };

      let newList: ArticleType[];

      if(isNewArticle){
        newList = [...guestArticles, updatedArticle]
        setIsNewArticle(false);
      } else {
        newList = guestArticles.map((a: ArticleType) => a.id === article.id ? updatedArticle : a);
      }

      localStorage.setItem("guestArticles", JSON.stringify(newList));
      setSaveButtonText("Saved!");
      buttonsTextReset();
      clearTimeout(timeoutId);
    } catch (error) {
      console.error(error);
      setShowErrorMessage(true);
      setErrorCategory(Errors.ServerError);
    }
    return;
  }

    if(article.banner_file !== undefined){
      await putArticleBanner(article.banner_file)
      .then((response) => {
        article.banner_name = response;
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