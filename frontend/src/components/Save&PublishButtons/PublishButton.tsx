import styles from './css/Save&PublishButtons.module.scss'

const PublishButton = () => {
  

  return (
    <button className={styles.publishButton} onClick={() => publishArticle('publishBtn')}>{publishButtonText}</button>
  )
}

export default PublishButton;