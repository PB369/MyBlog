import { useEffect, useState } from 'react';
import styles from './css/DatePicker.module.scss';

type Props = {
  initialDate?: string; // formato ISO ou algo reconhecível por Date
  onDateSelect?: (date: Date) => void;
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

const DatePicker = ({ initialDate, onDateSelect }: Props) => {

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  // Inicializar com data via props (apenas na montagem)
  useEffect(() => {
    if (initialDate) {
      const parsed = new Date(initialDate);
      if (!isNaN(parsed.getTime())) {
        setSelectedDate(parsed);
        setCurrentMonth(parsed.getMonth());
        setCurrentYear(parsed.getFullYear());
      }
    }
  }, [initialDate]);

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

  return (
    <div className={styles.datePickerContainer}>
      <input
        readOnly
        value={selectedDate ? selectedDate.toLocaleDateString() : ''}
        onClick={() => setShowCalendar(!showCalendar)}
        placeholder="Add a publish date"
      />
      {showCalendar && (
        <div className={styles.calendar}>
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
                  selectedDate?.toDateString() === day.toDateString() ? 'selected' : ''
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

export default DatePicker;