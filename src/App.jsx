import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [items, setItem] = useState([]);
  
  useEffect(()=>{
    const items = JSON.parse(localStorage.getItem('items'));
    if(items){
      setItem(items);
      setTasks(items);
    } else {
      setItem([]);
      setTasks([]);
    }
  },[])

  useEffect(() => {
    if (items) {localStorage.setItem('items', JSON.stringify(items))}
  }, [items])

 
  

  // useEffect(() => {
  //   localStorage.setItem('items', JSON.stringify(items));
  // }, [items])

  function handleClick(e){
   e.preventDefault();
   if(task !== ""){
   setTasks([...tasks,task]);
   setTask("");
   setItem([...items,task])
  }
  };

  function Clear(){
    setTasks([]);
  };

  function Completed(index){
  }

  function handleDelete(index){
   const removed = [...tasks];
   removed.splice(index, 1);
   setTasks(removed);
   setItem(removed)
  }

  return (
    <div className='relative h-[95%]'>
      <div className='absolute top-20 -right-10 -rotate-90 opacity-10'>Made with &hearts; by IshadP</div>
      <button onClick={Clear} className='absolute left-[92%] bottom-0  bg-red-600 p-4 rounded-xl text-white font-black z-10 hover:-translate-x-1 hover:-translate-y-1'>CLEAR</button>
      <button onClick={Clear} className='absolute left-[92%] bottom-0  bg-black p-4 rounded-xl text-black font-black z-0'>CLEAR</button>
      <div className='h-20 flex items-center justify-center m-10 mb-20'>
        <p className='text-purple-800 font-Unione text-8xl'>TO-DO LIST</p>
      </div>
      <div>
      <div className='flex items-center justify-center m-5'>
       <form>
        <input type='text' value={task} onChange={(e)=> setTask(e.target.value)} className='border-t-2 border-b-2 border-l-2 border-gray-500 rounded-l-xl text-4xl p-5 '/>
        <button type="submit" onClick={handleClick} className='border-2 border-gray-500 rounded-r-xl text-4xl p-5 text-gray-700 '>+</button>
       </form>
       </div>
        <div className='flex flex-col items-center justify-center'>
          <p className='bg-green-500 text-white p-5 rounded-xl font-black m-4'>Ongoing</p>
          {
           tasks.map((task, index) => (
            <div key={index} className='w-[50%] flex justify-between text-xl border-2 rounded-2xl p-4 m-2 relative ' >
            <p className='w-[85%] overflow-hidden flex items-center text-3xl font-Jockone'>{task}</p>
            <input type="checkbox" onChange={Completed}  className='absolute self-center left-[85%] w-[4vh] h-[4vh] appearance-none '/>
            <button onClick={()=> handleDelete(index)}><img src="/src/assets/dustbin.svg" className='w-[5vh] opacity-70' /></button>
            </div>
          ))}
           
        </div>
       </div>
    </div>
  )
}

export default App
