import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

/*
function PizzaFocaccia(){
  return (
    <div className="pizza">
      <h3>{pizzaData[0].name}</h3>
      <p>{pizzaData[0].ingredients}</p>
      <p>{pizzaData[0].price}</p>
      <img src = {pizzaData[0].photoName} alt="Pizza Focaccia" />
      <p>{pizzaData[0].soldOut}</p>
    </div>
  );
}

function PizzaMargherita(){
  return (
    <div className ="pizza">
      <h3>{pizzaData[1].name}</h3>
      <p>{pizzaData[1].ingredients}</p>
      <p>{pizzaData[1].price}</p>
      <img src={pizzaData[1].photoName} alt="Pizza Margherita" />
      <p>{pizzaData[1].soldOut}</p>
    </div>
  );
}

function PizzaSpinaci(){
  return (
    <div className ="pizza">
      <h3>{pizzaData[2].name}</h3>
      <p>{pizzaData[2].ingredients}</p>
      <p>{pizzaData[2].price}</p>
      <img src={pizzaData[2].photoName} alt="Pizza Spinaci" />
      <p>{pizzaData[2].soldOut}</p>
    </div>
  );
}

function PizzaFunghi(){
  return (
    <div className ="pizza">
      <h3>{pizzaData[3].name}</h3>
      <p>{pizzaData[3].ingredients}</p>
      <p>{pizzaData[3].price}</p>
      <img src={pizzaData[3].photoName} alt="Pizza Funghi" />
      <p>{pizzaData[3].soldOut}</p>
    </div>
  );
}

function PizzaSalamino(){
  return (
    <div className ="pizza">
      <h3>{pizzaData[4].name}</h3>
      <p>{pizzaData[4].ingredients}</p>
      <p>{pizzaData[4].price}</p>
      <img src={pizzaData[4].photoName} alt="Pizza Salamino" />
      <p>{pizzaData[4].soldOut}</p>
    </div>
  );
}

function PizzaProsciutto(){
  return (
    <div className ="pizza">
      <h3>{pizzaData[5].name}</h3>
      <p>{pizzaData[5].ingredients}</p>
      <p>{pizzaData[5].price}</p>
      <img src={pizzaData[5].photoName} alt="Pizza prosciutto" />
      <p>{pizzaData[5].soldOut}</p>
    </div>
  );
}
*/

function Header(){
  /*
  const headerStyle = {
    backgroundColor: "black",
    color: "red",
    padding: "20px",
    textAlign: "center",
    fontSize: "48px",
    textTransform: "uppercase"
  };
  */
  return (
    <header className ="header">
      <h1 /*style={headerStyle}*/>Pizza Restaurant</h1>
      {/* <p>Welcome to our pizza restaurant!</p> */}
    </header>
  );
}

function Footer(){
  const hours = new Date().getHours();

  const openHours = 12; // 12 PM
  const closeHours = 22; // 10 PM

  const isOpen = hours >= openHours && hours < closeHours;

  return (
    <footer className="footer">
      <div className='order'>
        {isOpen ? <Order closeHours={closeHours} openHours={openHours}/> :
          <p>
            We're closed now. Come back tomorrow from {openHours}:00 to {closeHours}:00.
          </p>
        }
    </div>
    </footer>
  );
}

function Order({closeHours, openHours}){
  return (
    <div className='order'>
      <p>
        We're open form {openHours}:00 until {closeHours}:00. Come visit us or order online!
      </p>
      <button className='btn'>Order</button>
    </div>
  );
}

function Pizza({pizzaObject}) {

  // if(pizzaObject.soldOut){ return null; }

  return (
    <li className={`pizza ${pizzaObject.soldOut ? 'sold-out' : ''}`}>
      <img src={pizzaObject.photoName} alt={pizzaObject.name} />
      <div>
        <h3>{pizzaObject.name}</h3>
        <p>{pizzaObject.ingredients}</p>
        <span>{pizzaObject.soldOut ? 'SOLD OUT' : pizzaObject.price}</span>
        
      </div>
    </li>
  );
}

function Menu(){
  const pizzas = pizzaData;

  return (
    <main className="menu">
      <h2>OUR MENU</h2>

      {pizzas.length > 0 ? (
        <React.Fragment> 
          <p>Check out our delicious pizzas!</p> <ul className='pizzas'>
          {pizzas.map((pizza)=>(<Pizza pizzaObject={pizza} key={pizza.name}/>))}
          </ul> 
        </React.Fragment>) : <p>We're still working on our menu..please come back later..</p>
      }

      {/*
      <div>
        {pizzaData.map(pizza => <Pizza 
        name={pizza.name} 
        ingredients={pizza.ingredients}
        price={pizza.price}
        photoName={pizza.photoName}
        soldOut={pizza.soldOut}/>)}
      </div> 
      */}

      {/*
        <Pizza 
        name={pizzaData[0].name}
        ingredients={pizzaData[0].ingredients}
        price={pizzaData[0].price}
        photoName={pizzaData[0].photoName}
        soldOut={pizzaData[0].soldOut}
      />

      <Pizza 
        name={pizzaData[1].name}
        ingredients={pizzaData[1].ingredients}
        price={pizzaData[1].price}
        photoName={pizzaData[1].photoName}
        soldOut={pizzaData[1].soldOut}
      />

      <Pizza
        name={pizzaData[2].name}
        ingredients={pizzaData[2].ingredients}
        price={pizzaData[2].price}
        photoName={pizzaData[2].photoName}
        soldOut={pizzaData[2].soldOut}
      />

      <Pizza 
        name={pizzaData[3].name}
        ingredients={pizzaData[3].ingredients}
        price={pizzaData[3].price}
        photoName={pizzaData[3].photoName}
        soldOut={pizzaData[3].soldOut}
      />

      <Pizza 
        name={pizzaData[4].name}
        ingredients={pizzaData[4].ingredients}
        price={pizzaData[4].price}
        photoName={pizzaData[4].photoName}
        soldOut={pizzaData[4].soldOut}
      />

      <Pizza 
        name={pizzaData[5].name}
        ingredients={pizzaData[5].ingredients}
        price={pizzaData[5].price}
        photoName={pizzaData[5].photoName}
        soldOut={pizzaData[5].soldOut}
      />*/}

    </main>
  );
}

function App(){
  return (
    <div className ="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

// React v18+ uses createRoot for rendering
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
  <App />
</React.StrictMode>
);