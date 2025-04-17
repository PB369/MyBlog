import { Link, useLocation } from 'react-router-dom';
import styles from './css/EditableArticleCard.module.scss';
import { useThemedIcon } from '../../hooks/conditionalsHooks';
import { useState } from 'react';
import { useCheckEllipsisTag } from '../../hooks/EllipsisTagHook';

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
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const trashIconPath = useThemedIcon("trash-icon.png");
  const redTrashIconPath = "../../../OtherIcons/red-trash-icon.png";
  const urlPage: string = useLocation().pathname;
  const { hasEllipsis, visibleTags, divRef } = useCheckEllipsisTag(tags, urlPage);

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
                <img src={useThemedIcon("eye-icon.png")} alt="eye-icon" />
                <p>{viewAmount}</p>
              </div>
              <div className={styles.heartsContainer}>
                <img src="../../../OtherIcons/heart-icon.png" alt="heart-icon" />
                <p>{heartAmount}</p>
              </div>
            </div>
            <div className={styles.tagsContainer}>
              {/* This rendering of hiddenTags is required for the useCheckEllipsisTag hook to work properly */}
              <div className={styles.hiddenTags} ref={divRef}>
                {tags.map(tag => <span key={tag} className={styles.tags}>{tag}</span>)}
                {hasEllipsis && <span className={styles.ellipsisTag}>...</span>}
              </div>
              {tags.length > 0 ? visibleTags.map(tag => <span key={tag} className={styles.tags}>{tag}</span>) : <span className={styles.tags}>untagged</span>}

              {hasEllipsis && <span className={styles.ellipsisTag}>...</span>}
            </div>
          </div>
        </div>
        <img src={bannerURL ? bannerURL : ""} alt={bannerAlt} className={styles.articleBanner}/>
      </article>
      <div className={styles.editAndDelete}>
        <Link to={`edit/${id.toString()}`} className={styles.editButton}>
          <img src={useThemedIcon("edit-icon.png")} alt="" />
        </Link>
        <button className={styles.deleteButton}>
          <img src={isHovered ? redTrashIconPath : trashIconPath} alt="trash-icon" onMouseEnter={() => setIsHovered(true)} onMouseLeave={()=> setIsHovered(false)}/>
        </button>
      </div>
    </div>
  )
}

export default EditableArticleCard;