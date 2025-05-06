import styles from './css/EditableDate.module.scss'
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

type Props = {
    isNewArticle: boolean,
    publishDate: string,
}

const EditableDate = ({isNewArticle, publishDate}: Props) => {
    return (
        <>
        <DatePicker/>
        {/* <p className={styles.date}>{isNewArticle ? "Add a publish date" : publishDate}</p> */}
        </>
    )
}

export default EditableDate;