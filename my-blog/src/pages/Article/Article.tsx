import { useParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './css/Article.module.scss';
import { useArticles } from '../../context/ArticlesContext';

const Article = () => {
  const { id } = useParams();

  const articles = useArticles();
  const article = articles.find(article => article.id === Number(id));

  return (
    <>
      <Header/>
      {
      article ? // If the article was found, render this:
      (
        <article>
          <h2>{article.title}</h2>
        </article>
      ) 
      : // If not, render this:
      (
        <h2>Não foi possível carregar o conteúdo deste artigo.</h2>
      )
      }
      <Footer/>
    </>
  )
}

export default Article;