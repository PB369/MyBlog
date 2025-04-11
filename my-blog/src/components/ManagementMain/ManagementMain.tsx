import { ReactNode } from 'react';
import styles from './css/ManagementMain.module.scss';

type Props = {
  children: ReactNode;
}

const ManagementMain = ({children} : Props) => {
  return (
    <div className={styles.managementMain}>
      <h2 className={styles.managementTitle}>Your Articles</h2>
      <section>
        {children}
      </section>
    </div>
  )
}

export default ManagementMain;