import { Link, useLocation } from 'react-router-dom';
import styles from './css/StaticArticleCard.module.scss';
import { useCheckEllipsisTag } from '../../hooks/EllipsisTagHook';

type Props = {
  id: number | undefined,
  title: string,
  tags: string[],
  publish_date: string,
  banner_url: string,
  banner_alt: string,
  article_content: string,
}

const StaticArticleCard = ({id, title, tags, publish_date, banner_url, banner_alt, article_content}: Props) => {
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
              <p className={styles.publishDate}>{publish_date}</p>
            </div>
            <div className={styles.articleText}>
              {article_content.split('-&@&-').map((text, index, arr) =>
                (<div key={index}>
                  <p>{text}</p>
                  {index !== (arr.length - 1) && <br/>}
                </div>)
              )}
            </div>
          </div>
          <Link to={`/articles/${typeof(id) === "number" ? id.toString() : undefined}`} className={styles.link}>Read it all</Link>
        </div>
        <img src={banner_url} alt={banner_alt}/>
      </article>
    </>
  )
}

export default StaticArticleCard;