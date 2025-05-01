import axiosAPI from "./axiosAPI";

export type ArticleType = {
  id: number,
  title: string,
  tags: string[],
  is_published: boolean,
  publish_date: string,
  banner_file?: File,
  banner_name: string,
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

export const getArticleById = async (id: ArticleType["id"]) => {
  const response = await axiosAPI.get(`/articles/${id}`);
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

export const getArticleBanner = async (banner_name: string) => {
  const response = await axiosAPI.get(`images/${banner_name}`);
  return response.data.url;
}

export const putArticleBanner = async (file: File) => {
  //Generate the putURL
  const response = await axiosAPI.post(`/images/put-url`, { fileType: file.type });
  const { putURL, fileName } = response.data;

  //Put the article banner:
  await axiosAPI.put(putURL, file, {
    headers: { 'Content-Type': file.type }
  });

  // //Update the article on DB:
  // await axiosAPI.post(`/articles/${article.id}`, article);

  return fileName;
}

export const getArticlesWithBanner = async () => {
  const response = await axiosAPI.get('/articles-with-urls');
  return response.data;
}

export const getArticlesByIdWithBanner = async (id: ArticleType["id"]) => {
  const response = await axiosAPI.get(`/articles-with-urls/${id}`);
  return response.data;
}