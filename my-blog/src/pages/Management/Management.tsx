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
              publishDate={article.publishDate}
              bannerURL={article.bannerURL}
              bannerAlt={article.bannerAlt}
              content={article.content}
            />
          ))}
        </ManagementMain>
      <Footer/>
    </>
  )
}

export default Management;