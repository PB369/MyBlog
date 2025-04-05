
import { ReactNode } from 'react';
import './css/Main.module.scss';

type Props = {
  children: ReactNode;
}

const Main = ({children} : Props) => {
  return (
    <>
      <h3>Articles for fun</h3>
      <section>
        {children}
      </section>
    </>
  )
}

export default Main;