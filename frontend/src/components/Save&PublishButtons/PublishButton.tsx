import { ReactNode, useEffect, useRef, useState } from 'react';
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
  
  const [publishButtonText, setPublishButtonText] = useState<string | ReactNode>("Publish");

  const counter = useRef(0);
  useEffect(()=>{ //Always keep this useEffect above the useEffect that increment the counter
    if(counter.current === 1) {
      setPublishButtonText(article.is_published ? "Unpublish": "Publish");
    }
  }, [article.is_published]);

  useEffect(()=>{ 
    counter.current += 1;
    console.log(counter.current)
  })


  const buttonsTextReset = () => {return setTimeout(() => {
    setPublishButtonText(article.is_published ? "Unpublish": "Publish");
  }, 2000)};

  const publishArticle = () => {
    setShowErrorMessage(false);
    article.is_published = true;
    if(isNewArticle) {
      createArticle(article)
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