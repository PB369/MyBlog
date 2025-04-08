import { useContext, createContext, ReactNode } from "react";

export type Article = {
  id: number,
  title: string,
  tags: string[],
  isPublished: boolean,
  publishDate: string,
  bannerURL: string,
  bannerAlt: string,
  heartsAmount: number,
  viewAmount: number,
  content: string,
};

const articles: Article[] = [
  {
    id: 1,
    title: "Article 1",
    tags: ["Tag 1", "Tag 2", "Tag 3"],
    isPublished: true,
    publishDate: "12/03/2025",
    bannerURL: "../../public/LightIcons/blocked-icon.png",
    bannerAlt: "block-icon",
    heartsAmount: 12,
    viewAmount: 34,
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis magnam atque enim amet dolor deleniti et voluptatem. Odio quod at, hic fugiat suscipit sed magnam ad alias, asperiores, omnis ex. Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis magnam atque enim amet dolor deleniti et voluptatem. Odio quod at, hic fugiat suscipit sed magnam ad alias, asperiores, omnis ex.\n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis magnam atque enim amet dolor deleniti et voluptatem. Odio quod at, hic fugiat suscipit sed magnam ad alias, asperiores, omnis ex. Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis magnam atque enim amet dolor deleniti et voluptatem. Odio quod at, hic fugiat suscipit sed magnam ad alias, asperiores, omnis ex.",
  },

  {
    id: 2,
    title: "Article 2",
    tags: ["Tag 1", "Tag 2"],
    isPublished: true,
    publishDate: "09/06/2025",
    bannerURL: "../../public/LightIcons/blocked-icon.png",
    bannerAlt: "block-icon",
    heartsAmount: 0,
    viewAmount: 4,
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis magnam atque enim amet dolor deleniti et voluptatem. Odio quod at, hic fugiat suscipit sed magnam ad alias, asperiores, omnis ex. Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis magnam atque enim amet dolor deleniti et voluptatem. Odio quod at, hic fugiat suscipit sed magnam ad alias, asperiores, omnis ex.\n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis magnam atque enim amet dolor deleniti et voluptatem. Odio quod at, hic fugiat suscipit sed magnam ad alias, asperiores, omnis ex. Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis magnam atque enim amet dolor deleniti et voluptatem. Odio quod at, hic fugiat suscipit sed magnam ad alias, asperiores, omnis ex.",
  },
];

const ArticleContext = createContext<Article[]>([]);

export const useArticles = () => useContext(ArticleContext);

export const ArticlesProvider = ({children}: {children: ReactNode}) => {
  return (
    <ArticleContext.Provider value={articles}>
      {children}
    </ArticleContext.Provider>
  )
}