import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({children, onClick}){
  return <button className="button" onClick={onClick}>{children}</button>
}

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend(){
    setShowAddFriend((cur) => !cur);
    setSelectedFriend(null); 
  }

  function handleAddFriend(friend){
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handeSelection(friend){
    setSelectedFriend((cur) => cur?.id === friend.id ? null : friend);
    setShowAddFriend(false); // Close the Add Friend form if a friend is selected/deselected
  }

  function handleSplitBill(value){
    setFriends((friends) => 
      friends.map((friend) => 
        friend.id === selectedFriend.id ? {...friend, balance: friend.balance + value} : friend));
    setSelectedFriend(null); // Deselect friend after splitting the bill
  }

  return(
    <div className="app">
      <div className="sidebar">
        <FriendsList 
          friends={friends} 
          handleSelection={handeSelection} 
          selectedFriend={selectedFriend}
        />

        {showAddFriend && <FormAddFriend handleAddFriend={handleAddFriend}/>}

        <Button onClick={handleShowAddFriend}>{!showAddFriend ? "Add Friend" : "Cancel"}</Button>
      </div>

      {selectedFriend && <SplitBillForm selectedFriend={selectedFriend} handleSplitBill={handleSplitBill}/>}
    </div>
  )
}

function FriendsList({friends, selectedFriend, handleSelection }){
  return <ul>{friends.map(friend => (
    <Friend 
      friend={friend} 
      selected={selectedFriend?.id === friend.id} 
      key={friend.id} 
      handleSelection={handleSelection}
    />
  ))}</ul>
}

function Friend({friend, handleSelection, selected}){
  const isSelected = selected; 

  return <li className={isSelected ? "selected" : ""}>
    <img src={friend.image} alt={friend.name}/>
    <h3>{friend.name}</h3>
    {friend.balance < 0 && <span className="red">{friend.name} owes you {Math.abs(friend.balance)}$</span>}
    {friend.balance > 0 && <span className="green">You owe {friend.name} {friend.balance}$</span>}
    {friend.balance === 0 && <span>You and {friend.name} are even</span>}

    {/* Using the boolean 'isSelected' to toggle the button text */}
    <Button onClick={()=>handleSelection(friend)}>{ isSelected ? 'Close' : "Select" }</Button> 
  </li>
}

function FormAddFriend({handleAddFriend}){
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48?");

  function handleSubmit(e){
    e.preventDefault();

    if(!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `https://i.pravatar.cc/48?u=${id}`,
      balance: 0
    }

    handleAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48?");  
  }

  return <form className="form-add-friend" onSubmit={handleSubmit}>
    <label>👫 Friend name</label>
    <input 
      type="text" 
      value={name} 
      onChange={(e)=>setName(e.target.value)}
    />

    <label>🌄 Image URL</label>
    <input 
      type="text" 
      value={image} 
      onChange={(e)=>setImage(e.target.value)}
    />

    <Button>Add</Button>
  </form>
}

function SplitBillForm({selectedFriend, handleSplitBill}){
  const [bill, setBill] = useState("");
  const [yourExpense, setYourExpense] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("you");
  
  // Calculate friend's expense dynamically
  const friendExpense = bill ? bill - yourExpense : "";
  
  function handleSubmit(e) {
      e.preventDefault();

      if (!bill || !yourExpense) return;
      
      let finalBalance;
      
      // 1. Calculate the final value to update the balance
      if (whoIsPaying === "user") {
          // You paid the bill, so friend owes you yourExpense minus their share (friendExpense)
          // Since the balance state is from the friend's perspective, 
          // a positive value means they owe you.
          finalBalance = friendExpense; 
      } else {
          // Friend paid the bill, so you owe the friend your expense
          // Since the balance state is from the friend's perspective,
          // a negative value means you owe them.
          finalBalance = -yourExpense;
      }

      // 2. Call the handler function from the parent (App)
      handleSplitBill(finalBalance);
    }

  return <form className="form-split-bill" onSubmit={handleSubmit}>
    <h2>Split a bill with {selectedFriend.name}</h2>

    <label>💰 Bill value</label>
    <input 
      type="text" 
      value={bill}
      onChange={(e) => setBill(Number(e.target.value))}
    />

    <label>🙍‍♂️ Your expense</label>
    <input 
      type="text" 
      value={yourExpense}
      onChange={(e) => setYourExpense(Number(e.target.value) > bill ? yourExpense : Number(e.target.value))}
    />

    <label>🧑‍🤝‍🧑 {selectedFriend.name}'s expense</label>
    <input 
      type="text" 
      value={friendExpense} 
      disabled
    />

    <label>💵 Who is paying the bill</label>
    <select
      value={whoIsPaying}
      onChange={(e) => setWhoIsPaying(e.target.value)}
    >
      <option value="user">You</option>
      <option value="friend">{selectedFriend.name}</option>
    </select>

    <button className="button">Split bill</button>
  </form>
}