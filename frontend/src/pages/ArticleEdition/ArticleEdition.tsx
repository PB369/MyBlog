import { useParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import styles from './css/ArticleEdition.module.scss';
import EditableArticle from '../../components/EditableArticle/EditableArticle';
import { useTheme } from '../../context/ThemeContext';
import { useEffect, useState } from 'react';
import { ArticleType, getArticlesByIdWithBanner } from '../../api/articlesAPI';
import { isGuest } from '../../utils/checkGuestMode';

const ArticleEdition = () => {

  const { id } = useParams();

  const [isNewArticle, setIsNewArticle] = useState(!id);
  
  const [articleTitle, setArticleTitle] = useState<string>("");
  const [articleTags, setArticleTags] = useState<string[]>([]);
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const [articlePublishDate, setArticlePublishDate] = useState<string>("");
  const [bannerName, setBannerName] = useState<string>("");
  const [bannerUrl, setBannerUrl] = useState<string>("");
  const [bannerAlt, setBannerAlt] = useState<string>("");
  const [heartsAmount, setheartsAmount] = useState<number>(0);
  const [viewsAmount, setViewsAmount] = useState<number>(0);
  const [articleContent, setArticleContent] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  
  useEffect(()=>{
    if(!isNewArticle){
      setIsLoading(true);
      setHasError(false);

      if(isGuest()){
        const articles = localStorage.getItem("guestArticles");
        const parsed = articles ? JSON.parse(articles) : [];
        const article = parsed.find((a: ArticleType) => a.id === Number(id));

        if(article){
          setArticleTitle(article.title);
          setArticleTags(article.tags);
          setIsPublished(article.is_published);
          setArticlePublishDate(article.publish_date);
          setBannerName(article.banner_name);
          setBannerUrl(article.banner_url);
          setBannerAlt(article.banner_alt);
          setheartsAmount(article.hearts_amount);
          setViewsAmount(article.views_amount);
          setArticleContent(article.article_content);

          setIsLoading(false);
        } else {
          setHasError(true);
        }
        setIsLoading(false);
      } else {
        getArticlesByIdWithBanner(Number(id))
        .then(article => {
          setArticleTitle(article.title);
          setArticleTags(article.tags);
          setIsPublished(article.is_published);
          setArticlePublishDate(article.publish_date);
          setBannerName(article.banner_name);
          setBannerUrl(article.banner_url);
          setBannerAlt(article.banner_alt);
          setheartsAmount(article.hearts_amount);
          setViewsAmount(article.views_amount);
          setArticleContent(article.article_content);
  
          setIsLoading(false);
        })
        .catch(error => {
          console.error(error);
          setIsLoading(false);
          setHasError(true);
        });
      }
    }
  }, [id]);

  const { theme } = useTheme();

  return (
    <div className={`${styles.articleEditionPageContainer} ${styles[theme]}`}>
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
          <EditableArticle
            isNewArticle={isNewArticle}
            setIsNewArticle={setIsNewArticle}
            id={Number(id) || 0}
            articleTitle={articleTitle}
            setArticleTitle={setArticleTitle}
            articleTags={articleTags}
            setArticleTags={setArticleTags}
            is_published={isPublished}
            articlePublishDate={articlePublishDate}
            setArticlePublishDate={setArticlePublishDate}
            banner_name={bannerName}
            banner_url={bannerUrl}
            banner_alt={bannerAlt}
            articleContent={articleContent}
            setArticleContent={setArticleContent}
            views_amount={viewsAmount}
            hearts_amount={heartsAmount}
          />
      }
      <Footer/>
    </div>
  )
}

export default ArticleEdition;