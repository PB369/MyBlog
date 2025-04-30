import { useContext, createContext, ReactNode } from "react";

export type Article = {
  id: number,
  title: string,
  tags: string[],
  is_published: boolean,
  publish_date: string,
  banner_url: string,
  banner_name: string,
  banner_alt: string,
  hearts_amount: number,
  views_amount: number,
  article_content: string,
};

const articles: Article[] = [
  {
    id: 1,
    title: "Article 1 aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    tags: ["Tag 1", "Tag 2", "Tag 3", "Tag 4", "Tag 5"],
    is_published: false,
    publish_date: "12/03/2025",
    banner_name: "",
    banner_url: "../../public/LightIcons/blocked-icon.png",
    banner_alt: "block-icon",
    hearts_amount: 120,
    views_amount: 340,
    article_content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis magnam atque enim amet dolor deleniti et voluptatem. Odio quod at, hic fugiat suscipit sed magnam ad alias, asperiores, omnis ex. Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis magnam atque enim amet dolor deleniti et voluptatem. Odio quod at, hic fugiat suscipit sed magnam ad alias, asperiores, omnis ex.\n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis magnam atque enim amet dolor deleniti et voluptatem. Odio quod at, hic fugiat suscipit sed magnam ad alias, asperiores, omnis ex. Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis magnam atque enim amet dolor deleniti et voluptatem. Odio quod at, hic fugiat suscipit sed magnam ad alias, asperiores, omnis ex.\n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis magnam atque enim amet dolor deleniti et voluptatem. Odio quod at, hic fugiat suscipit sed magnam ad alias, asperiores, omnis ex. Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis magnam atque enim amet dolor deleniti et voluptatem. Odio quod at, hic fugiat suscipit sed magnam ad alias, asperiores, omnis ex.",
  },

  {
    id: 2,
    title: "Article 2",
    tags: ["Tag 1", "Tag 2"],
    is_published: true,
    publish_date: "09/06/2025",
    banner_name: "",
    banner_url: "../../public/LightIcons/blocked-icon.png",
    banner_alt: "block-icon",
    hearts_amount: 0,
    views_amount: 4,
    article_content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis magnam atque enim amet dolor deleniti et voluptatem. Odio quod at, hic fugiat suscipit sed magnam ad alias, asperiores, omnis ex. Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis magnam atque enim amet dolor deleniti et voluptatem. Odio quod at, hic fugiat suscipit sed magnam ad alias, asperiores, omnis ex.\n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis magnam atque enim amet dolor deleniti et voluptatem. Odio quod at, hic fugiat suscipit sed magnam ad alias, asperiores, omnis ex. Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis magnam atque enim amet dolor deleniti et voluptatem. Odio quod at, hic fugiat suscipit sed magnam ad alias, asperiores, omnis ex.",
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