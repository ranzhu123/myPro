import styles from './Header.css';

import React from 'react';
import {Select,Button,Input,Icon } from 'antd';
import classnames from 'classnames';
import _ from 'lodash';

import Contants from '../../constant/Contants';
import Action from '../../action/Action';
import Store from '../../store/Store';

const Option = Select.Option;
let timeout;
let currentValue;

const searchDatas = ["新增文章","编辑文章","删除文章",
  "新增笔记","编辑笔记","删除笔记",
  "新增图书","编辑图书","删除图书",
  "编辑评论","删除评论",
  "新增外链","编辑外链","删除外链",
  "新增分类","编辑分类","删除分类",
  "文章推荐量","笔记推荐量","图书推荐量",
  "新增用户","编辑用户","删除用户"]

class Header extends React.Component{
  constructor(props,content){
    super(props,content);
  }

  render(){
    return <div className={styles['header']}>
            <SearchInput placeholder="快速菜单入口" style={{ width: 200 }} />
            <div className={styles['name']}><span><a href="http://www.cnblogs.com/web-Timer/" target="_blank"><Icon type="phone"/>SuperTimer</a></span></div>
         </div >
  }
}

class SearchInput extends React.Component{

  constructor(props,content){
    super(props,content);
    this.state={
      data: [],
      value: '',
      focus: false,
    }

    this.render = this.render.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFocusBlur = this.handleFocusBlur.bind(this);
  }

  handleChange(value) {
    this.setState({ value });
    let data = [];
    searchDatas.map((dataItem)=>{
      if(dataItem.indexOf(value)>-1){
        data.push({value:dataItem,text:dataItem});
      }
    })
    this.setState({ data });
    //fetch(value, (data) => this.setState({ data }));
  }

  handleSubmit() {
    console.log('输入框内容是: ', this.state.value);
  }

  handleFocusBlur(e) {
    this.setState({
      focus: e.target === document.activeElement,
    });
  }

  searchData=(e)=>{
    searchDatas
  }

  render() {
    const btnCls = classnames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!this.state.value.trim(),
    });
    const searchCls = classnames({
      'ant-search-input': true,
      'ant-search-input-focus': this.state.focus,
    });
    const options = this.state.data.map(d => <Option key={d.value}>{d.text}</Option>);
    return (
      <div className="ant-search-input-wrapper" style={this.props.style}>
        <Input.Group className={searchCls}>
          <Select
            combobox
            value={this.state.value}
            placeholder={this.props.placeholder}
            notFoundContent=""
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onChange={this.handleChange}
            onFocus={this.handleFocusBlur}
            onBlur={this.handleFocusBlur}
          >
            {options}
          </Select>
          <div className="ant-input-group-wrap">
            <Button className={btnCls} onClick={this.handleSubmit}>
              <Icon type="search" />
            </Button>
          </div>
        </Input.Group>
      </div>
    );
  }
};



function fetch(value, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  function fake() {
    const str = querystring.encode({
      code: 'utf-8',
      q: value,
    });
    jsonp(`http://suggest.taobao.com/sug?${str}`, (err, d) => {
      if (currentValue === value) {
        const result = d.result;
        const data = [];
        result.forEach((r) => {
          data.push({
            value: r[0],
            text: r[0],
          });
        });
        callback(data);
      }
    });
  }

  timeout = setTimeout(fake, 300);
}

export default Header;