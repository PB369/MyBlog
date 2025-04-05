import EditableArticleCard from '../../components/EditableArticleCard/EditableArticleCard';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import ManagementMain from '../../components/ManagementMain/ManagementMain';
import { useArticles } from '../../context/ArticlesContext';
import './css/Management.module.scss';

const Management = () => {

  const articles = useArticles();

  return (
    <>
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
        </ManagementMain>
      <Footer/>
    </>
  )
}

export default Management;