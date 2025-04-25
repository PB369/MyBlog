import styles from './css/Footer.module.scss';

const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        <p>Made and managed by <a href="https://pebarros.vercel.app/" target="_blank" rel="author">Pedro</a>
        .</p>
      </footer>
    </>
  )
}

export default Footer;