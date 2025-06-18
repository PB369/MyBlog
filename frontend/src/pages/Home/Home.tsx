import StaticArticleCard from '../../components/StaticArticleCard/StaticArticleCard';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import HomeMain from '../../components/HomeMain/HomeMain';
import styles from './css/Home.module.scss';
import { useTheme } from '../../context/ThemeContext';
import { useEffect, useState } from 'react';
import { ArticleType, getArticlesWithBanner } from '../../api/articlesAPI';

const Home = () => {
  const [articles, setArticles] = useState<ArticleType[] | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  
  useEffect(()=>{
    setIsLoading(true);
    setHasError(false);

    getArticlesWithBanner()
    .then(articles => {
      setArticles(articles);
      setIsLoading(false);
    })
    .catch(error => {
      console.error(error);
      setIsLoading(false);
      setHasError(true);
    });
}, []);

  const { theme } = useTheme();

  return (
    <div className={`${styles.homePageContainer} ${styles[theme]}`}>
      <Header/>
      <HomeMain>
        {
        isLoading ?
        (
          <div className={styles.pageMessageContainer}>
            <div></div>
            <h2 className={styles.pageMessage}>Loading...</h2>
            <p className={styles.pageMessage}>(This may take up to 1 minute due to deployment platform limitations.)</p>
          </div>
        ) 
        : hasError ?
        (
          <div className={styles.pageMessageContainer}>
            <div></div>
            <h2 className={styles.pageMessage}>The articles couldn't be loaded.<br/>Try again by refreshing the page.</h2>
          </div>
        ) :
        articles ? //This filter() and the getArticle() are not safe. Remember to replace it with a proper backend autentication logic.
          articles.filter((article) => article.is_published === true).map((article) => (
            <StaticArticleCard
              key={article.id}
              id={article.id}
              title={article.title}
              tags={article.tags}
              publish_date={article.publish_date}
              banner_url={article.banner_url}
              banner_alt={article.banner_alt}
              article_content={article.article_content}
            />
          ))
          :
          <h2 className={styles.pageMessage}>There are no articles yet.</h2>
        }
      </HomeMain>
      <Footer/>
    </div>
  )
}

export default Home;