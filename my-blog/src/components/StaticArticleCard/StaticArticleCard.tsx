import { Link } from 'react-router-dom';
import styles from './css/StaticArticleCard.module.scss';
import { useTheme } from '../../context/ThemeContext';
import { useCheckEllipsisTag } from '../../utils/ellipsisTagHook';

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
  const { theme } = useTheme();
  const { hasEllipsis, visibleTags, divRef } = useCheckEllipsisTag(tags);
  return (
    <>
      <article className={`${styles.article} ${styles[theme]}`}>
        <div className={styles.articleTextualContent}>
          <div className={styles.articleMainContent}>
            <div className={styles.tagsContainer}>
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