import axiosAPI from "./axiosAPI";

export const getArticles = async () => {
  const response = await axiosAPI.get('/');
  return response.data;
}

export const createArticle = async () => {
  const response = await axiosAPI.post('/articles');
  return response.data;
}

export const updateArticle = async (article) => {
  const response = await axiosAPI.put(`/articles/${article.id}`, article);
  return response.data;
}

export const deleteArticle = async (id) => {
  const response = await axiosAPI.delete(`/articles/${id}`);
  return response.data;
}