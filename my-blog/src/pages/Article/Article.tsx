import { useParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import styles from './css/Article.module.scss';
import { useArticles } from '../../context/ArticlesContext';
import { useTheme } from '../../context/ThemeContext';
import StaticArticle from '../../components/StaticArticle/StaticArticle';

const Article = () => {
  const { id } = useParams();
  const { theme } = useTheme();
  const articles = useArticles();
  const article = articles.find(article => article.id === Number(id));

  return (
    <div className={`${styles.articlePageContainer} ${styles[theme]}`}>
      <Header/>
        {
          article ? // If the article was found, render this:
          <StaticArticle
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
          <h2 className={styles.pageMessage}>Não foi possível carregar o conteúdo deste artigo.</h2>
        }
      <Footer/>
    </div>
  )
}

export default Article;