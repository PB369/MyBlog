import { useLocation, useParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import styles from './css/Article.module.scss';
import { useTheme } from '../../context/ThemeContext';
import StaticArticle from '../../components/StaticArticle/StaticArticle';
import { useEffect, useState } from 'react';
import { ArticleType, getArticlesWithBanner, incrementViewsAmount, updateArticle } from '../../api/articlesAPI';

const Article = () => {
  const { id } = useParams();
  const { theme } = useTheme();
  const pageURL = useLocation();
  
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
  }, [id]);
  
  const article = articles && articles.find(article => article.id === Number(id));
  
  useEffect(() => {
    if(pageURL.pathname === `/articles/${id}` && article){
      article.views_amount ++;
      updateArticle(article)
      .catch(error => console.error(error));
    }
  }, [article]);

  return (
    <div className={`${styles.articlePageContainer} ${styles[theme]}`}>
      <Header/>
        {
        isLoading ?
        (
          <div className={styles.pageMessageContainer}>
            <div></div>
            <h2 className={styles.pageMessage}>Loading...</h2>
          </div>
        ) 
        : hasError ?
        (
          <div className={styles.pageMessageContainer}>
            <div></div>
            <h2 className={styles.pageMessage}>The article couldn't be loaded.<br/>Try again by refreshing the page.</h2>
          </div>
        ) :
          article ?
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
          :
          (
            <div className={styles.pageMessageContainer}>
              <div></div>
              <h2 className={styles.pageMessage}>This article doesn't exists.<br/>Check if the URL  of the page is correct.</h2>
            </div>
          )
        }
      <Footer/>
    </div>
  )
}

export default Article;