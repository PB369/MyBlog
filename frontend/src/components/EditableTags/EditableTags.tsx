import styles from './css/EditableTags.module.scss';

type Props = {
  tags: string[],
  onShowAddTagsModal: () => void,
}

const EditableTags = ({tags, onShowAddTagsModal}: Props) => {
  return (
    <div className={styles.tagsContainer}>
      {tags.map((tag, index) => <span key={index} className={styles.tags}>{tag}</span>)}
      {tags.length <= 5 && <button className={`${styles.tags} ${styles.addTagsBtn}`} onClick={onShowAddTagsModal}>+</button>}
    </div>
  )
}

export default EditableTags;