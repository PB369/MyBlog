import { Link } from 'react-router-dom';
import styles from './css/EditableArticleCard.module.scss';

type Props = {
  id: number,
  title: string,
  tags: string[],
  isPublished: boolean,
  publishDate: string,
  bannerURL: string,
  bannerAlt: string,
  viewAmount: number,
  heartAmount: number,
}

const EditableArticleCard = ({id, title, tags, isPublished, publishDate, bannerURL, bannerAlt, viewAmount, heartAmount}: Props) => {
  return (
    <div className={styles.articleCardContainer}>
      <article className={styles.article}>
        <div className={styles.textualContent}>
          <div className={styles.titleAndDate}>
            <div>
              <h3>{title}</h3>
              {isPublished ? null : <p>[Draft Article]</p>}
            </div>
            <p>Publish Date: {publishDate}</p>
          </div>
          <div className={styles.interactionsAndTags}>
            <div className={styles.viewsAndHearts}>
              <div className={styles.viewsContainer}>
                <img src="" alt="" />
                <p>{viewAmount}</p>
              </div>
              <div className={styles.heartsContainer}>
                <img src="" alt="" />
                <p>{heartAmount}</p>
              </div>
            </div>
            <div className={styles.tagsContainer}>
              {tags.length > 0 ? tags.map(tag => <span>{tag}</span>) : <span>untagged</span>}
            </div>
          </div>
        </div>
        <img src={bannerURL ? bannerURL : ""} alt={bannerAlt} />
      </article>
      <div className={styles.editAndDelete}>
        <Link to={`edit/${id.toString()}`} className={styles.editButton}>
          <img src="../../../edit-icon.png" alt="" />
        </Link>
        <button className={styles.deleteButton}>
          <img src="../../../trash-icon.png" alt="" />
        </button>
      </div>
    </div>
  )
}

export default EditableArticleCard;