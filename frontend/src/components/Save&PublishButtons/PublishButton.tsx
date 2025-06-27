import { ReactNode, useEffect, useState } from 'react';
import { ArticleType, createArticle, updateArticle } from '../../api/articlesAPI';
import { Errors } from '../ErrorMessage/ErrorMessage';
import styles from './css/Save&PublishButtons.module.scss'
import { isGuest } from '../../utils/checkGuestMode';

type Props = {
  isNewArticle: boolean,
  setIsNewArticle: React.Dispatch<React.SetStateAction<boolean>>
  setShowErrorMessage: (argument: boolean) => void,
  setErrorCategory: (argument: Errors) => void,
  article: ArticleType,
}

const PublishButton = ({isNewArticle, setIsNewArticle, setShowErrorMessage, setErrorCategory, article}: Props) => {
  
  const [publishButtonText, setPublishButtonText] = useState<string | ReactNode>("Publish");

  useEffect(()=>{
    setPublishButtonText(article.is_published ? "Unpublish": "Publish");
  }, [article.is_published]);

  const buttonsTextReset = () => {return setTimeout(() => {
    setPublishButtonText(article.is_published ? "Unpublish": "Publish");
  }, 2000)};

  const publishArticle = () => {
    setShowErrorMessage(false);
    article.is_published = true;

    if (isGuest()) {
      try {
        const stored = localStorage.getItem("guestArticles");
        const guestArticles = stored ? JSON.parse(stored) : [];

        const updatedArticle = {
          ...article,
          id: isNewArticle ? Date.now() : article.id,
        };

        let newList: ArticleType[];

        if(isNewArticle){
          newList = [...guestArticles, updatedArticle]
          setIsNewArticle(false);
        } else {
          newList = guestArticles.map((a: ArticleType) => a.id === article.id ? updatedArticle : a);
        }

        localStorage.setItem("guestArticles", JSON.stringify(newList));
        setPublishButtonText("Published!");
        buttonsTextReset();
      } catch (error) {
        console.error(error);
        setShowErrorMessage(true);
        setErrorCategory(Errors.ServerError);
      }
      return;
    }

    if(isNewArticle) {
      createArticle(article)
      .then(() => {
        setPublishButtonText("Published!");
        setIsNewArticle(false);
        buttonsTextReset();
      })
      .catch((error) => {
        article.is_published = false;
        console.error(error);
        setShowErrorMessage(true);
        setErrorCategory(Errors.ServerError);
      });
    } else {
      updateArticle(article)
      .then(() => {
        setPublishButtonText("Published!");
        buttonsTextReset();
      })
      .catch((error) => {
        article.is_published = false;
        console.error(error);
        setShowErrorMessage(true);
        setErrorCategory(Errors.ServerError);
      });
    }
  }

  const unpublishArticle = () => {
    setShowErrorMessage(false);
    article.is_published = false;

    if (isGuest()) {
      try {
        const stored = localStorage.getItem("guestArticles");
        const guestArticles = stored ? JSON.parse(stored) : [];

        const updatedArticle = {
          ...article,
        };

        const newList = guestArticles.map((a: ArticleType) =>
          a.id === article.id ? updatedArticle : a
        );

        localStorage.setItem("guestArticles", JSON.stringify(newList));
        setPublishButtonText("Unpublished!");
        buttonsTextReset();
      } catch (error) {
        console.error(error);
        setShowErrorMessage(true);
        setErrorCategory(Errors.ServerError);
      }
      return;
    }

    updateArticle(article)
    .then(() => {
      setPublishButtonText("Unpublished!");
      buttonsTextReset();
    })
    .catch((error) => {
      article.is_published = true;
      console.error(error);
      setShowErrorMessage(true);
      setErrorCategory(Errors.ServerError);
    });
  }

  const handleBtn = () => {
    if(publishButtonText === "Publish") {
      publishArticle()
    } else if (publishButtonText === "Unpublish") {
      unpublishArticle()
    }
  }

  return (
    <button className={styles.publishButton} onClick={handleBtn}>{publishButtonText}</button>
  )
}

export default PublishButton;