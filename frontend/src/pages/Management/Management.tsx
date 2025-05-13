import { Link } from 'react-router-dom';
import EditableArticleCard from '../../components/EditableArticleCard/EditableArticleCard';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import ManagementMain from '../../components/ManagementMain/ManagementMain';
import { Article } from '../../context/ArticlesContext';
import styles from './css/Management.module.scss';
import { useTheme } from '../../context/ThemeContext';
import { useEffect, useState } from 'react';
import { deleteArticle, getArticlesWithBanner } from '../../api/articlesAPI';
import ChoiceModal from '../../components/ChoiceModal/ChoiceModal';
import { useMediaQuery } from '../../hooks/MatchMediaQuery';

const Management = () => {

  const [articles, setArticles] = useState<Article[] | null>(null);
  const [articleId, setArticleId] = useState<number | null>(null);
  const [showChoiceModal, setShowChoiceModal] = useState<boolean>(false);
  const isDesktop = useMediaQuery("(min-width: 425px)");
  const whitePlusIconPath = "/OtherIcons/whitePlus-icon.png";

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

  const handleDeleteArticle = () => {
    if(articleId !== null) {
      deleteArticle(articleId)
      .then(() => {
        setArticles(prev => prev ? prev.filter(article => article.id !== articleId) : []);
        setShowChoiceModal(false);
        setArticleId(null);
      })
      .catch(console.error);
    }
  }

  const { theme } = useTheme();

  return (
    <div className={`${styles.managementPageContainer} ${styles[theme]}`}>
      <Header/>
      <ManagementMain>
        {
          isLoading ?
          (
            <>
              <div></div>
              <h2 className={styles.pageMessage}>Loading...</h2>
            </>
        ) 
          : hasError ?
          (
            <>
              <div></div>
              <h2 className={styles.pageMessage}>The articles couldn't be loaded.<br/>Try again by refreshing.</h2>
            </>
          ) :
            articles ? articles.map((article) => (
              <EditableArticleCard
                key={article.id}
                id={article.id}
                title={article.title}
                tags={article.tags}
                is_published={article.is_published}
                publish_date={article.publish_date}
                banner_url={article.banner_url}
                banner_alt={article.banner_alt}
                views_amount={article.views_amount}
                hearts_amount={article.hearts_amount}
                onShowChoiceModal={() => {setShowChoiceModal(true); setArticleId(article.id)}}
              />
        ))
        :
          <>
            <div></div>
            <h2 className={styles.pageMessage}>There are no articles yet.</h2>
          </>
        }
        
        {showChoiceModal && <ChoiceModal category='deleteArticle' isVisible={showChoiceModal} closeModal={() => setShowChoiceModal(false)} confirmChoice={handleDeleteArticle}/>}

        <Link to={'/management/create'} className={styles.link}>{isDesktop ? "Create a new article" : <img src={whitePlusIconPath}/>}</Link>
      </ManagementMain>
      <Footer/>
    </div>
  )
}

export default Management;