import React,{Component} from 'react';
import { Input, Button, Divider } from 'antd';
import reqwest from 'reqwest';

class Dialog extends Component{
    constructor(props){
        super()
        this.state = {
            _url: ''
        }
    }
    handleGetArticle(){
        this.setState({ loading: true });
        reqwest({
            url: 'http://localhost:3000/getArticle',
            method: 'get',
            data: {
                url: this.state._url 
            }
        }).then(()=>{
            this.setState({ loading: false });
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
                <Input placeholder="输入文章链接" value={this.state._url} onChange={this.handleUrl.bind(this)} />
                <Button type="primary" onClick={this.handleGetArticle.bind(this)}>添加</Button>
            </div>
        )
    }
}

export default Dialog;