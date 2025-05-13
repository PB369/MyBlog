import { useParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import styles from './css/ArticleEdition.module.scss';
import EditableArticle from '../../components/EditableArticle/EditableArticle';
import { useTheme } from '../../context/ThemeContext';
import { useEffect, useState } from 'react';
import { ArticleType, getArticlesByIdWithBanner } from '../../api/articlesAPI';

enum PageMessagesCategory {
  ArticleLoadingError = "ArticleLoadingError",
  ArticleIsLoading = "ArticleIsLoading",
  NoArticlesYet = "NoArticlesYet",
}

const PageMessages = {
  [PageMessagesCategory.ArticleLoadingError]: "Posts couldn't be loaded. Try again later.",
  [PageMessagesCategory.ArticleIsLoading]: "Loading...",
  [PageMessagesCategory.NoArticlesYet]: "There are no posts yet.",
}

const ArticleEdition = () => {

  const [articleData, setArticleData] = useState<ArticleType | null>(null);

  const { id } = useParams();

  const isNewArticle = !id;
  
  
  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const [publishDate, setPublishDate] = useState<string>("");
  const [bannerName, setBannerName] = useState<string>("");
  const [bannerUrl, setBannerUrl] = useState<string>("");
  const [bannerAlt, setBannerAlt] = useState<string>("");
  const [heartsAmount, setheartsAmount] = useState<number>(0);
  const [viewsAmount, setViewsAmount] = useState<number>(0);
  const [articleContent, setArticleContent] = useState<string>("");

  const [pageMessageCategory, setPageMessageCategory] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  useEffect(()=>{
    if(!isNewArticle){
      setIsLoading(true);
      getArticlesByIdWithBanner(Number(id))
      .then(article => {
        setTitle(article.title);
        setTags(article.tags);
        setIsPublished(article.is_published);
        setPublishDate(article.publish_date);
        setBannerName(article.banner_name);
        setBannerUrl(article.banner_url);
        setBannerAlt(article.banner_alt);
        setheartsAmount(article.hearts_amount);
        setViewsAmount(article.views_amount);
        setArticleContent(article.article_content);

        setIsLoading(false);
      })
      .catch(error => {
        setPageMessageCategory(PageMessages[PageMessagesCategory.ArticleLoadingError]);
        setIsLoading(false);
        console.error(error);
      });
    }
  }, [id]);

  const { theme } = useTheme();

  return (
    <div className={`${styles.articleEditionPageContainer} ${styles[theme]}`}>
      <Header/>
      {
        isLoading ?
        (<h2>Loading...</h2>) 
        :
        
          <>
            <EditableArticle
              isNewArticle={isNewArticle}
              id={Number(id) || 0}
              title={title}
              tags={tags}
              is_published={isPublished}
              publish_date={publishDate}
              banner_name={bannerName}
              banner_url={bannerUrl}
              banner_alt={bannerAlt}
              article_content={articleContent}
              views_amount={viewsAmount}
              hearts_amount={heartsAmount}
            />
          </>
        : // If not, render this:
          <h2>It was not possible to load the article.</h2>
      }
      <Footer/>
    </div>
  )
}

export default ArticleEdition;