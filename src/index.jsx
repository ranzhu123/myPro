import ReactDom from 'react-dom';
import React from 'react';
import 'antd/dist/antd.css'
import { Router, browserHistory, hashHistory } from 'react-router';
import MyRouter from './routes/Router/Router';
import MainPage from './component/MainPage/MainPage';
import UnderConstruction from './component/UnderConstruction/UnderConstruction';
import AddArticlePage from './component/page/AddArticlePage/components/AddArticlePage';
import EditArticlePage from './component/page/EditArticlePage/components/EditArticlePage';
import DelArticlePage from './component/page/DelArticlePage/components/DelArticlePage';
import PageContent from './component/PageContent/PageContent';

const routeArray=[{
  path: 'under-construction',
  component: UnderConstruction
},{
  path: 'addArticle-page',
  name: '添加文章',
  component: AddArticlePage
},{
  path: 'editArticle-page',
  name: '编辑文章',
  component: EditArticlePage
},{
  path: 'delArticle-page',
  name: '删除文章',
  component: DelArticlePage
},{
  path: 'home',
  name: '主页',
  component: PageContent
}

];

const routes = {
    component:MainPage,
    name:"首页",
    path:"/",
    indexRoute:{component:PageContent},
    childRoutes:/*[
      require('./component/page/AddArticlePage')  // 智能分析
    ]*/
    routeArray.map((route)=>{
     return {
     path: route.path,
     name: route.name,
     component: route.component
     }
     }).concat([{
      path:"*",
      component:UnderConstruction
    }])
}

ReactDom.render(
  <Router routes={routes} history={hashHistory}></Router>,
  document.getElementById("root_page")
);