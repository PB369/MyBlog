import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './css/NotFound.module.scss';
import styles from './css/NotFound.module.scss'

const NotFound = () => {
  return (
    <div className={styles.notFoundPageContainer}>
      <Header/>
      <div className={styles.pageMessageContainer}>
        <h2 className={styles.pageMessage}>Error 404:<br/>This URL address doesn't exists.</h2>
      </div>
      <Footer/>
    </div>
  )
}

export default NotFound;