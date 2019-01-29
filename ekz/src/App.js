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
              <button>開く</button>
              <div>
                <table className="table table-hover table-striped">
                  <tbody>
                  <tr>
                    <td>和食&emsp;&emsp;
                      <span>Good</span>&emsp;
                      <span>Bad</span>&emsp;
                      <button>編集</button>&emsp;
                      <button>削除</button>
                    </td>
                  </tr>
                  <tr>
                    <td>洋食&emsp;&emsp;
                      <span>Good</span>&emsp;
                      <span>Bad</span>&emsp;
                      <button>編集</button>&emsp;
                      <button>削除</button></td>
                  </tr>
                  <tr>
                    <td>中華&emsp;&emsp;
                      <span>Good</span>&emsp;
                      <span>Bad</span>&emsp;
                      <button>編集</button>&emsp;
                      <button>削除</button></td>
                  </tr>
          </tbody>
                </table>
                <button>選び直す</button>
                <button>追加</button>
                <br/>&emsp;
                <div>
                  <form action="">
                    名前&emsp;<input type="text" name="" id=""/><br/>
                    リンク<input type="text" name="" id=""/><br/>
                    <button>追加</button>
                  </form>
                </div>
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
