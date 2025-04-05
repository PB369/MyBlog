import ArticleCard from '../../components/ArticleCard/ArticleCard';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import './css/Home.module.scss';

const articles = [
  {
    id: 1,
    title: "Article 1",
    tags: ["Tag 1", "Tag 2", "Tag 3"],
    publishDate: "12/03/2025",
    bannerURL: "",
    bannerAlt: "",
    heartsAmount: 12,
    viewAmount: 34,
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis magnam atque enim amet dolor deleniti et voluptatem. Odio quod at, hic fugiat suscipit sed magnam ad alias, asperiores, omnis ex. Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis magnam atque enim amet dolor deleniti et voluptatem. Odio quod at, hic fugiat suscipit sed magnam ad alias, asperiores, omnis ex.",
  },

  {
    id: 2,
    title: "Article 2",
    tags: ["Tag 1", "Tag 2"],
    publishDate: "09/06/2025",
    bannerURL: "",
    bannerAlt: "",
    heartsAmount: 0,
    viewAmount: 4,
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis magnam atque enim amet dolor deleniti et voluptatem. Odio quod at, hic fugiat suscipit sed magnam ad alias, asperiores, omnis ex. Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis magnam atque enim amet dolor deleniti et voluptatem. Odio quod at, hic fugiat suscipit sed magnam ad alias, asperiores, omnis ex.",
  },
];

const Home = () => {
  return (
    <>
      <Header/>
      <Main>
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            title={article.title}
            tags={article.tags}
            publishDate={article.publishDate}
            bannerURL={article.bannerURL}
            bannerAlt={article.bannerAlt}
            content={article.content}
          />
        ))}
      </Main>
      <Footer/>
    </>
  )
}

export default Home;