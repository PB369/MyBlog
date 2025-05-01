import styles from './css/EditableTitle.module.scss'

type Props = {
  isNewArticle: boolean,
  title: string,
}

const EditableTitle = ({isNewArticle, title}: Props) => {
  return (
    <h2 className={styles.title}>{isNewArticle ? "Add a title" : title}</h2>
  )
}

export default EditableTitle;