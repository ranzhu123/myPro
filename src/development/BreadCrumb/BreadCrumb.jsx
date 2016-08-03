import styles from './BreadCrumb.css';
import "../../style/uncompileBase.css";

import React from 'react'
import {Breadcrumb} from 'antd';
import {Link} from 'react-router';

import Contants from '../../constant/Contants';
import Action from '../../action/Action';
import Store from '../../store/Store';

class MyBreadCrumb extends React.Component{
  constructor(props,content){
    super(props,content);
    this.state = {
      headHeight:80,
      leftWidth: 300
    }
    this.render = this.render.bind(this);
  }

  static PropTypes={
    routes:React.PropTypes.array.isRequired
  }

  render(){
    let routes = this.getRoutesData()
    return <div className={styles['BreadCrumb']}>
      <Breadcrumb separator="/">
        {routes}
      </Breadcrumb>
    </div>
  }

  getRoutesData=()=>{
    let routes = this.props.routes;
    return routes.map((route, index)=>{
      return <Breadcrumb.Item key={index} href={`#${route.path}`}> {route.name} </Breadcrumb.Item>
    })
  }
}

export default MyBreadCrumb;