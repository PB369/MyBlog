import { useParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import styles from './css/Article.module.scss';
import { useTheme } from '../../context/ThemeContext';
import StaticArticle from '../../components/StaticArticle/StaticArticle';
import { useEffect, useState } from 'react';
import { ArticleType, getArticles, getArticlesWithBanner } from '../../api/articlesAPI';

const Article = () => {
  const { id } = useParams();
  const { theme } = useTheme();
  
  const [articles, setArticles] = useState<ArticleType[] | null>(null);
  
  useEffect(()=>{
    getArticlesWithBanner()
    .then(setArticles)
    .catch(console.error);
  }, [id]);
  
  const article = articles && articles.find(article => article.id === Number(id));

  return (
    <div className={`${styles.articlePageContainer} ${styles[theme]}`}>
      <Header/>
        {
          article ? // If the article was found, render this:
          <StaticArticle
            title={article.title}
            tags={article.tags}
            publish_date={article.publish_date}
            banner_url={article.banner_url}
            banner_alt={article.banner_alt}
            article_content={article.article_content}
            views_amount={article.views_amount}
            hearts_amount={article.hearts_amount}
          />
        : // If not, render this:
          <h2 className={styles.pageMessage}>It was not possible to load the article.</h2>
        }
      <Footer/>
    </div>
  )
}

export default Article;