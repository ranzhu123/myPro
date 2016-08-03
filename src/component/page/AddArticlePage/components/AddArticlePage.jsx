import styles from './AddArticlePage.css';

import React from 'react';
import _ from 'lodash';
import {Select, Input, Button, Icon, notification, message} from 'antd';

import Editor from '../../../../development/Editor/Editor';
import MessageStore from '../../../../store/Store';
import Action from '../../../../action/Action';

const Option = Select.Option;

function getAppData(){
  return {
    articleTypes: MessageStore.getArticleType(),
    articleTags: MessageStore.getArticleTag()
  }
}

class AddArticlePage extends React.Component{
  constructor(props,content){
    super(props,content);
    this.state=_.assign(getAppData(),{
      articleTypeID:"",
      articleTypeName:"",
      articleTitle:"",
      articleTag:"",
      articleContent:""
    })
  }

  componentWillMount(){
    Action.getArticleType();
    Action.getArticleFlag();
    MessageStore.addChangeListener(this.storeChange)
  }

  render(){
    let types = this.setType();
    let tags = this.setTag();
    return <div className={styles['container']}>
      <div className={styles['articleTitle']}>
        <div className={styles['type']}>
          {types}
        </div>
        <div className={styles['type']}>
          <Input onChange={this.changeTitle} placeholder="文章名称" size="large" style={{width:470}}/>
        </div>
      </div>
      <Editor
        id="content"
        width="820"
        height="400"
        value=""
      />
      <div className={styles['flag']}>
        {tags}
      </div>
      <div className={styles['submit']}>
        <Button onClick={this.submitArticle} type="primary" size="large"><Icon type="cloud-upload-o"/>提交文章</Button>
      </div>
         </div>
  }

  //提交文章
  submitArticle=()=>{
    let content = UE.getEditor("content").getContent();//得到文章内容
    if(!this.state.articleTitle){
      notification.error({
        message: '请输入标题',
        description: "请为文章添加标题",
        duration: 0
      })
      return ;
    }else if(!content){
      notification.error({
        message: '请输入内容',
        description: "请为文章添加内容",
        duration: 0
      })
      return ;
    }
    Action.submitArticle({
      "sortId"   : this.state.articleTypeID,
      "sortName" : encodeURI(encodeURI(this.state.articleTypeName)),
      "title"    : encodeURI(encodeURI(this.state.articleTitle)),
      "content"  : content,
      "tags"     : encodeURI(encodeURI(this.state.articleTag))
    },this.getSubmitStatus)
  }

  //获取提交文章的状态
  getSubmitStatus=(status)=>{
    if(status.success==="1"){
      message.success('添加文章成功');
    }
    console.log(status)
  }

  storeChange=()=>{
    this.setState(getAppData())
  }

  changeTitle=(e)=>{
    this.state.articleTitle = e.target.value;
  }

  //设置文章类型
  setType=()=>{
    let {data,success} = this.state.articleTypes;
    let defaultType;
    if(success === "1"){
      let types = data.map((item,index)=>{
        //默认值
        defaultType = index==0? item.Sort_ID:defaultType;
        //默认id和name
        if(!this.state.articleTypeID){
          this.state.articleTypeID = item.Sort_ID;
          this.state.articleTypeName = item.Sort_Name;
        }
        return <Option value={item.Sort_ID}>{item.Sort_Name}</Option>
      })
      return <Select size="large" style={{width:200}} defaultValue={defaultType} onChange={this.changeType.bind(null,data)}>
        {types}
      </Select>
    }
    return <span></span>
  }

  changeType=(datas,id)=>{
    let name;
    for(let i=0,len=datas.length; i<len ; i++){
      if(datas[i].Sort_ID === id){
        name = datas[i].Sort_Name;
        break;
      }
    }
    this.state.articleTypeID = id;
    this.state.articleTypeName = name;
  }

  //设置文章标签
  setTag=()=>{
    let {data,success} = this.state.articleTags;
    let defaultType;
    if(success === "1"){
      let types = data.map((item,index)=>{
        //默认值
        defaultType = index==0? item.Sort_Name:defaultType;
        //默认id和name
        if(!this.state.articleTag){
          this.state.articleTag = item.Sort_Name;
        }
        return <Option value={item.Sort_Name}>{item.Sort_Name}</Option>
      })
      return <Select onChange={this.changeTag} multiple size="large" style={{width:797}} defaultValue={defaultType}>
        {types}
      </Select>
    }
    return <span></span>
  }

  changeTag=(value)=>{
    //console.log(value);
    this.state.articleTag = value.join(",")
  }
}

export default AddArticlePage;