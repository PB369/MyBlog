import { Link } from 'react-router-dom';
import styles from './css/EditableArticle.module.scss';
import { useThemedIcon } from '../../hooks/conditionalsHooks';

type Props = {
  isNewArticle: boolean,
  title: string,
  tags: string[],
  publishDate: string,
  bannerURL: string,
  bannerAlt: string,
  content: string,
  viewAmount: number,
  heartsAmount: number,
}

const EditableArticle = ({isNewArticle, title, tags, publishDate, bannerURL, bannerAlt, content, viewAmount, heartsAmount}: Props) => {
  let haveAddParagraph: boolean = false;
  const arrowIconPath = useThemedIcon("arrow-icon.png");
  const eyeIconPath = useThemedIcon("eye-icon.png");
  const heartIconPath = "../../../OtherIcons/heart-icon.png";

  return (
    <article className={styles.article}>
      <header>
        <div className={styles.articleInteractions}>
          <Link to={'/management'} className={styles.link}>
            <img src={arrowIconPath} alt="arrow-icon" />
          </Link>
          <div className={styles.viewAndHeart}>
            <div className={styles.viewDiv}>
              <img src={eyeIconPath} alt="eye-icon" />
              <p>{isNewArticle ? 0 : viewAmount}</p>
            </div>
            <div className={styles.heartDiv}>
              <img src={heartIconPath} alt="heart-icon" />
              <p>{isNewArticle ? 0 : heartsAmount}</p>
            </div>
          </div>
        </div>
        <div className={styles.articleInfos}>
          <div className={styles.titleAndDate}>
            <h2>{isNewArticle ? "Add a title" : title}</h2>
            <p>{isNewArticle ? "Add a publish date" : publishDate}</p>
          </div>
          <div className={styles.tagsContainer}>
            {isNewArticle ? <span className={styles.tags}>+</span> : tags.map((tag, index) => <span key={index} className={styles.tags}>{tag}</span>)}
          </div>
        </div>
      </header>
      <main>
        <img src={isNewArticle ? "" : bannerURL} alt={isNewArticle ? "" :bannerAlt} />
        {/* Logic to render or not the Add Paragraph option: */}
        {(() => {
          if(isNewArticle) {
            haveAddParagraph = true;
            return <p>Add a paragraph</p>
          } else {
              haveAddParagraph = false;
              return content.split("\n\n").map((text, index, arr) =>
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
  )
}

export default EditableArticle;