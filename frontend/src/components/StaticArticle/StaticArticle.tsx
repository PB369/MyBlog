import { Link, useParams } from 'react-router-dom';
import styles from './css/StaticArticle.module.scss';
import { useThemedIcon } from '../../hooks/ConditionalsHooks';
import { useEffect, useState } from 'react';
import { ArticleType, updateArticle } from '../../api/articlesAPI';

type Props = {
  article: ArticleType,
  title: string,
  tags: string[],
  publish_date: string,
  banner_url: string,
  banner_alt: string,
  article_content: string,
  views_amount: number,
  hearts_amount: number,
}

const StaticArticle = ({article, title, tags, publish_date, banner_url, banner_alt, article_content, views_amount, hearts_amount}: Props) => {
  const arrowIconPath = useThemedIcon("arrow-icon.png");
  const eyeIconPath = useThemedIcon("eye-icon.png");
  const [heartIconPath, setHeartIconPath] = useState<string | undefined>(undefined);
  const [isLiked, setIsLiked] = useState<boolean>(Boolean(localStorage.getItem('IsLiked')));
  const [heartsAmount, setHeartsAmount] = useState<number>(hearts_amount);
  const {id} = useParams();

  useEffect(()=>{
    const localIsLiked = localStorage.getItem(`article-${id}-IsLiked`);
    if(localIsLiked === "true"){
      setIsLiked(true);
      setHeartIconPath("/OtherIcons/filled-heart-icon.png");
    } else {
      setHeartIconPath("/OtherIcons/heart-icon.png");
      setIsLiked(false);
    }
  }, [id]);

  const handleArticleHeart = () => {
    const oppositeIsLiked = !isLiked;
    const updatedArticle = { ...article };
    
    if(oppositeIsLiked) {
      updatedArticle.hearts_amount ++;
      setHeartIconPath("/OtherIcons/filled-heart-icon.png");
      setHeartsAmount(prev => prev + 1);
    } else {
      updatedArticle.hearts_amount --;
      setHeartIconPath("/OtherIcons/heart-icon.png");
      setHeartsAmount(prev => Math.max(0, prev - 1));
    }

    setIsLiked(oppositeIsLiked);
    localStorage.setItem(`article-${id}-IsLiked`, String(oppositeIsLiked));

    updateArticle(updatedArticle)
    .catch(error => console.error(error));
  }
  
  return (
    <article className={styles.article}>
      <header>
        <div className={styles.articleInteractions}>
          <Link to={'/'} className={styles.link}>
            <img src={arrowIconPath} alt="arrow-icon" />
          </Link>
          <div className={styles.viewAndHeart}>
            <div className={styles.viewContainer}>
              <img src={eyeIconPath} alt="eye-icon" />
              <p>{views_amount}</p>
            </div>
            <div className={styles.heartContainer}>
              <button className={styles.heartBtn} onClick={handleArticleHeart}>
                <img src={heartIconPath} alt="heart-icon" />
              </button>
              <p>{heartsAmount}</p>
            </div>
          </div>
        </div>
        <div className={styles.articleInfos}>
          <div className={styles.titleAndDate}>
            <h2>{title}</h2>
            <p>{publish_date}</p>
          </div>
          <div className={styles.tagsContainer}>
            {tags.map((tag, index) => <span key={index} className={styles.tags}>{tag}</span>)}
          </div>
        </div>
      </header>
      <main>
        <img src={banner_url} alt={banner_alt} className={styles.banner}/>
        {article_content.split('-&@&-').map((text, index, arr) =>
          (<div key={index}>
            <p>{text}</p>
            {index !== (arr.length - 1) && <br/>}
          </div>))}
      </main>
    </article>
  )
}

export default StaticArticle;