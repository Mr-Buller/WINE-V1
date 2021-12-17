// const baseUrl = "https://media-news-api.herokuapp.com";
const baseUrl = "https://api.cambodiabusinessjournal.com"
const v1 = '/api/v1'
const api = {
  getCategories: baseUrl + v1 + '/category/query',
  getArticlesHome: baseUrl + v1 + '/content/home',
  getDetail: baseUrl + v1 + '/content/query-one',
  getArticlesByFieldName: baseUrl + v1 + '/content/query',
  getArticleTrending: baseUrl + v1 + '/content/trending',
  getArticles: baseUrl + v1 + '/content/query',
  searchArticle: baseUrl + v1 + '/content/search',
  getBanner: baseUrl + v1 + '/banner/query',
  getUser: baseUrl + v1 + '/user/query'
};
export default api;