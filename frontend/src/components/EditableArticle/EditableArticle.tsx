import { Link } from 'react-router-dom';
import styles from './css/EditableArticle.module.scss';
import { useThemedIcon } from '../../hooks/conditionalsHooks';

type Props = {
  isNewArticle: boolean,
  title: string,
  tags: string[],
  publish_date: string,
  banner_url: string,
  banner_alt: string,
  article_content: string,
  views_amount: number,
  hearts_amount: number,
}

const EditableArticle = ({isNewArticle, title, tags, publish_date, banner_url, banner_alt, article_content, views_amount, hearts_amount}: Props) => {
  let haveAddParagraph: boolean = false;
  const arrowIconPath = useThemedIcon("arrow-icon.png");
  const eyeIconPath = useThemedIcon("eye-icon.png");
  const heartIconPath = "../../../OtherIcons/heart-icon.png";

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
          <img src={isNewArticle ? "" : banner_url} alt={isNewArticle ? "" :banner_alt} />
          {/* Logic to render or not the Add Paragraph option: */}
          {(() => {
            if(isNewArticle) {
              haveAddParagraph = true;
              return <p>Add a paragraph</p>
            } else {
                haveAddParagraph = false;
                return article_content.split("\n\n").map((text, index, arr) =>
                (
                  <div key={index}>
                    <p>{text}</p>
                    {index !== (arr.length - 1) && <br/>}
                  </div>)
                )
            }
          })()}
          {haveAddParagraph ? null : <><br/><p>Add a paragraph</p></>}
        </main>
      </article>
      <div className={styles.buttonsContainer}>
        <button className={styles.saveButton}>Save</button>
        <button className={styles.publishButton}>Publish</button>
      </div>
    </div>
  )
}

export default EditableArticle;