import React,{Component} from 'react';
import { Input, Button, Divider } from 'antd';
import reqwest from 'reqwest';

class Dialog extends Component{
    constructor(props){
        super()
        this.state = {
            _url: '',
            loading: false,
            disabled: false
        }
    }
    handleGetArticle() {
        this.fetch({
            url: this.state._url
        })
    }
    fetch = (params = {}) => {
        this.setState({ 
            loading: true, 
            disabled: true
        });
        reqwest({
            url: '/getArticle',
            method: 'get',
            data: {
                ...params
            }
        }).then(() => {
            this.setState({ 
                loading: false,
                disabled: false 
            });
        })
    }

    handleUrl(e){
        let value = e.target.value;
        this.setState({
            _url: value,
        });
    }
    render(){
        return(
            <div className="dialog">
                <Input placeholder="输入文章链接" disabled={this.state.disabled} value={this.state._url} onChange={this.handleUrl.bind(this)} />
                <Button type="primary" loading={this.state.loading} onClick={this.handleGetArticle.bind(this)}>添加</Button>
            </div>
        )
    }
}

export default Dialog;