import React from 'react'
import ReactDOM from 'react-dom'
import Table from './Table';

class App extends React.Component {
    render() {
        return (
            <div className="wrapper">
                < Table / >
            </div>
        )
    }
}

ReactDOM.render(
    <App name="Ykit-Starter-Antd"/>, document.getElementById('app')
);

// hot-reload
if (module.hot) {
    module.hot.accept();
}