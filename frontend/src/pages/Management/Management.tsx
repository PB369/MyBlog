import { Link } from 'react-router-dom';
import EditableArticleCard from '../../components/EditableArticleCard/EditableArticleCard';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import ManagementMain from '../../components/ManagementMain/ManagementMain';
import { useArticles } from '../../context/ArticlesContext';
import styles from './css/Management.module.scss';
import { useTheme } from '../../context/ThemeContext';

const Management = () => {

  const articles = useArticles();
  const { theme } = useTheme();

  return (
    <div className={`${styles.managementPageContainer} ${styles[theme]}`}>
      <Header/>
      <ManagementMain>
        {articles.map((article) => (
          <EditableArticleCard
            key={article.id}
            id={article.id}
            title={article.title}
            tags={article.tags}
            isPublished={article.isPublished}
            publishDate={article.publishDate}
            bannerURL={article.bannerURL}
            bannerAlt={article.bannerAlt}
            viewAmount={article.viewAmount}
            heartAmount={article.heartsAmount}
          />
        ))}
        <Link to={'/management/create'} className={styles.link}>Create a new article</Link>
      </ManagementMain>
      <Footer/>
    </div>
  )
}

export default Management;