import styles from './UnderConstruction.css';

import React from 'react';

class UnderConstruction extends React.Component{
  constructor(props,content){
    super(props,content);
    this.state = {
      headHeight:80,
      leftWidth: 300
    }
    this.render = this.render.bind(this);
  }

  render(){
    return <div className={styles['underConstruction']}>
      {"正在建设中。。。"}
    </div>
  }
}

export default UnderConstruction;