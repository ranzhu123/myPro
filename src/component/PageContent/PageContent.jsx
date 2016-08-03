import styles from './PageContent.css';

import React from 'react';
import {Collapse} from 'antd';
import {Link} from 'react-router';

import Contants from '../../constant/Contants';
import Action from '../../action/Action';
import Store from '../../store/Store';

const routes = Store.getMenus();

class PageContent extends React.Component{
  constructor(props,content){
    super(props,content);
  }

  render(){
    let allRoutes = this.getAllRoutes();
    return <div className={styles['container']}>
      {allRoutes}
         </div>
  }

  getAllRoutes=()=>{
    routes.shift();
    return routes.map((route)=>{
      let routeContent = (route.children).map((itemRoute)=>{
        return <div className={styles['itemRoute']}><Link to={itemRoute.path||"/under-construction"}>{itemRoute.header}</Link></div>
      });
      return <div className={styles['routeType']}>
        <div className={styles['title']}>{route.header}</div>
        <div className={styles['list']}>{routeContent}</div>
      </div>
    })
  }
}

export default PageContent;