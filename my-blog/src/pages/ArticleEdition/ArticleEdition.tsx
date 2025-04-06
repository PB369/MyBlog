import { Link, useParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './css/ArticleEdition.module.scss';
import { useArticles } from '../../context/ArticlesContext';

const ArticleEdition = () => {

  const { id } = useParams();
  const articles = useArticles();
  const article  = id ? articles.find(article => article.id === Number(id)) : {
    id: 0,
    title: "",
    tags: [],
    isPublished: false,
    publishDate: "",
    bannerURL: "",
    bannerAlt: "",
    heartsAmount: 0,
    viewAmount: 0,
    content: "",
  };

  const isNewArticle = !id;

  return (
    <>
      <Header/>
      {
        article ? // If the article was found, render this:
          <article>
            <header>
              <div>
                <Link to={'/management'}>
                  <img src="../../../public/arrow-icon.png" alt="arrow-icon" />
                </Link>
                <div>
                  <div>
                    <img src="" alt="" />
                    <p>{isNewArticle ? 0 : article.viewAmount}</p>
                  </div>
                  <div>
                    <img src="" alt="" />
                    <p>{isNewArticle ? 0 : article.heartsAmount}</p>
                  </div>
                </div>
              </div>
              <div>
                <h2>{isNewArticle ? "Add a title" : article.title}</h2>
                <p>{isNewArticle ? "Add a publish date" : article.publishDate}</p>
                {isNewArticle ? <span>+</span> : article.tags.map((tag, index) => <span key={index}>{tag}</span>)}
              </div>
            </header>
            <main>
              <img src={isNewArticle ? "" : article.bannerURL} alt={isNewArticle ? "" :article.bannerAlt} />
              {isNewArticle ? <p>Add a paragraph</p> : article.content.split("\n\n").map((text, index) => <p key={index}>{text}</p>)}
              <p>Add a paragraph</p>
            </main>
          </article>
        : // If not, render this:
          <h2>Não foi possível carregar o conteúdo deste artigo.</h2>
      }

      <Footer/>
    </>
  )
}

export default ArticleEdition;