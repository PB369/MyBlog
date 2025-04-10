import { Link } from 'react-router-dom';
import { useThemedIcon } from '../../utils/conditionalsHooks';
import styles from './css/StaticArticle.module.scss';

type Props = {
  title: string,
  tags: string[],
  publishDate: string,
  bannerURL: string,
  bannerAlt: string,
  content: string,
  viewAmount: number,
  heartsAmount: number,
}

const StaticArticle = ({title, tags, publishDate, bannerURL, bannerAlt, content, viewAmount, heartsAmount}: Props) => {
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
              <p>{viewAmount}</p>
            </div>
            <div className={styles.heartDiv}>
              <img src={heartIconPath} alt="heart-icon" />
              <p>{heartsAmount}</p>
            </div>
          </div>
        </div>
        <div className={styles.articleInfos}>
          <div className={styles.titleAndDate}>
            <h2>{title}</h2>
            <p>{publishDate}</p>
          </div>
          <div className={styles.tagsContainer}>{tags.map((tag, index) => <span key={index} className={styles.tags}>{tag}</span>)}</div>
        </div>
      </header>
      <main>
        <img src={bannerURL} alt={bannerAlt} />
        {content.split("\n\n").map((text, index, arr) => (
          <div key={index}>
            <p>{text}</p>
            {index === (arr.length - 1) && <br/>}
          </div>
        ))}
      </main>
    </article>
  )
}

export default StaticArticle;