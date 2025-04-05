import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './css/NotFound.module.scss';

const NotFound = () => {
  return (
    <>
      <Header/>
      <div>
        <p>Error 404 - This URL address doesn't exists.</p>
      </div>
      <Footer/>
    </>
  )
}

export default NotFound;