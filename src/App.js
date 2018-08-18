import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formula: [],
      currentValue: "",
      regex: /^(0)/,
      display: ""
    };
    this.clearAll = this.clearAll.bind(this);
    this.solveEquation = this.solveEquation.bind(this);
    this.addNumber = this.addNumber.bind(this);
    this.decimal = this.decimal.bind(this);
    this.operator = this.operator.bind(this);
  }
  clearAll() {
    this.setState(() => ({
      currentValue: "",
      formula: [],
      display: ""
    }));
  }
  solveEquation() {
    let newState = { ...this.state };
    newState.formula.push(newState.currentValue);
    // eslint-disable-next-line
    newState.currentValue = eval(newState.formula.join("")).toString();
    newState.display = newState.currentValue;
    newState.formula = [];
    this.setState(() => newState);
  }
  addNumber(event) {
    let newState = { ...this.state };
    if (
      this.state.currentValue[0] === "0" &&
      this.state.currentValue[1] !== "."
    ) {
      newState.currentValue.split("").shift();
      newState.currentValue += event.target.value;
      newState.display = newState.formula.join("") + newState.currentValue;
    } else {
      newState.currentValue += event.target.value;
      newState.display = newState.formula.join("") + newState.currentValue;
    }
    this.setState(() => newState);
  }
  decimal() {
    let newState = { ...this.state };
    if (this.state.currentValue.match(/(\.)/) === null) {
      newState.currentValue += ".";
    }
    newState.display = newState.formula.join("") + newState.currentValue;
    this.setState(() => newState);
  }
  operator(event) {
    let newState = { ...this.state };
    if (this.state.currentValue !== "") {
      newState.formula.push(newState.currentValue);
      newState.formula.push(event.target.value);
    } else {
      newState.formula.pop();
      newState.formula.push(event.target.value);
    }
    // join the formula to pass it onto the input and clear the current value
    newState.display = newState.formula.join("");
    newState.currentValue = "";
    this.setState(() => newState);
  }
  render() {
    return (
      <div id="calculator">
        <output id="display">{this.state.display}</output>
        <button id="equals" onClick={this.solveEquation}>
          =
        </button>
        <button id="zero" onClick={this.addNumber} value={0}>
          0
        </button>
        <button id="one" onClick={this.addNumber} value={1}>
          1
        </button>
        <button id="two" onClick={this.addNumber} value={2}>
          2
        </button>
        <button id="three" onClick={this.addNumber} value={3}>
          3
        </button>
        <button id="four" onClick={this.addNumber} value={4}>
          4
        </button>
        <button id="five" onClick={this.addNumber} value={5}>
          5
        </button>
        <button id="six" onClick={this.addNumber} value={6}>
          6
        </button>
        <button id="seven" onClick={this.addNumber} value={7}>
          7
        </button>
        <button id="eight" onClick={this.addNumber} value={8}>
          8
        </button>
        <button id="nine" onClick={this.addNumber} value={9}>
          9
        </button>
        <button id="add" onClick={this.operator} value={"+"}>
          +
        </button>
        <button id="subtract" onClick={this.operator} value={"-"}>
          -
        </button>
        <button id="multiply" onClick={this.operator} value={"*"}>
          *
        </button>
        <button id="divide" onClick={this.operator} value={"/"}>
          /
        </button>
        <button id="decimal" onClick={this.decimal}>
          .
        </button>
        <button id="clear" onClick={this.clearAll}>
          C
        </button>
      </div>
    );
  }
}

export default App;
