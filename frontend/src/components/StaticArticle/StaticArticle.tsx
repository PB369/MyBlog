import { Link } from 'react-router-dom';
import styles from './css/StaticArticle.module.scss';
import { useThemedIcon } from '../../hooks/ConditionalsHooks';

type Props = {
  title: string,
  tags: string[],
  publish_date: string,
  banner_url: string,
  banner_alt: string,
  article_content: string,
  views_amount: number,
  hearts_amount: number,
}

const StaticArticle = ({title, tags, publish_date, banner_url, banner_alt, article_content, views_amount, hearts_amount}: Props) => {
  const arrowIconPath = useThemedIcon("arrow-icon.png");
  const eyeIconPath = useThemedIcon("eye-icon.png");
  const heartIconPath = "../../../OtherIcons/heart-icon.png";
  
  return (
    <article className={styles.article}>
      <header>
        <div className={styles.articleInteractions}>
          <Link to={'/'} className={styles.link}>
            <img src={arrowIconPath} alt="arrow-icon" />
          </Link>
          <div className={styles.viewAndHeart}>
            <div className={styles.viewDiv}>
              <img src={eyeIconPath} alt="eye-icon" />
              <p>{views_amount}</p>
            </div>
            <div className={styles.heartDiv}>
              <img src={heartIconPath} alt="heart-icon" />
              <p>{hearts_amount}</p>
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
        <img src={banner_url} alt={banner_alt} />
        {article_content.split("\n\n").map((text, index, arr) =>
          (<div key={index}>
            <p>{text}</p>
            {index !== (arr.length - 1) && <br/>}
          </div>)
        )}
      </main>
    </article>
  )
}

export default StaticArticle;