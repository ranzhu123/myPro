import {register} from '../dispatcher/Dispatcher';
import _ from 'lodash';
import {EventEmitter} from 'events';

import Contants from '../constant/Contants';

const CHANGE_EVENT = 'change';

const emitter = new EventEmitter();
emitter.setMaxListeners(0);

const menus = [
  {header: "系统首页",icon:"home"},
  {header: "文章管理",icon:"file",children:[{header: "新增文章",path:"/addArticle-page"},{header: "编辑文章",path:"/editArticle-page"},{header: "删除文章",path:"/delArticle-page"}]},
  {header: "笔记管理",icon:"edit",children:[{header: "新增笔记"},{header: "编辑笔记"},{header: "删除笔记"}]},
  {header: "图书管理",icon:"book",children:[{header: "新增图书"},{header: "编辑图书"},{header: "删除图书"}]},
  {header: "评论管理",icon:"message",children:[{header: "编辑评论"},{header: "删除评论"}]},
  {header: "外链管理",icon:"export",children:[{header: "新增外链"},{header: "编辑外链"},{header: "删除外链"}]},
  {header: "分类管理",icon:"appstore-o",children:[{header: "新增分类"},{header: "编辑分类"},{header: "删除分类"}]},
  {header: "推荐管理",icon:"like",children:[{header: "文章推荐量"},{header: "笔记推荐量"},{header: "图书推荐量"}]},
  {header: "用户管理",icon:"user",children:[{header: "新增用户"},{header: "编辑用户"},{header: "删除用户"}]}
]

//文章类型
let _articleType = [];
//文章标签
let _articleTag = [];
//文章列表
let _articleList = [];
//文章信息
let _articleInfo = {};

const MessageStore = _.assign({},{
  emitChange:()=>{
    emitter.emit(CHANGE_EVENT)
  },

  addChangeListener:(callback)=>{
    emitter.on(CHANGE_EVENT, callback);
  },

  removeChangeListener:(callback)=>{
    emitter.removeListener(CHANGE_EVENT, callback);
  },

  getMenus:()=>{
    return menus;
  },

  /*得到文章类型*/
  getArticleType:()=>{
    return _articleType
  },

  /*设置文章类型*/
  setArticleType:(types)=>{
    _articleType = types;
  },

  /*得到标签类型*/
  getArticleTag:()=>{
    return _articleTag;
  },

  /*设置标签类型*/
  setArticleTag:(types)=>{
    _articleTag = types;
  },

  /*得到文章列表*/
  getArticleList:()=>{
    return _articleList;
  },

  /*设置文章列表*/
  setArticleList:(list)=>{
    _articleList = list;
  },

  /*得到文章信息*/
  getArticleInfo:()=>{
    return _articleInfo;
  },

  /*设置文章信息*/
  setArticleInfo:(list)=>{
    _articleInfo = list;
  },

  /*删除文章*/
  delArticle:(id)=>{
    console.log("_articleList",_articleList)
    _articleList.data = _articleList.data.filter((item)=>{
      if(item.Article_ID === id){
        return false
      }
      return true
    });
  }

});

MessageStore.dispatchToken = register(action=>{

  switch(action.actionType){
    case `${Contants.GET_ARTICLE_TYPE}_SUCCESS`:{
      let response = action.response;
      let queryParams = action.queryParams;
      response.text().then(textData => {
        let types = JSON.parse(textData);
        MessageStore.setArticleType(types);
        MessageStore.emitChange();
      });

      break;
    }

    case `${Contants.GET_ARTICLE_TAG}_SUCCESS`:{
      let response = action.response;
      let queryParams = action.queryParams;
      response.text().then(textData => {
        let tags = JSON.parse(textData);
        MessageStore.setArticleTag(tags);
        MessageStore.emitChange();
      });
    }
      break;

    case `${Contants.SUBMIT_ARTICLE}_SUCCESS`:{
      let response = action.response;
      let queryParams = action.queryParams;
      response.text().then(textData => {
        let result = JSON.parse(textData);
        action.callBack(result);
      });
    }
      break;

    case `${Contants.GET_ARTICLE_COUNT}_SUCCESS`:{
      let response = action.response;
      let queryParams = action.queryParams;
      response.text().then(textData => {
        let count = JSON.parse(textData);
        action.callBack(count);
      });
    }
      break;

    case `${Contants.GET_ARTICLE_LIST}_SUCCESS`:{
      let response = action.response;
      let queryParams = action.queryParams;
      response.text().then(textData => {
        let list = JSON.parse(textData);
        MessageStore.setArticleList(list);
        MessageStore.emitChange();
      });
    }
      break;

    case `${Contants.GET_ARTICLE_INFO}_SUCCESS`:{
      let response = action.response;
      let queryParams = action.queryParams;
      response.text().then(textData => {
        let info = JSON.parse(textData);
        MessageStore.setArticleInfo(info);
        MessageStore.emitChange();
        action.callBack();
      });
    }
      break;

    case `${Contants.UPDATE_ARTICLE}_SUCCESS`:{
      let response = action.response;
      let queryParams = action.queryParams;
      response.text().then(textData => {
        let status = JSON.parse(textData);
        action.callBack(status);
      });
    }
      break;

    case `${Contants.DELETE_ARTICLE}_SUCCESS`:{
      let response = action.response;
      let queryParams = action.queryParams;
      response.text().then(textData => {
        console.log("queryParams",queryParams)
        let status = JSON.parse(textData);
        MessageStore.delArticle(queryParams.selectId);
        MessageStore.emitChange();
        action.callBack(status);
      });
    }
      break;

    default:
      break;
  }
})

export default MessageStore;