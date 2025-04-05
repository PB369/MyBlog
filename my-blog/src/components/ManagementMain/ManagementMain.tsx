import { ReactNode } from 'react';
import './css/ManagementMain.module.scss';

type Props = {
  children: ReactNode;
}

const ManagementMain = ({children} : Props) => {
  return (
    <>
      <h2>Your Articles</h2>
      <section>
        {children}
      </section>
    </>
  )
}

export default ManagementMain;