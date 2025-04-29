import { Link, useLocation } from 'react-router-dom';
import styles from './css/EditableArticleCard.module.scss';
import { useThemedIcon } from '../../hooks/ConditionalsHooks';
import { useState } from 'react';
import { useCheckEllipsisTag } from '../../hooks/EllipsisTagHook';

type Props = {
  id: number,
  title: string,
  tags: string[],
  is_published: boolean,
  publish_date: string,
  banner_name: string,
  banner_ref: string,
  banner_alt: string,
  views_amount: number,
  hearts_amount: number,
  onShowChoiceModal: () => void,
}

const EditableArticleCard = ({id, title, tags, is_published, publish_date, banner_name, banner_ref, banner_alt, views_amount, hearts_amount, onShowChoiceModal}: Props,) => {
  const blockedIconPath = '/LightIcons/blocked-icon.png';
  const trashIconPath = useThemedIcon("trash-icon.png");
  const redTrashIconPath = "/OtherIcons/red-trash-icon.png";
  const heartIconPath = "/OtherIcons/heart-icon.png";
  
  const urlPage: string = useLocation().pathname;
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { hasEllipsis, visibleTags, divRef } = useCheckEllipsisTag(tags, urlPage);


  return (
    <div className={styles.articleCardContainer}>
      <article className={styles.article}>
        <div className={styles.textualContent}>
          <div className={styles.titleAndDate}>
            <div>
              {title === "" ? <h3>Untitled</h3>: <h3>{title}</h3>}
              {is_published ? null : <p>[Draft Article]</p>}
            </div>
            <p>Publish Date: {publish_date}</p>
          </div>
          <div className={styles.interactionsAndTags}>
            <div className={styles.viewsAndHearts}>
              <div className={styles.viewsContainer}>
                <img src={useThemedIcon("eye-icon.png")} alt="eye-icon" />
                <p>{views_amount}</p>
              </div>
              <div className={styles.heartsContainer}>
                <img src={heartIconPath} alt="heart-icon" />
                <p>{hearts_amount}</p>
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
        <img src={banner_ref ? banner_ref : blockedIconPath} alt={banner_alt} className={styles.articleBanner}/>
      </article>
      <div className={styles.editAndDelete}>
        <Link to={`edit/${id.toString()}`} className={styles.editButton}>
          <img src={useThemedIcon("edit-icon.png")} alt="" />
        </Link>
        <button className={styles.deleteButton}>
          <img src={isHovered ? redTrashIconPath : trashIconPath} alt="trash-icon" onMouseEnter={() => setIsHovered(true)} onMouseLeave={()=> setIsHovered(false)} onClick={onShowChoiceModal}/>
        </button>
      </div>
    </div>
  )
}

export default EditableArticleCard;