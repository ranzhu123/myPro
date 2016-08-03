import React from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import MainPage from '../../component/MainPage/MainPage';
import PageContent from '../../component/PageContent/PageContent';
import AddArticlePage from '../../component/page/AddArticlePage/components/AddArticlePage';

class MyRouter extends React.Component{
  constructor(props,content){
    super(props,content);
  }

  render(){
    return <Router history={hashHistory}>
      <Route name="dengl"                           bpath="#/"                  path="/"         component={MainPage}/>
      <Route name="首页"                           bpath="#/home"                  path="/home"         component={MainPage}>
        <IndexRoute name="首页"                    bpath="#/home"                                       component={PageContent}/>
        <Route name="新增文章"   sort="Article"    bpath="#/home/addArticle"       path="addArticle"    component={AddArticlePage}/>
      </Route>
    </Router>
  }
}
/*<Route name="编辑文章"   sort="Article"    bpath="#/home/editArticle"      path="editArticle"   component={EditArticlePage}/>
 <Route name="删除文章"   sort="Article"    bpath="#/home/delArticle"       path="delArticle"    component={DelArticlePage}/>
 <Route name="新增笔记"   sort="Note"       bpath="#/home/addNote"          path="addNote"       component={AddNotePage}/>
 <Route name="编辑笔记"   sort="Note"       bpath="#/home/editNote"         path="editNote"      component={EditNotePage}/>
 <Route name="删除笔记"   sort="Note"       bpath="#/home/delNote"          path="delNote"       component={DelNotePage}/>
 <Route name="新增图书"   sort="Book"       bpath="#/home/addBook"          path="addBook"       component={AddBookPage}/>
 <Route name="编辑图书"   sort="Book"       bpath="#/home/editBook"         path="editBook"      component={EditBookPage}/>
 <Route name="删除图书"   sort="Book"       bpath="#/home/delBook"          path="delBook"       component={DelBookPage}/>
 <Route name="编辑评论"   sort="Comment"    bpath="#/home/editComment"      path="editComment"   component={EditCommentPage}/>
 <Route name="删除评论"   sort="Comment"    bpath="#/home/delComment"       path="delComment"    component={DelCommentPage}/>
 <Route name="新增外链"   sort="Link"       bpath="#/home/addLink"          path="addLink"       component={AddLinkPage}/>
 <Route name="编辑外链"   sort="Link"       bpath="#/home/editLink"         path="editLink"      component={EditLinkPage}/>
 <Route name="删除外链"   sort="Link"       bpath="#/home/delLink"          path="delLink"       component={DelLinkPage}/>
 <Route name="新增分类"   sort="Sort"       bpath="#/home/addSort"          path="addSort"       component={AddSortPage}/>
 <Route name="编辑分类"   sort="Sort"       bpath="#/home/editSort"         path="editSort"      component={EditSortPage}/>
 <Route name="删除分类"   sort="Sort"       bpath="#/home/delSort"          path="delSort"       component={DelSortPage}/>
 <Route name="文章推荐量" sort="Recom"      bpath="#/home/articleRecom"     path="articleRecom"  component={ArticleRecomPage}/>
 <Route name="笔记推荐量" sort="Recom"      bpath="#/home/noteRecom"        path="noteRecom"     component={NoteRecomPage}/>
 <Route name="图书推荐量" sort="Recom"      bpath="#/home/bookRecom"        path="bookRecom"     component={BookRecomPage}/>
 <Route name="新增用户"   sort="User"       bpath="#/home/addUser"          path="addUser"       component={AddUserPage}/>
 <Route name="编辑用户"   sort="User"       bpath="#/home/editUser"         path="editUser"      component={EditUserPage}/>
 <Route name="删除用户"   sort="User"       bpath="#/home/delUser"          path="delUser"       component={DelUserPage}/>
 <Route path="*" component={NotFoundPage}/>*/
export default MyRouter;