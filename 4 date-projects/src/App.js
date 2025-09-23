import './App.css';
import React from 'react';

function App() {

  const [step, setStep] = React.useState(1);
  const [count, setCount] = React.useState(0);

  // Funkcija za korak naprijed (povećava step)
  function stepForward() {
    setStep(prevStep => prevStep + 1);
  }

  // Funkcija za korak unazad (smanjuje step, ali ne ispod 1)
  function stepBackward() {
    // Tvoja originalna, sigurnija varijanta:
    setStep(prevStep => (prevStep > 1 ? prevStep - 1 : 1)); 
  }

  // Funkcija za povećanje brojača
  function incrementCount() {
    setCount(prevCount => prevCount + step);
  }

  // Funkcija za smanjenje brojača
  // Sada omogućava da count ide u negativne vrijednosti
  function decrementCount() {
    // Uklanjamo provjeru prevCount - step >= 0
    // Brojač će sada moći da ide u minus
    setCount(prevCount => prevCount - step);
  }

  // LOGIKA ZA RAČUNANJE DATUMA
  const today = new Date(); // Trenutni datum
  const futureOrPastDate = new Date(today); // Kreiramo kopiju današnjeg datuma
  futureOrPastDate.setDate(today.getDate() + count); // Dodajemo/oduzimamo dane na osnovu count varijable

  // LOGIKA ZA PORUKU (prilagođavanje teksta za prošlost, sadašnjost i budućnost)
  let dateMessage;
  if (count === 0) {
    // Ako je count 0, prikazujemo "Danas je..."
    dateMessage = `Today is ${futureOrPastDate.toDateString()}`;
  } else if (count > 0) {
    // Ako je count pozitivan, prikazujemo "X dana od danas je..."
    const daysText = count === 1 ? 'day' : 'days';
    dateMessage = `${count} ${daysText} from today is ${futureOrPastDate.toDateString()}`;
  } else { // count < 0
    // Ako je count negativan, prikazujemo "X dana prije danas je bilo..."
    const absCount = Math.abs(count); // Koristimo apsolutnu vrijednost za prikaz broja dana
    const daysText = absCount === 1 ? 'day' : 'days';
    dateMessage = `${absCount} ${daysText} ago was ${futureOrPastDate.toDateString()}`;
  }

  return (
    <div className="App">
      {/* Kontrole za Step */}
      <button onClick={stepBackward} disabled={step === 1}>-</button>
      <span>Step: {step}</span>
      <button onClick={stepForward}>+</button>

      {/* Kontrole za Count */}
      {/* Dugme za smanjenje brojača sada nije disabled kada je count 0, jer može ići u minus */}
      <button onClick={decrementCount}>-</button> 
      <span>Count: {count}</span>
      <button onClick={incrementCount}>+</button>

      {/* PRIKAZ TEKSTA DATUMA NA STRANICI */}
      <p>{dateMessage}</p>
      
      {<div>
        <button onClick={() => { setStep(1); setCount(0); }}>Reset</button>
      </div>}
    </div>
  );
}

export default App;
