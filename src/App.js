import React, { Component } from "react";
import "./App.css";
import TodoContentParent from "./TodoContent/TodoContentParent";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <TodoContentParent />
        </div>
      </div>
    );
  }
}

export default App;
