import styles from './LeftMenu.css';

import React from 'react';
import { Link } from 'react-router'
import {Menu, Icon } from 'antd';

import Contants from '../../constant/Contants';
import Action from '../../action/Action';
import Store from '../../store/Store';

const SubMenu = Menu.SubMenu;

const menus = Store.getMenus();

class LeftMenu extends React.Component{
  constructor(props,content){
    super(props,content);
    this.state = {
      currentMenu: ""
    }
  }

  render(){
    let menushow = this.getMenuShow();

    return <div className={styles['leftMenu']}>
      <div className={styles['menuLogo']}>
        <img src="../resources/imgs/logo.png"/>
      </div>
      <div className={styles['menuContent']}>
        {menushow}
      </div>
     </div>
  }

  getMenuShow = ()=>{
    let content;
    let result = menus.map((item,index)=>{
      if(index==0){
        return <Menu.Item key={"subLMC"+index+"-0"}>{<Link to="/home"><Icon type={item.icon}/><span>{item.header}</span></Link>}</Menu.Item>
      }else if(item.children){
        content = item.children.map((itemChild,indexChild)=>{
          return  <Menu.Item key={"subLMC"+index+"-"+indexChild}>{<Link to={itemChild.path||"/under-construction"}><span>{itemChild.header}</span></Link>}</Menu.Item>
        });
        return <SubMenu key={"subLM"+index} title={<span><Icon type={item.icon}/><span>{item.header}</span></span>}>{content}</SubMenu>
      }
    })
    return <Menu theme="dark" mode="inline" defaultOpenKeys={[this.state.currentMenu]}>{result}</Menu>
  }

  handleClick=(e)=> {
    console.log('click ', e);
    this.setState({
      currentMenu: e.key
    });
  }
 /* getMenuShow=(menus, index)=>{
    let result = menus.map((firstMenu, indexChildren)=>{
      if(firstMenu.children){
        return this.getMenuShow(firstMenu.children, index+1)
      };
      return <Panel>
        <p>{firstMenu.header}</p>
      </Panel>
    })
    return <Collapse>{result}</Collapse>
  }*/
}

export default LeftMenu;