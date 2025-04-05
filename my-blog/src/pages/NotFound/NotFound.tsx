import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './css/NotFound.module.scss';

const NotFound = () => {
  return (
    <>
      <Header/>
      <div>
        <p>404 - Página não encontrada.</p>
      </div>
      <Footer/>
    </>
  )
}

export default NotFound;