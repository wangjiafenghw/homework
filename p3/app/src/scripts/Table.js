import React from 'react';
import { Table } from 'antd';
import reqwest from 'reqwest';

const columns = [{
  title: '标题',
  dataIndex: 'TITLE',
},{
  title: '总字数',
  dataIndex: 'NUM_TOTAL',
},{
  title: '中文字数',
  dataIndex: 'NUM_ZH',
},{
  title: '英文字数',
  dataIndex: 'NUM_EN',
},{
  title: '标点符号数',
  dataIndex: 'NUM_PUN',
}];

class TableView extends React.Component {
  state = {
    data: [],
    pagination: {pageSize:5},
    loading: false,
  };

  handleTableChange = (pagination, filters) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      len: pagination.pageSize,
      begin: (pagination.current - 1) * pagination.pageSize,
      ...filters,
    });
  }

  fetch = (params = {}) => {
    this.setState({ loading: true });
    reqwest({
      url: './getDataPagination',
      method: 'get',
      data: {
        len: 5,
        begin: 0,
        ...params,
      }
    }).then((data) => {
      const pagination = { ...this.state.pagination };
      // Read total count from server
      // pagination.total = data.totalCount;
      console.log(data.data)
      pagination.total = data.data[0].total;
      this.setState({
        loading: false,
        data: data.data,
        pagination,
      });
      console.log('data->', data)
    });
  }

  componentDidMount() {
    this.fetch();
  }

  render() {
    return (
      <Table
        className="table"
        columns={columns}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
    );
  }
}

export default TableView;