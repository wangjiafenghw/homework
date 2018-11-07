import React,{Component} from 'react';
import { Input, Button, Divider } from 'antd';

class Dialog extends Component{
    constructor(props){
        super()
    }

    render(){
        return(
            <div className="dialog">
                <Input placeholder="输入文章链接" />
                <Button type="primary">Primary</Button>
            </div>
        )
    }
}

export default Dialog;