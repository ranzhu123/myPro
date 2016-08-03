import styles from './DelArticlePage.css';

import React from 'react';
import _ from 'lodash';
import {Select, Input, Button, Icon, notification, message, Table, Modal, Pagination, Popconfirm} from 'antd';

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

class DelArticlePage extends React.Component{
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
    let list = this.getList();
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
    </div>
  }

  getArticleInfo=()=>{

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
          return (
            <Popconfirm
              title="确定要删除当前文章吗？"
              placement="topRight"
              onConfirm={self.operationClick.bind(null, index, item)}>

              <a href='javascript:void(0)'>删除</a>
            </Popconfirm>
          );
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

  // 操作列点击
  operationClick=(index, item)=>{
    Action.delArticle({
      "selectId" : item.Article_ID
    },(status)=>{
      if(status.success == "1"){
        message.success("删除成功")
      }else{
        message.error("删除失败")
      }
    })
  }

  storeChange=()=>{
    this.setState(getAppData())
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
}

export default DelArticlePage;