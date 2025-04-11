
import { ReactNode } from 'react';
import styles from './css/HomeMain.module.scss';

type Props = {
  children: ReactNode;
}

const HomeMain = ({children} : Props) => {

  return (
    <div className={styles.homeMain}>
      <h2 className={styles.homeTitle}>Articles for fun</h2>
      <section>
        {children}
      </section>
    </div>
  )
}

export default HomeMain;