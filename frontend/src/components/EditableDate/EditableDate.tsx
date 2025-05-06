import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import DatePicker from '../DatePicker/DatePicker';
import styles from './css/EditableDate.module.scss';

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
        console.log(date)
    }

    return (
        <>
            <DatePicker/>
        </>
    )
}

export default EditableDate;