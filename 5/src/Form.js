import React from "react";

export default function Form({onAddItems}){
  const [description, setDescription] = React.useState('');
  const [quantity, setQuantity] = React.useState(1);
  
  function handleSubmit(event) {
    event.preventDefault();
    
    if (!description) return;

    const newItem = {
      id: Date.now(),
      description: description,
      quantity: quantity,
      packed: false,
    };

    onAddItems(newItem);

    setDescription('');
    setQuantity(1);
  }

  return <form className="add-form" onSubmit={handleSubmit}>
    <h3>What do you need for your 😍 trip?</h3>
    <select value={quantity} onChange={(e)=>setQuantity(Number(e.target.value))}>
      {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
        <option key={num} value={num}>
          {num}
        </option>
      ))}
    </select>
    <input type="text" placeholder="Item..." value={description} onChange={(e)=>setDescription(e.target.value)}/>
    <button type="submit">Add</button>
  </form>
}