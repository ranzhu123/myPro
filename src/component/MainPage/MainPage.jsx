import styles from './MainPage.css';
import "../../style/uncompileBase.css";

import React from 'react'
import {Row,Col} from 'antd';

import Contants from '../../constant/Contants';
import Action from '../../action/Action';
import Store from '../../store/Store';
import LeftMenu from '../LeftMenu/LeftMenu';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import PageContent from '../PageContent/PageContent';
import MyBreadCrumb from '../../development/BreadCrumb/BreadCrumb';

class MainPage extends React.Component{
  constructor(props,content){
    super(props,content);
    this.state = {
      headHeight:80,
      leftWidth: 300
    }
    this.render = this.render.bind(this);
  }

  render(){
    let {children} = this.props;
    let content = children?
      children
      :
      <PageContent/>
    return <div className={styles['mainpage']}>
      <LeftMenu/>
      <div className={styles['container']}>
        <Header style={{height:this.state.headHeight}}/>
        <div className={styles['content']}>
          <MyBreadCrumb routes={this.props.routes}/>
          {content}
        </div>
        <Footer/>
      </div>
    </div>
  }
}

export default MainPage;