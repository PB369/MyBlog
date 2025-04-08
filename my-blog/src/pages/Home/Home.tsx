import StaticArticleCard from '../../components/StaticArticleCard/StaticArticleCard';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import HomeMain from '../../components/HomeMain/HomeMain';
import { useArticles } from '../../context/ArticlesContext';
import styles from './css/Home.module.scss';

const Home = () => {

  const articles = useArticles();

  return (
    <div className={styles.homeContainer}>
      <Header/>
      <HomeMain>
        {articles.map((article) => (
          <StaticArticleCard
            key={article.id}
            id={article.id}
            title={article.title}
            tags={article.tags}
            publishDate={article.publishDate}
            bannerURL={article.bannerURL}
            bannerAlt={article.bannerAlt}
            content={article.content}
          />
        ))}
      </HomeMain>
      <Footer/>
    </div>
  )
}

export default Home;