import { useParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import styles from './css/ArticleEdition.module.scss';
import EditableArticle from '../../components/EditableArticle/EditableArticle';
import { useTheme } from '../../context/ThemeContext';
import { useEffect, useState } from 'react';
import { ArticleType, getArticlesByIdWithBanner } from '../../api/articlesAPI';

const ArticleEdition = () => {

  const { id } = useParams();

  const [articleData, setArticleData] = useState<ArticleType | null>(null);
    
  useEffect(()=>{
    getArticlesByIdWithBanner(Number(id))
    .then(setArticleData)
    .catch(console.error);
  }, [id]);

  const article  = articleData && id ? articleData : {
    id: 0,
    title: "",
    tags: [],
    is_published: false,
    publish_date: "",
    banner_name: "",
    banner_url: "",
    banner_alt: "",
    hearts_amount: 0,
    views_amount: 0,
    article_content: "",
  };

  const isNewArticle = !id;
  const { theme } = useTheme();

  return (
    <div className={`${styles.articleEditionPageContainer} ${styles[theme]}`}>
      <Header/>
      {
        article ? // If the article was found, render this:
          <>
            <EditableArticle
              isNewArticle={isNewArticle}
              id={article.id}
              title={article.title}
              tags={article.tags}
              is_published={article.is_published}
              publish_date={article.publish_date}
              banner_name={article.banner_name}
              banner_url={article.banner_url}
              banner_alt={article.banner_alt}
              article_content={article.article_content}
              views_amount={article.views_amount}
              hearts_amount={article.hearts_amount}
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