import React, { Component } from 'react';
import './App.css';
import Panel from 'src/component/panel/Panel'
import Node from 'src/component/component/Node'
import { connect } from 'react-redux'

class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<header className="App-header">*/}
          {/*<Node />*/}
          {/*<h1 className="App-title">Welcome to React</h1>*/}
        {/*</header>*/}
        {/*<p className="App-intro">*/}
          {/*To get started, edit <code>src/App.js</code> and save to reload.*/}
        {/*</p>*/}
          <Panel />
      </div>
    );
  }
}
const mapStateToProps = (state) => (state)

export default connect(
    mapStateToProps
)(App)
