import styles from './EditArticlePage.css';

import React from 'react';
import _ from 'lodash';
import {Select, Input, Button, Icon, notification, message, Table, Modal, Pagination } from 'antd';

import Editor from '../../../../development/Editor/Editor';
import MessageStore from '../../../../store/Store';
import Action from '../../../../action/Action';

const Option = Select.Option;
const pageSize = 10;

function getAppData(){
  return {
    articleTypes: MessageStore.getArticleType(),
    articleTags: MessageStore.getArticleTag(),
    articleList: MessageStore.getArticleList(),
    articleInfo: MessageStore.getArticleInfo()
  }
}

class EditArticlePage extends React.Component{
  constructor(props,content){
    super(props,content);
    this.state=_.assign(getAppData(),{
      articleTypeID:"",
      articleTypeName:"",
      articleTitle:"",
      articleTag:"",
      articleContent:"",
      modalTypeID:"",
      modalTypeName:"",
      visible:false,
      count:0//文章总数
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
    let list = this.getList();
    let modalTypes = this.setType2();
    let modalInfo = this.getArticleInfo();
    let modalTitle = this.getModalTitle();
    return <div className={styles['container']}>
      <div className={styles['articleTitle']}>
        <div className={styles['type']}>
          {types}
        </div>
      </div>
      <div className={styles['list']} ref="tableList">
        {list}
        <Pagination defaultCurrent={1} showTotal={totle=>`共${totle}条`} total={this.state.count} onChange={num=>{Action.getArticleList({
        "sort" : this.state.articleTypeID,
        page : num,
        size : pageSize
      })}}/>
      </div>
      <Modal title="修改文章详细信息"
             width="840"
             style={{ top: 20 }}
             visible={this.state.visible}
             onOk={this.handleOk}
             onCancel={this.handleCancel}>
        <div className={styles['articleTitle']}>
          <div className={styles['type']}>
            {modalTypes}
          </div>
          <div className={styles['type']}>
            {modalTitle}
          </div>
        </div>
        {this.state.visible?
        <Editor
          id="editcontent"
          width="820"
          height="270"
          value={this.state.articleInfo.content}
        />:<span></span>}
        <div className={styles['flag']}>
          {tags}
        </div>
      </Modal>
    </div>
  }

  getArticleInfo=()=>{

  }

  /*弹窗的标题*/
  getModalTitle=()=>{
    if(this.state.visible){
      this.state.articleTitle = this.state.articleInfo.title
      return <Input defaultValue={this.state.articleInfo.title} onChange={this.changeTitle} placeholder="文章名称" size="large" style={{width:470}}/>
    }
    return <span></span>/*当关闭模态窗口数据清空，方便defaultvalue*/
  }

  // 弹出框确认点击
  handleOk=(index, item)=>{
    let content = UE.getEditor("editcontent").getContent();
    let {articleInfo,articleTitle,articleTag,modalTypeName,modalTypeID} = this.state;
    Action.updateArticle({
      "id"       : articleInfo.id,
      "sortId"   : modalTypeID,
      "sortName" : encodeURI(encodeURI(modalTypeName)),
      "title"    : encodeURI(encodeURI(articleTitle)),
      "content"  : content,
      "tags"     : encodeURI(encodeURI(articleTag))
    },(status)=>{
      this.handleCancel();
      if(status.success==="1"){
        Action.getArticleList({
          "sort" : this.state.articleTypeID,
          page : 1,
          size : pageSize
        })
        message.success("修改成功");
      }else{
        message.error("修改失败");
      }
    })

  }

  // 弹出框取消点击
  handleCancel=(index, item)=>{
    this.setState({
      visible:false,
      modalTypeID:"",
      modalTypeName:"",
      articleTag:""
    })
  }

  //文章列表
  getList=()=>{
    let self = this;
    if(!this.refs.tableList){
      return <div></div>
    }
    let totalWidth = this.refs.tableList.clientWidth;
    const idWidth        = totalWidth * 0.0749;
    const titleWidth     = totalWidth * 0.3465;
    const sortWidth      = totalWidth * 0.0937;
    const recomWidth     = totalWidth * 0.0937;
    const readWidth      = totalWidth * 0.0937;
    const dateWidth      = totalWidth * 0.1966;
    const operationWidth = totalWidth * 0.0656;
    let tableColumns = [
      { title: 'ID', width: idWidth, dataIndex: 'Article_ID', key: 'Article_ID' },
      { title: '名称', width: titleWidth, dataIndex: 'Article_Title', key: 'Article_Title' },
      { title: '分类', width: sortWidth, dataIndex: 'Sort_Name', key: 'Sort_Name' },
      { title: '推荐量', width: recomWidth, dataIndex: 'Recommend_Num', key: 'Recommend_Num' },
      { title: '点击量', width: readWidth, dataIndex: 'Read_Num', key: 'Read_Num' },
      { title: '时间', width: dateWidth, dataIndex: 'Article_Date', key: 'Article_Date' },
      {
        title: '操作',
        width: operationWidth,
        dataIndex: 'operation',
        key: 'operation',
        render(index, item) {
          return <a href='javascript:void(0)' onClick={self.operationClick.bind(null, index, item)}>修改</a>
        }
      }
    ];
    if(!_.isEmpty(this.state.articleList) && this.state.articleList.success==="1"){
      let {data} = this.state.articleList;
      for(let item of data){
        item.key = item.Article_ID;
      }
      return <Table pagination={false} expandedRowRender={record => <p>{record.Article_Content}</p>} columns={tableColumns} dataSource={data} scroll={{ y: 345 }} />
    }
  }

  //设置modal文章类型
  setType2=()=>{
    let {data,success} = this.state.articleTypes;
    let {sortId, sortName} = this.state.articleInfo;
    let defaultType;
    if(this.state.visible && success === "1"){
      let types = data.map((item,index)=>{
        //默认值,如果有sortId则为sortId
        defaultType = sortId? sortId:index==0? item.Sort_ID:defaultType;
        //默认id和name
        if(!this.state.modalTypeID){
          this.state.modalTypeID = sortId?sortId:item.Sort_ID;
          this.state.modalTypeName = sortName?sortName:item.Sort_Name;
        }
        return <Option value={item.Sort_ID}>{item.Sort_Name}</Option>
      })
      return <Select size="large" style={{width:200}} defaultValue={defaultType} onChange={this.changeType2.bind(null,data)}>
        {types}
      </Select>
    }
    return <span></span>
  }

  // 操作列点击
  operationClick=(index, item)=>{

    Action.getArticle({
      "selectId" : item.Article_ID
    },()=>{
      this.setState({
        visible:true
    })})
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
    }else if(!content){
      notification.error({
        message: '请输入内容',
        description: "请为文章添加内容",
        duration: 0
      })
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
          Action.getArticleCount({
            "sort" : item.Sort_ID
          },this.getArticleList)
        }
        return <Option value={item.Sort_ID}>{item.Sort_Name}</Option>
      })
      return <Select size="large" style={{width:200}} defaultValue={defaultType} onChange={this.changeType.bind(null,data)}>
        {types}
      </Select>
    }
    return <span></span>
  }

  //获取文章列表，文章数量的回掉函数
  getArticleList=(count)=>{
    if(count.success){
      this.setState({
        count:count.data
      })
      Action.getArticleList({
        "sort" : this.state.articleTypeID,
        page : 1,
        size : pageSize
      })
    }
  }

  changeType=(datas,id)=>{
    let name;
    for(let i=0,len=datas.length; i<len ; i++){
      if(datas[i].Sort_ID === id){
        name = datas[i].Sort_Name;
        break;
      }
    }
    Action.getArticleCount({
      "sort" : id
    },this.getArticleList)
    this.state.articleTypeID = id;
    this.state.articleTypeName = name;
  }

  changeType2=(datas,id)=>{
    let name;
    for(let i=0,len=datas.length; i<len ; i++){
      if(datas[i].Sort_ID === id){
        name = datas[i].Sort_Name;
        break;
      }
    }
    this.state.modalTypeID = id;
    this.state.modalTypeName = name;
  }
  
  //设置文章标签
  setTag=()=>{
    let {data,success} = this.state.articleTags;
    let {tag} = this.state.articleInfo;
    let defaultType;
    if(this.state.visible && success === "1"){
      let types = data.map((item,index)=>{
        //默认值
        defaultType = tag?tag.split(","):index==0? item.Sort_Name:defaultType;
        //默认id和name
        if(!this.state.articleTag){
          this.state.articleTag = tag || item.Sort_Name;//如果没有设置tag则使用默认值，如果默认值为空则使用该item的name
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

export default EditArticlePage;