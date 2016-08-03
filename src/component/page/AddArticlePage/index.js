/**
 * Created by Administrator on 2016/7/20 0020.
 */
/*module.exports= {
  path:"addArticle-page",
  //getComponent: (nextState, cb) => {
  //  require.ensure([], (require) => {
  //    cb(null, AddArticlePage)
  //  })
  //}
  component:AddArticlePage
  /!*getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/AddArticlePage'))
    })
  }*!/
}*/
module.exports = {
  path: 'calendar',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/AddArticlePage'))
    })
  }
}