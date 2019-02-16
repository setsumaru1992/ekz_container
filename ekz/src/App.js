import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import ThemeShow from '~/views/pages/themes/show'

class App extends Component {
  render() {
    // return (
    //   <Router>
    //     <ul>
    //       <li>
    //         <Link to="/">Home</Link>
    //       </li>
    //       <li>
    //         <Link to="/about">About</Link>
    //       </li>
    //       <li>
    //         <Link to="/topics">Topics</Link>
    //       </li>
    //
    //       <hr />
    //
    //       {/*<Route exact path="/" component={<ThemeShow/>} />*/}
    //       <Route path="/about" component={About} />
    //       <Route path="/topics" component={Topics} />
    //     </ul>
    //   </Router>
    // );
    return (

      <ThemeShow/>
    )
  }
}
const Topics = () => (
  <div>
    <h2>Topics</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

export default App;
