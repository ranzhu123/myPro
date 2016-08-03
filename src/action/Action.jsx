import Contants from '../constant/Contants';
import {dispatch, dispatchAsync} from "../dispatcher/Dispatcher";

const Action  = {

  test: function() {
    console.log("aa")
    dispatch(Contants.TEST,{a:1});
  },

  getArticleFlag: function() {
    const actionType = apiUtilActionType(Contants.GET_ARTICLE_TYPE);
    const request = post("/doit/sortAction/byTypeGetSort",{"type" : "article"})
    dispatchAsync(request,actionType)
  },

  getArticleType: function() {
    const actionType = apiUtilActionType(Contants.GET_ARTICLE_TAG);
    const request = post("/doit/sortAction/byTypeGetSort",{"type" : "tag"})
    dispatchAsync(request,actionType)
  },
  
  submitArticle: function (param,callback) {
    const actionType = apiUtilActionType(Contants.SUBMIT_ARTICLE);
    const request = post("/doit/articleAction/addArticle",param)
    dispatchAsync(request,actionType,param,callback)
  },

  //获得文章数量
  getArticleCount: function(param,callback) {
    const actionType = apiUtilActionType(Contants.GET_ARTICLE_COUNT);
    const request = post("/doit/articleAction/getArticleCount",param)
    dispatchAsync(request,actionType,param,callback)
  },

  //获得文章列表
  getArticleList: function(param) {
    const actionType = apiUtilActionType(Contants.GET_ARTICLE_LIST);
    const request = post("/doit/articleAction/getArticleList",param)
    dispatchAsync(request,actionType,param)
  },

  //获得文章信息，修改
  getArticle: function(param,callback) {
    const actionType = apiUtilActionType(Contants.GET_ARTICLE_INFO);
    const request = post("/doit/articleAction/getArticle",param)
    dispatchAsync(request,actionType,param,callback)
  },

  //修改文章信息
  updateArticle: function(param,callback) {
    const actionType = apiUtilActionType(Contants.UPDATE_ARTICLE);
    const request = post("/doit/articleAction/updateArticle",param)
    dispatchAsync(request,actionType,param,callback)
  },

  //删除文章信息
  delArticle: function(param,callback) {
    const actionType = apiUtilActionType(Contants.DELETE_ARTICLE);
    const request = post("/doit/articleAction/delArticle",param)
    dispatchAsync(request,actionType,param,callback)
  }
}

/**
 * fetch的get请求
 */
function getFetch(url, params, fetchPara = {}) {
  if (params) {
    return fetch(url,  _.assign({
      credentials: 'include',
      method: 'get',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/x-www-form-urlencoded'
        //'Accept': 'application/json',
        //'Content-Type': 'application/json'
      },
      body: apiEncode(params),
      timeout: 60000
    }, fetchPara));
  } else {
    return fetch(url, _.assign({
      credentials: 'include',
      method: 'get',
      timeout: 60000
    }, fetchPara));
  }
}

/**
 * post请求
 */
function post(url, pBody, fetchPara = {}) {
  if (pBody) {
    return fetch(url, _.assign({
      credentials: 'include',
      method: 'post',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        //'Accept': 'application/json',
        //'Content-Type': 'application/json'
      },
      //mode: "cors", // 跨域模式
      body: apiEncode(pBody),
      timeout: 60000
    }, fetchPara));
  } else {
    return fetch(url, _.assign({
      credentials: 'include',
      method: 'post',
      timeout: 60000
    }, fetchPara));
  }
}
// 重新编码
function apiEncode(body={}) {
  let bodyStr = "";
  for(var key in body) {
    bodyStr += key+"="+body[key]+"&";
  }
  return bodyStr.substr(0, bodyStr.length-1);
}

/**
 * 形成ActionType，供promise使用
 */
function apiUtilActionType(pActionType, pActionName={}) {
  if (!pActionType) {
    throw new Error('没有ActionType');
  }

  return {
    request: pActionType,
    success: `${pActionType}_SUCCESS`,
    failure: `${pActionType}_ERROR`,
    ...{actionName: pActionName}
  };
}


export default Action;