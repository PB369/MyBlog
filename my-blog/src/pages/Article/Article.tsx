import { useParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './css/Article.module.scss';

const Article = () => {
  const { id } = useParams();

  return (
    <>
      <Header/>
      <h2>Artigo {id}</h2>
      <Footer/>
    </>
  )
}

export default Article;