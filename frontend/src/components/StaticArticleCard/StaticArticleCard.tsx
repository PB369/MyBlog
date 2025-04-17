import { Link, useLocation } from 'react-router-dom';
import styles from './css/StaticArticleCard.module.scss';
import { useCheckEllipsisTag } from '../../hooks/EllipsisTagHook';

type Props = {
  id: number | undefined,
  title: string,
  tags: string[],
  publishDate: string,
  bannerURL: string,
  bannerAlt: string,
  content: string,
}

const StaticArticleCard = ({id, title, tags, publishDate, bannerURL, bannerAlt, content}: Props) => {
  const urlPage: string = useLocation().pathname;
  const { hasEllipsis, visibleTags, divRef } = useCheckEllipsisTag(tags, urlPage);
  return (
    <>
      <article className={`${styles.article}`}>
        <div className={styles.articleTextualContent}>
          <div className={styles.articleMainContent}>
            <div className={styles.tagsContainer}>
              {/* This rendering of hiddenTags is required for the useCheckEllipsisTag hook to work properly */}
              <div className={styles.hiddenTags} ref={divRef}>
                {tags.map(tag => <span key={tag} className={styles.tags}>{tag}</span>)}
                {hasEllipsis && <span className={styles.ellipsisTag}>...</span>}
              </div>
              {visibleTags.map(tag => <span key={tag} className={styles.tags}>{tag}</span>)}
              
              {hasEllipsis && <span className={styles.ellipsisTag}>...</span>}
            </div>
            <div className={styles.articleHead}>
              <h4>{title}</h4>
              <p className={styles.publishDate}>{publishDate}</p>
            </div>
            <p className={styles.articleText}>{content}</p>
          </div>
          <Link to={`/articles/${typeof(id) === "number" ? id.toString() : undefined}`} className={styles.link}>Read it all</Link>
        </div>
        <img src={bannerURL} alt={bannerAlt}/>
      </article>
    </>
  )
}

export default StaticArticleCard;