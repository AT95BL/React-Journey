import { useState } from 'react';
import index from './index.css';

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function App(){

  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);


  function callPrevious() {
    if (step > 1) {
      setStep(() => step - 1);
    } else {
      alert("You are already at the first step.");
    }
  }

  function callNext() {
    if (step < messages.length) {
      setStep(() => step + 1);
    } else {
      alert("You have reached the last step.");
    }
  }

  return (
    <>
      <button className="close" onClick={()=>{setIsOpen((is)=> !is)}}>
        &times;
      </button>

      { isOpen &&(
        <div className="steps">
        <div className="numbers">
          <div className={`${step >= 1 ? 'active' : ''}`}>1</div>
          <div className={`${step >= 2 ? 'active' : ''}`}>2</div>
          <div className={`${step >= 3 ? 'active' : ''}`}>3</div>
        </div>

      <p className="message">Step {step}: {messages[step-1]}</p>

      <div className="buttons">
        <button style={{backgroundColor: "#7950f2", color: "#fff"}} onClick = {callPrevious}>Previous</button>
        <button style={{backgroundColor: "#7950f2", color: "#fff"}} onClick = {callNext}>Next</button>
      </div>
     </div>)
    }
    </>
  );
}

export default App;