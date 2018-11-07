import React, { Component } from 'react';
import classnames from 'classnames';

class ListItem extends Component {
	constructor (props) {
		super(props);

		this.handleFinished = this.handleFinished.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	} 

	handleFinished () {
		var status = this.props.item.status;

		status = (status === 0 ? 1 : 0);

		var obj = {
			id: this.props.item.id,
			name: this.props.item.name,
			status: status
		}
		
		this.props.finishedChange(obj);	
	}

	handleDelete () {
		this.props.totalChange(this.props.item);
	}

	render () {
		const item = this.props.item;
		return (
			<li key={item.id} className={classnames({"isChecked": item.status})}>
				<span 
					onClick={this.handleFinished} 
					id={item.id}
					className={classnames("check-btn", {"isChecked": item.status})}
				></span>
				<span className="name">{ item.name }</span>
				<span onClick={this.handleDelete} className={classnames("delete-btn", {"isChecked": item.status})}>删除</span>
			</li>
		);
	}
}

export default ListItem;