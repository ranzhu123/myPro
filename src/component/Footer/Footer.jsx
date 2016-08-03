import styles from './Footer.css';

import React from 'react';
import {Select,Button,Input,Icon } from 'antd';
import classnames from 'classnames';

import Contants from '../../constant/Contants';
import Action from '../../action/Action';
import Store from '../../store/Store';

class Footer extends React.Component{
  constructor(props,content){
    super(props,content);
  }

  render(){
    return <div className={styles['Footer']}>
      52DOIT 版权所有 © 2016 由SuperTimer技术支持
         </div >
  }
}

export default Footer;