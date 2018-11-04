import React, { Component } from 'react';
import './App.css';
import './style.css'
import { Table } from './components';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Title</h1>
        <Table className="main-table">
        <colgroup>
          <col width="50" />
          <col width="" />
        </colgroup>
        <tbody>
          <tr>
            <td>
              <label>
                <input type="checkbox" />
              </label>
            </td>
            <td>
              吃饭
            </td>
            
          </tr>
        
        </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
