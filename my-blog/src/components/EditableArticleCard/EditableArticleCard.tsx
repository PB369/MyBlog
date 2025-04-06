import { Link } from 'react-router-dom';
import './css/EditableArticleCard.module.scss';

type Props = {
  id: number,
  title: string,
  tags: string[],
  isPublished: boolean,
  publishDate: string,
  bannerURL: string,
  bannerAlt: string,
  viewAmount: number,
  heartAmount: number,
}

const EditableArticleCard = ({id, title, tags, isPublished, publishDate, bannerURL, bannerAlt, viewAmount, heartAmount}: Props) => {
  return (
    <>
      <article>
        <div>
          <div>
            <div>
              <h3>{title}</h3>
              {isPublished ? null : <p>[Draft Article]</p>}
            </div>
            <p>Publish Date: {publishDate}</p>
          </div>
          <div>
            <div>
              <div>
                <img src="" alt="" />
                <p>{viewAmount}</p>
              </div>
              <div>
                <img src="" alt="" />
                <p>{heartAmount}</p>
              </div>
            </div>
            <div>
              {tags.length > 0 ? tags.map(tag => <span>{tag}</span>) : <span>untagged</span>}
            </div>
          </div>
        </div>
        <img src={bannerURL ? bannerURL : ""} alt={bannerAlt} />
      </article>
      <div>
        <Link to={`edit/${id.toString()}`}>
          <img src="../../../edit-icon.png" alt="" />
        </Link>
        <button>
          <img src="../../../trash-icon.png" alt="" />
        </button>
      </div>
    </>
  )
}

export default EditableArticleCard;