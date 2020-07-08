import React, { Component } from "react";
import "./App.css";
import SleepLog from "./SleepLog";
import { addItem, getItems } from "./utils/database";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  componentDidMount() {
    this.updateItems();
  }

  displayActionSuccess(string) {
    console.log("SUCCESS", string);
  }

  displayActionFailure(string) {
    console.log("FAILURE", string);
  }

  async handleSleep() {
    let date = new Date().getTime();
    await addItem({ date: date, value: 'sleep' });
    this.updateItems();
  }

  async handleWake() {
    let date = new Date().getTime();
    await addItem({ date: date, value: 'wake' });
    this.updateItems();
  }

  async updateItems() {
    this.setState({ items: await getItems() });
  }

  render() {
    return (
      <div className="App">

        <header className="App-header">
          <h1>Sleep Log</h1>
        </header>

        <div className='buttons'>
          <button id="sleep" onClick={() => this.handleSleep()}>
            Sleep
          </button>
          <button id="wake" onClick={() => this.handleWake()}>
            Wake!
          </button>
        </div>

        <SleepLog items={this.state.items}/>

      </div>
    );
  }
}

export default App;
