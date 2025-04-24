import { Link } from 'react-router-dom';
import styles from './css/EditableArticle.module.scss';
import { useThemedIcon } from '../../hooks/conditionalsHooks';
import { ArticleType } from '../../api/articlesAPI';
import { useState } from 'react';
import ErrorMessage, { Errors } from '../ErrorMessage/ErrorMessage';
import SaveButton from '../Save&PublishButtons/SaveButton';
import PublishButton from '../Save&PublishButtons/PublishButton';
import AddParagraph from '../AddParagraph/AddParagraph';
import AddBanner from '../AddBanner/AddBanner';

type Props = {
  isNewArticle: boolean,
  id: number,
  title: string,
  tags: string[],
  is_published: boolean,
  publish_date: string,
  banner_url: string,
  banner_alt: string,
  article_content: string,
  views_amount: number,
  hearts_amount: number,
}

const EditableArticle = ({isNewArticle, id, title, tags, is_published, publish_date, banner_url, banner_alt, article_content, views_amount, hearts_amount}: Props) => {
  const arrowIconPath = useThemedIcon("arrow-icon.png");
  const eyeIconPath = useThemedIcon("eye-icon.png");
  const heartIconPath = "../../../OtherIcons/heart-icon.png";

  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [errorCategory, setErrorCategory] = useState<Errors | null>(null);

  const article: ArticleType = {
    id: id,
    title: title,
    tags: tags,
    is_published: is_published,
    publish_date: publish_date,
    banner_url: banner_url,
    banner_alt: banner_alt,
    article_content: article_content,
    views_amount: views_amount,
    hearts_amount: hearts_amount,
  }

  return (
    <div className={styles.editableArticleContainer}>
      <article className={styles.article}>
        <header>
          <div className={styles.articleInteractions}>
            <Link to={'/management'} className={styles.link}>
              <img src={arrowIconPath} alt="arrow-icon" />
            </Link>
            <div className={styles.viewAndHeart}>
              <div className={styles.viewDiv}>
                <img src={eyeIconPath} alt="eye-icon" />
                <p>{isNewArticle ? 0 : views_amount}</p>
              </div>
              <div className={styles.heartDiv}>
                <img src={heartIconPath} alt="heart-icon" />
                <p>{isNewArticle ? 0 : hearts_amount}</p>
              </div>
            </div>
          </div>
          <div className={styles.articleInfos}>
            <div className={styles.titleAndDate}>
              <h2>{isNewArticle ? "Add a title" : title}</h2>
              <p>{isNewArticle ? "Add a publish date" : publish_date}</p>
            </div>
            <div className={styles.tagsContainer}>
              {isNewArticle ? <span className={styles.tags}>+</span> : tags.map((tag, index) => <span key={index} className={styles.tags}>{tag}</span>)}
            </div>
          </div>
        </header>
        <main>
         <AddBanner isNewArticle={isNewArticle} banner_url={banner_url} banner_alt={banner_alt}/>
         <AddParagraph isNewArticle={isNewArticle} content={article_content}/>
        </main>
      </article>
      <div className={styles.buttonsContainer}>
        <SaveButton isNewArticle={isNewArticle} article={article} setShowErrorMessage={setShowErrorMessage} setErrorCategory={setErrorCategory}/>

        <PublishButton isNewArticle={isNewArticle} article={article} setShowErrorMessage={setShowErrorMessage} setErrorCategory={setErrorCategory}/>
      </div>
      {showErrorMessage && errorCategory && <ErrorMessage category={errorCategory}/>}
    </div>
  )
}

export default EditableArticle;