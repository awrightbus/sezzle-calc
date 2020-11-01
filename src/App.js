import './App.css';
import React,{useState} from 'react';
import Button from './comps/Button'
import Input from './comps/Input'
import Clear from './comps/Clear'
import Feed from './comps/Feed'


function App() {

  //state that tracks user button clicks
  const [input, setInput] = useState('');
  //state that keeps track of the previous button that was clicked
  const [previousNumber, setPreviousNumber] = useState('');

  //state that keep tracks of the operators clicked
  const [operator, setOperator] = useState('');

  //creates the state for the results that i want to be updated live
  const [resultList, setResultList] = useState([])

  //val is the information passed from the button children,
  //this function is used to add the button clicks to the input box
  const addToInput = (val) => {
    setInput(input + val)
  }

  //checks to make sure zero is not the first "input" clicked 
  //so i did this by checking the state of the input and making sure its not empty
  const addZeroToInput = val => {
      if(input !== ''){
        setInput(input + val)
      }
  }

  //add decimal function prevents more than one decimal, becamore more than one wouldnt be a number
  const addDecimal = val => {
    if(input.indexOf('.') === -1){
      setInput(input + val)
    }
  }

  //add functionality for the clear button 
  const clearInput = () => {
    setInput('');
  }

  //logic for addition operations
  // set the current input as the previous number so we can have the first value
  const add = () => {

    const prevState = input
    setPreviousNumber(prevState)
    setInput('');
    setOperator('plus')
  }

  //subtraction logic
  const subtract = () => {
    const prevState = input
    setPreviousNumber(prevState)
    setInput('');
    setOperator('minus')
  }
  //multiplication logic
  const multiply = () => {
    const prevState = input
    setPreviousNumber(prevState)
    setInput('');
    setOperator('multiply')
  }

  //division logic
  const divide = () => {
    const prevState = input
    setPreviousNumber(prevState)
    setInput('');
    setOperator('divide')
  }

  //this adds the results i get into an array that i hope to display as a live feed
  const addResult = (result) => {
    const prevState = resultList

    if(resultList.length === 10){
        resultList.splice(-1)
        setResultList([result,...prevState])
      
    }else{
      setResultList([result,...prevState])
      
    
    }
 }


  //this method handles the calculations after the operator has been determined
  const calculation = () => {
    
    const curNum = input
    
    if(operator === 'plus'){
      const value = (parseFloat(previousNumber) + parseFloat(curNum))
      setInput(value)
      return addResult(value)
      
    }if (operator === 'minus'){
      const value = (parseFloat(previousNumber) - parseFloat(curNum))
      setInput(value)
      return addResult(value)
  
      
    }if(operator ==='multiply'){
      const value = (parseFloat(previousNumber) * parseFloat(curNum))
      setInput(value)
      return addResult(value)
      
    }if(operator ==='divide'){
      const value = (parseFloat(previousNumber) / parseFloat(curNum))
      setInput(value)
      return addResult(value) 
    }
    
  }
  
 
console.log(resultList,'end of app function')
 
 
  
  return (
    <div className="app">
        <div className='calc-wrapper'>
          <div className='row'>
              {/* The input component displays its children, as the calulator result pad */}
              {/* So i pass the current state of the input to show users whats being clicked  */}
              <Input>{input}</Input>
          </div>
          <div className='row'>
              {/* Add input function just adds the val to the input state */}
              <Button handleClick={addToInput}>7</Button>
              <Button handleClick={addToInput}>8</Button>
              <Button handleClick={addToInput}>9</Button>
              <Button handleClick={divide}>/</Button>
          </div>

          <div className='row'>
              <Button handleClick={addToInput}>4</Button>
              <Button handleClick={addToInput}>5</Button>
              <Button handleClick={addToInput}>6</Button>
              <Button handleClick={multiply}>*</Button>
          </div>

          <div className='row'>
              <Button handleClick={addToInput}>1</Button>
              <Button handleClick={addToInput}>2</Button>
              <Button handleClick={addToInput}>3</Button>
              <Button handleClick={add}>+</Button>
          </div>
              <div className='row'>
              <Button handleClick={addDecimal} >.</Button>
              <Button handleClick={addZeroToInput}>0</Button>
              <Button handleClick={calculation}>=</Button>
              <Button handleClick={subtract}>-</Button>
          </div>
          <div className='row'>
               <Clear handleClear={clearInput}>Clear</Clear>
          </div>
          
        </div>
        <div>
          <Feed results={resultList}/>
        </div>
        
    </div>
  );
}

export default App;
