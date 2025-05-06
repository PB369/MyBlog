import styles from './css/EditableDate.module.scss'
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type Props = {
    isNewArticle: boolean,
    publishDate: string,
    setArticlePublishDate: Dispatch<SetStateAction<string>>,
}

const EditableDate = ({isNewArticle, publishDate, setArticlePublishDate}: Props) => {
    const [date, setDate] = useState<Date | null>(null);

    useEffect(()=>{
        if(publishDate){
            setDate(new Date(publishDate));
        }
    }, [publishDate]);

    const handleDateChange = (date: Date | null) => {

    }

    return (
        <DatePicker value={date} onChange={date => {handleDateChange(date)}}/>
    )
}

export default EditableDate;