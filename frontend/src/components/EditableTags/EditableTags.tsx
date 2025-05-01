import styles from './css/EditableTags.module.scss';

type Props = {
  isNewArticle: boolean,
  tags: string[],
}

const EditableTags = ({isNewArticle, tags}: Props) => {
  return (
    <div className={styles.tagsContainer}>
      {isNewArticle ? <span className={styles.tags}>+</span> : tags.map((tag, index) => <span key={index} className={styles.tags}>{tag}</span>)}
    </div>
  )
}

export default EditableTags;