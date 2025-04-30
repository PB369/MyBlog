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
  
  useEffect(()=>{
    getArticlesWithBanner()
    .then(setArticles)
    .catch(console.error);
}, []);

  const { theme } = useTheme();

  return (
    <div className={`${styles.homePageContainer} ${styles[theme]}`}>
      <Header/>
      <HomeMain>
        {articles ? //This filter() and the getArticle() are not safe. Remember to replace it with a proper backend autentication logic.
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
          <p className={styles.pageMessage}>There are no posts yet.</p>
        }
      </HomeMain>
      <Footer/>
    </div>
  )
}

export default Home;