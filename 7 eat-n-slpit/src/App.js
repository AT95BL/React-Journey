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

  function handleShowAddFriend(){
    setShowAddFriend((cur) => !cur);
  }

  function handleAddFriend(friend){
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  return(
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends}/>
        {showAddFriend && <FormAddFriend handleAddFriend={handleAddFriend}/>}
        <Button onClick={handleShowAddFriend}>{!showAddFriend ? "Add Friend" : "Cancel"}</Button>
      </div>

      <SplitBillForm></SplitBillForm>
    </div>
  )
}

function FriendsList({friends}) {
  return <ul>{friends.map(friend => (
    <Friend friend={friend} key={friend.id}/>
  ))}</ul>
}

function Friend({friend}){
  return <li>
    <img src={friend.image} alt={friend.name}/>
    <h3>{friend.name}</h3>
    {friend.balance < 0 && <span className="red">You owe {Math.abs(friend.balance)}$</span>}
    {friend.balance > 0 && <span className="green">{friend.name} owes you {friend.balance}$</span>}
    {friend.balance === 0 && <span>You and {friend.name} are even</span>}

    <Button>Select</Button>
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
      image: `${image}?=${id}`,
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

function SplitBillForm(){
  return <form className="form-split-bill">
    <h2>Split a bill with Clark</h2>

    <label>💰 Bill value</label>
    <input type="text" value="100"/>

    <label>🙍‍♂️ Your expense</label>
    <input type="text" value="40"/>

    <label>🧑‍🤝‍🧑 Clark's expense</label>
    <input type="text" value="60" disabled/>

    <label>💵 Who is paying the bill</label>
    <select>
      <option value="you">You</option>
      <option value="friend">Clark</option>
    </select>

    <button className="button">Split bill</button>
  </form>
}