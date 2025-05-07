import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import styles from './css/EditableDate.module.scss';

type Props = {
  publishDate: string,
  onDateSelect?: (date: Date) => void,setArticlePublishDate: Dispatch<SetStateAction<string>>,
};

const getDaysInMonth = (year: number, month: number) => {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
'July', 'August', 'September', 'October', 'November', 'December'
];

const EditableDate = ({ publishDate, onDateSelect, setArticlePublishDate }: Props) => {

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  useEffect(() => {
    if (publishDate) {
      const parsed = new Date(publishDate);
      if (!isNaN(parsed.getTime())) {
        setSelectedDate(parsed);
        setCurrentMonth(parsed.getMonth());
        setCurrentYear(parsed.getFullYear());
      }
    }
  }, [publishDate]);
  
  const formatedDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
  
  useEffect(()=>{
    if(selectedDate){
      const newDate: string = formatedDate(selectedDate)
      setArticlePublishDate(newDate)
    }
  }, [selectedDate]);

  const days = getDaysInMonth(currentYear, currentMonth);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setShowCalendar(false);
    if (onDateSelect) onDateSelect(date);
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(y => y - 1);
    } else {
      setCurrentMonth(m => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(y => y + 1);
    } else {
      setCurrentMonth(m => m + 1);
    }
  };

  const calendarRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    const handleOutsideClick = (event: MouseEvent) => {
      const clickConditionToCalendar = calendarRef.current && !calendarRef.current.contains(event.target as Node);

      const clickConditionToInput = inputRef.current && !inputRef.current.contains(event.target as Node);

      if(clickConditionToCalendar && clickConditionToInput) {
        setShowCalendar(false);
      }
    }

    if(showCalendar){document.addEventListener('mousedown', handleOutsideClick);}
    
    return () => document.removeEventListener('mousedown', handleOutsideClick);

  }, [showCalendar]);

  return (
    <div className={styles.datePickerContainer}>
      <input
        value={selectedDate ? formatedDate(selectedDate) : 'Add a publish date'}
        onClick={() => setShowCalendar(!showCalendar)}
        ref={inputRef}
      />
      {showCalendar && (
        <div className={styles.calendar} ref={calendarRef}>
          <div className={styles.calendarHeader}>
            <button onClick={handlePrevMonth}>{'<'}</button>
            <span>{monthNames[currentMonth]} {currentYear}</span>
            <button onClick={handleNextMonth}>{'>'}</button>
          </div>
          <div className={styles.calendarGrid}>
            {days.map((day) => (
              <button
                key={day.toISOString()}
                onClick={() => handleDateSelect(day)}
                className={
                  selectedDate?.toDateString() === day.toDateString() ? styles.selected : ''
                }
              >
                {day.getDate()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default EditableDate;