import styles from './Editor.css';

import React from 'react'
import {Link} from 'react-router';

import Contants from '../../constant/Contants';
import Action from '../../action/Action';
import Store from '../../store/Store';

class MyEditor extends React.Component{
  constructor(props,content){
    super(props,content);
    this.state = {
    }
    this.render = this.render.bind(this);
  }

  static PropTypes={
    id:React.PropTypes.string.isRequired
  }

  componentDidMount(){
    const editor = new UE.ui.Editor({
      initialContent: "",  // 初始化时显示的内容
      focus: false,  // 是否聚焦
      initialFrameWidth: this.props.width,  // 设置宽度
      initialFrameHeight: this.props.height,  // 设置宽度
      autoClearinitialContent: true,  // focus时自动清空初始化时的内容
      autoHeightEnabled: false
    });
    editor.render(this.props.id);

    var self = this;
    editor.ready( function( ueditor ) {
      var value = self.props.value ? self.props.value : '';
      editor.setContent(value);
    });
  }

  render(){
    return <div className={styles['ueditor']}>
      <script id={this.props.id} name="content" type="text/plain"></script>
    </div>
  }
}

export default MyEditor;