import "./App.css";
import React, { useState, useEffect } from "react";
import Button from "./comps/Button";
import Input from "./comps/Input";
import Clear from "./comps/Clear";
import Feed from "./comps/Feed";
import { uploadCalculations, recieveCalculations} from "./firebase";

function App() {
  //state that tracks user button clicks
  const [calcDisplay, setCalcDisplay] = useState("");
  //state that keeps track of the previous button that was clicked
  const [previousNumber, setPreviousNumber] = useState("");

  //state that keep tracks of the operators clicked
  const [operator, setOperator] = useState("");

  //creates the state for the results that i want to be updated live
  const [resultList, setResultList] = useState([]);

  //stores epxression as a string before they press =
  const [addExpression, setAddExpression] = useState("");

  //calling the recieve calculations from the firebase file, telling firebase to order new values in desc order , limit them to 10, give the random generated keys and i , then target the expression value within the object, setting the data to my result list

  useEffect(() => {
    recieveCalculations();

    const unsubscribe = recieveCalculations()
      .orderBy("created", "desc")
      .limit(10)
      .onSnapshot((snap) => {
        const data = snap.docs.map((doc) => {
          return {
            id: doc.id,
            exp: doc.data().expression,
          };
        });
        setResultList(data);
      });

    //remember to unsubscribe from your realtime listener on unmount or you will create a memory leak
    return () => unsubscribe();
  }, []);

  //val is the information passed from the button children,
  //this function is used to add the button clicks to the input box
  const addToCalcDisplay = (val) => {
    setCalcDisplay(calcDisplay + val);
    setAddExpression(addExpression + val);
  };

  //checks to make sure zero is not the first "input" clicked
  //so i did this by checking the state of the input and making sure its not empty
  const addZeroToCalcDisplay = (val) => {
    if (calcDisplay !== "") {
      setCalcDisplay(calcDisplay + val);
      setAddExpression(addExpression + val);
    }
  };

  //add decimal function prevents more than one decimal, becamore more than one wouldnt be a number
  const addDecimal = (val) => {
    if (calcDisplay.indexOf(".") === -1) {
      setCalcDisplay(calcDisplay + val);
    }
  };

  //add functionality for the clear button
  const clearCalcDisplay = () => {
    setCalcDisplay("");
  };

  //logic for addition operations
  // set the current input as the previous number so we can have the first value
  const add = (operation) => {
    const prevState = calcDisplay;
    createExpression(prevState, operation);
  };

  //subtraction logic
  const subtract = (operation) => {
    const prevState = calcDisplay;
    createExpression(prevState, operation);
  };
  //multiplication logic
  const multiply = (operation) => {
    const prevState = calcDisplay;
    createExpression(prevState, operation);
  };

  //division logic
  const divide = (operation) => {
    const prevState = calcDisplay;
    createExpression(prevState, operation);
  };

  //operation logic
  const createExpression = (prevState, operation) => {
    setPreviousNumber(prevState);
    setCalcDisplay("");
    setOperator(operation);
    setAddExpression(addExpression + operation);
  };

  //this method handles the calculations after the operator has been determined
  const calculation = () => {
    const curNum = calcDisplay;
    let value;
    if (operator === "+") {
      value = parseFloat(previousNumber) + parseFloat(curNum);
    }
    if (operator === "-") {
      value = parseFloat(previousNumber) - parseFloat(curNum);
    }
    if (operator === "*") {
      value = parseFloat(previousNumber) * parseFloat(curNum);
    }
    if (operator === "/") {
      value = parseFloat(previousNumber) / parseFloat(curNum);
    }
    setCalcDisplay(value);
    setAddExpression(addExpression);
    uploadCalculations(addExpression, value);
    setAddExpression("");
  };

  return (
    <div className="app">
      <div className="calc-wrapper">
        <div className="row">
          {/* The input component displays its children, as the calulator result pad */}
          {/* So i pass the current state of the input to show users whats being clicked  */}
          <Input>{calcDisplay}</Input>
        </div>
        <div className="row">
          {/* Add input function just adds the val to the input state */}
          <Button handleClick={addToCalcDisplay}>7</Button>
          <Button handleClick={addToCalcDisplay}>8</Button>
          <Button handleClick={addToCalcDisplay}>9</Button>
          <Button handleClick={divide}>/</Button>
        </div>

        <div className="row">
          <Button handleClick={addToCalcDisplay}>4</Button>
          <Button handleClick={addToCalcDisplay}>5</Button>
          <Button handleClick={addToCalcDisplay}>6</Button>
          <Button handleClick={multiply}>*</Button>
        </div>

        <div className="row">
          <Button handleClick={addToCalcDisplay}>1</Button>
          <Button handleClick={addToCalcDisplay}>2</Button>
          <Button handleClick={addToCalcDisplay}>3</Button>
          <Button handleClick={add}>+</Button>
        </div>
        <div className="row">
          <Button handleClick={addDecimal}>.</Button>
          <Button handleClick={addZeroToCalcDisplay}>0</Button>
          <Button handleClick={calculation}>=</Button>
          <Button handleClick={subtract}>-</Button>
        </div>
        <div className="row">
          <Clear handleClear={clearCalcDisplay}>Clear</Clear>
        </div>
      </div>
      <div>
        <Feed results={resultList} expression={addExpression} />
      </div>
    </div>
  );
}

export default App;
