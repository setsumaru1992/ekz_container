import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <table className="table">
          <tbody>
          <tr>
            <td>
              今日食べたいもの
              <div>
                <table className="table table-hover table-striped">
                  <tbody>
                  <tr>
                    <td>和食</td>
                  </tr>
                  <tr>
                    <td>洋食</td>
                  </tr>
                  <tr>
                    <td>中華</td>
                  </tr>
          </tbody>
                </table>
                <button>選び直す</button>
              </div>
            </td>
          </tr>
          <tr>
            <td></td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
