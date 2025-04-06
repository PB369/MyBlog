import { useParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './css/Article.module.scss';
import { useArticles } from '../../context/ArticlesContext';

const Article = () => {
  const { id } = useParams();

  const articles = useArticles();
  const article = articles.find(article => article.id === Number(id));

  return (
    <>
      <Header/>
      {
      article ? // If the article was found, render this:
        <article>
          <header>
            <div>
              <img src="" alt="" />
              <div>
                <div>
                  <img src="" alt="" />
                  <p>{article.viewAmount}</p>
                </div>
                <div>
                  <img src="" alt="" />
                  <p>{article.heartsAmount}</p>
                </div>
              </div>
            </div>
            <div>
              <h2>{article.title}</h2>
              <p>{article.publishDate}</p>
              {article.tags.map((tag, index) => <span key={index}>{tag}</span>)}
            </div>
          </header>
          <main>
            <img src={article.bannerURL} alt={article.bannerAlt} />
            {article.content.split("\n\n").map((text, index) => <p key={index}>{text}</p>)}
          </main>
        </article>
      : // If not, render this:
        <h2>Não foi possível carregar o conteúdo deste artigo.</h2>
      }
      <Footer/>
    </>
  )
}

export default Article;