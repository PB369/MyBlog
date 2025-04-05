
import { ReactNode } from 'react';
import './css/HomeMain.module.scss';

type Props = {
  children: ReactNode;
}

const HomeMain = ({children} : Props) => {
  return (
    <>
      <h2>Articles for fun</h2>
      <section>
        {children}
      </section>
    </>
  )
}

export default HomeMain;