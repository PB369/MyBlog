import StaticArticleCard from '../../components/StaticArticleCard/StaticArticleCard';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import HomeMain from '../../components/HomeMain/HomeMain';
import { useArticles } from '../../context/ArticlesContext';
import styles from './css/Home.module.scss';
import { useTheme } from '../../context/ThemeContext';
import { useEffect, useState } from 'react';
import { Article, getArticles } from '../../api/articlesAPI';

const Home = () => {
  const [articles, setArticles] = useState<Article[] | null>(null);
  
  useEffect(()=>{
      getArticles()
      .then(setArticles)
      .catch(console.error);
  }, []);

  // const articles = useArticles();
  const { theme } = useTheme();

  return (
    <div className={`${styles.homePageContainer} ${styles[theme]}`}>
      <Header/>
      <HomeMain>
        {articles ? 
          articles.map((article) => (
            <StaticArticleCard
              key={article.id}
              id={article.id}
              title={article.title}
              tags={article.tags}
              publishDate={article.publish_date}
              bannerURL={article.banner_url}
              bannerAlt={article.banner_alt}
              content={article.article_content}
            />
          ))
          :
          <p>There are no posts yet.</p>
        }
      </HomeMain>
      <Footer/>
    </div>
  )
}

export default Home;