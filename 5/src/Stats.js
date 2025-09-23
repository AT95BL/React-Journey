export default function Stats({items}){

  if(!items.length) return (<p className="footer"><em>Start adding some items to your packing list 📝</em></p>);

  const numOfItems = items.length;
  const numOfPacked = items.filter(item => item.packed).length;
  const percentage = numOfItems === 0 ? 0 : Math.round((numOfPacked / numOfItems) * 100);

  return <footer className='stats'>
    <em>
      {percentage === 100 ? 'You are ready to go! ✈️' : 
      `🎒You have ${numOfItems} items on your list, and you already packed ${numOfPacked} (${percentage}%)`}
    </em>
  </footer>
}
