
import { ReactNode } from 'react';
import styles from './css/HomeMain.module.scss';
import { useTheme } from '../../context/ThemeContext';

type Props = {
  children: ReactNode;
}

const HomeMain = ({children} : Props) => {
  const { theme } = useTheme();

  return (
    <div className={styles[theme]}>
      <h2>Articles for fun</h2>
      <section>
        {children}
      </section>
    </div>
  )
}

export default HomeMain;