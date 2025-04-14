import { useParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './css/ArticleEdition.module.scss';
import { useArticles } from '../../context/ArticlesContext';
import EditableArticle from '../../components/EditableArticle/EditableArticle';

const ArticleEdition = () => {

  const { id } = useParams();
  const articles = useArticles();
  const article  = id ? articles.find(article => article.id === Number(id)) : {
    id: 0,
    title: "",
    tags: [],
    isPublished: false,
    publishDate: "",
    bannerURL: "",
    bannerAlt: "",
    heartsAmount: 0,
    viewAmount: 0,
    content: "",
  };

  const isNewArticle = !id;

  return (
    <>
      <Header/>
      {
        article ? // If the article was found, render this:
          <EditableArticle
            isNewArticle={isNewArticle}
            title={article.title}
            tags={article.tags}
            publishDate={article.publishDate}
            bannerURL={article.bannerURL}
            bannerAlt={article.bannerAlt}
            content={article.content}
            viewAmount={article.viewAmount}
            heartsAmount={article.heartsAmount}
          />
        : // If not, render this:
          <h2>Não foi possível carregar o conteúdo deste artigo.</h2>
      }

      <Footer/>
    </>
  )
}

export default ArticleEdition;