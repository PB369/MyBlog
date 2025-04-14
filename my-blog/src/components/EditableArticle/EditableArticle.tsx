import { Link } from 'react-router-dom';
import styles from './css/EditableArticle.module.scss';
import { useThemedIcon } from '../../utils/conditionalsHooks';

type Props = {
  isNewArticle: boolean,
  title: string,
  tags: string[],
  publishDate: string,
  bannerURL: string,
  bannerAlt: string,
  content: string,
  viewAmount: number,
  heartsAmount: number,
}

const EditableArticle = ({isNewArticle, title, tags, publishDate, bannerURL, bannerAlt, content, viewAmount, heartsAmount}: Props) => {
  let haveAddParagraph: boolean = false;
  return (
    <article>
      <header>
        <div>
          <Link to={'/management'}>
            <img src={useThemedIcon("arrow-icon.png")} alt="arrow-icon" />
          </Link>
          <div>
            <div>
              <img src={useThemedIcon("eye-icon.png")} alt="eye-icon" />
              <p>{isNewArticle ? 0 : viewAmount}</p>
            </div>
            <div>
              <img src={useThemedIcon("heart-icon.png")} alt="heart-icon" />
              <p>{isNewArticle ? 0 : heartsAmount}</p>
            </div>
          </div>
        </div>
        <div>
          <h2>{isNewArticle ? "Add a title" : title}</h2>
          <p>{isNewArticle ? "Add a publish date" : publishDate}</p>
          {isNewArticle ? <span>+</span> : tags.map((tag, index) => <span key={index}>{tag}</span>)}
        </div>
      </header>
      <main>
        <img src={isNewArticle ? "" : bannerURL} alt={isNewArticle ? "" :bannerAlt} />
        {/* Logic to render or not the Add Paragraph option: */}
        {(() => {
          if(isNewArticle) {
            haveAddParagraph = true;
            return <p>Add a paragraph</p>
          } else {
              haveAddParagraph = false
              return content.split("\n\n").map((text, index, arr) =>
                (<div key={index}>
                  <p>{text}</p>
                  {index !== (arr.length - 1) && <br/>}
                </div>)
              )
          }
        })()}
        {haveAddParagraph ? null : <p>Add a paragraph</p>}
      </main>
    </article>
  )
}

export default EditableArticle;