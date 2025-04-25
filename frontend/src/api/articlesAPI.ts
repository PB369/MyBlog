import axiosAPI from "./axiosAPI";

export type ArticleType = {
  id: number,
  title: string,
  tags: string[],
  is_published: boolean,
  publish_date: string,
  banner_url: string,
  banner_alt: string,
  hearts_amount: number,
  views_amount: number,
  article_content: string,
};

export const getArticles = async () => {
  const response = await axiosAPI.get('/');
  return response.data;
}

export const createArticle = async (article: ArticleType) => {
  const response = await axiosAPI.post('/articles', article);
  return response.data;
}

export const updateArticle = async (article: ArticleType) => {
  const response = await axiosAPI.put(`/articles/${article.id}`, article);
  return response.data;
}

export const deleteArticle = async (id: ArticleType["id"]) => {
  const response = await axiosAPI.delete(`/articles/${id}`);
  return response.data;
}