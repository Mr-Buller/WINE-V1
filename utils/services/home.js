import axios from "axios";
import VueCookies from "vue-cookies";
import endPoint from "./../end-points";

const service = {};

service.headers = function() {
  let token = VueCookies.get("accessToken");
  if (token) {
    let header = {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
    };
    return header;
  } else {
    service.logout();
  }
};

service.headerWithoutToken = function() {
  let header = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return header;
};

service.validateError = function(error) {
  console.log("errorddddd ", error)
  // let httpCode = error.response.status;
  // console.log(httpCode);
  // switch (httpCode) {
  //   case 401:
  //     if (error.response.data.statusCode == "4410") {
  //       return error.response.data;
  //     } else {
  //       service.logout();
  //     }
  //     break;
  //   default:
  //     return error.response.data;
  // }
};

service.logout = function() {
  VueCookies.remove("accountId");
  VueCookies.remove("accessToken");
  VueCookies.remove("refreshToken");
  location.reload();
};

service.getCategories = async function(body) {
  return await axios
    .post(endPoint.getCategories, 
      body, 
      service.headerWithoutToken())
    .then((response) => {
      return response.data;
    })
    .catch(function(error) {
      return service.validateError(error);
    });
};
service.getArticlesHome = async function(params) {
  return await axios
    .get(endPoint.getArticlesHome+params,
      service.headerWithoutToken())
    .then((response) => {
      return response.data;
    })
    .catch(function(error) {
        return service.validateError(error);
    });
};
service.getArticles = async function(params,body) {
  return await axios
    .post(endPoint.getArticles+params,body,
      service.headerWithoutToken())
    .then((response) => {
      return response.data;
    })
    .catch(function(error) {
        return service.validateError(error);
    });
};
service.getDetail = async function(id) {
  return await axios
    .get(endPoint.getDetail+"/"+id,
      service.headerWithoutToken())
    .then((response) => {
      return response.data;
    })
    .catch(function(error) {
      return service.validateError(error);
    });
};
service.getArticlesByFieldName = async function (body,params) {
  return await axios
    .post(endPoint.getArticlesByFieldName+params, 
      body, 
      service.headerWithoutToken())
    .then((response) => {
      
      console.log(response)
      return response.data;
    })
    .catch(function(error) {
      console.log(error)
      return service.validateError(error);
    });
};
service.getArticleTrending = async function(params) {
  return await axios
    .get(endPoint.getArticleTrending+params,
      service.headerWithoutToken())
    .then((response) => {
      return response.data;
    })
    .catch(function(error) {
      return service.validateError(error);
    });
};
service.searchArticle = async function (body) {
  return await axios
    .post(endPoint.searchArticle, 
      body, 
      service.headerWithoutToken())
    .then((response) => {
      return response.data;
    })
    .catch(function(error) {
      console.log(error)
      return service.validateError(error);
    });
};
service.getBanner = async function() {
  return await axios
    .post(endPoint.getBanner,'',
      service.headerWithoutToken())
    .then((response) => {
      return response.data;
    })
    .catch(function(error) {
      return service.validateError(error);
    });
};
service.getUser = async function(body) {
  return await axios
    .post(endPoint.getUser,
      body,
      service.headerWithoutToken())
    .then((response) => {
      return response.data;
    })
    .catch(function(error) {
        return service.validateError(error);
    });
};
export default service;