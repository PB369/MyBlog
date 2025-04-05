import './css/ArticleCard.module.scss';

type Props = {
  title: string,
  tags: string[],
  publishDate: string,
  bannerURL: string,
  bannerAlt: string,
  content: string,
}

const ArticleCard = ({title, tags, publishDate, bannerURL, bannerAlt, content}: Props) => {
  return (
    <>
      <article>
        <div>
          <div>
            {tags.map((tag) => <span>{tag}</span>)}
            <div>
              <h4>{title}</h4>
              <p>{publishDate}</p>
            </div>
            <p>{content}</p>
          </div>
          <button>Read it all</button>
        </div>
        <img src={bannerURL} alt={bannerAlt}/>
      </article>
    </>
  )
}

export default ArticleCard;