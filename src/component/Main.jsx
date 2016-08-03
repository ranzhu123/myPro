import React from 'react';
import Contants from '../constant/Contants';
import Action from '../action/Action';
import Store from '../store/Store';

class Main extends React.Component{
  constructor(props,content){
    super(props,content);
  }

  render(){
    return <div onClick={()=>{Action.test()}}>{Contants.TEST}</div>
  }
}

export default Main;