import styles from './css/EditableTags.module.scss';

type Props = {
  tags: string[],
  onShowTagSettingsModal: () => void,
}

const EditableTags = ({tags, onShowTagSettingsModal}: Props) => {
  const blackSettingsIconPath = '/OtherIcons/blackSettings-icon.png'

  return (
    <div className={styles.tagsContainer}>
      {tags.map((tag, index) => <span key={index} className={styles.tags}>{tag}</span>)}
      {tags.length <= 5 && <button className={`${styles.tags} ${styles.addTagsBtn}`} onClick={onShowTagSettingsModal}><img src={blackSettingsIconPath} alt="settings-icon" /></button>}
    </div>
  )
}

export default EditableTags;