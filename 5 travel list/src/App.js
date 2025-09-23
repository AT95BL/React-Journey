import React from 'react';
import './index.css';
import Logo from './Logo';
import Form from './Form';
import PackingList from './PackingList.js';
import Stats from './Stats';

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 1, packed: false },
  { id: 4, description: "Camera", quantity: 1, packed: false },
  { id: 5, description: "Snacks", quantity: 3, packed: false },
];

export default function App() {

  const [items, setItems] = React.useState([]);

  function handleDeleteItem(id){
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleItems(item){
    setItems((items) => [...items, item]);
    // setNumOfItems(numOfItems + 1);
  }

  function handleToggle(id){
    setItems(items => items.map(item => item.id === id ? {...item, packed: !item.packed} : item));
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggle} setItems={setItems} />
      <Stats items={items}/>
    </div>
  );
}

