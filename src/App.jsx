import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [items, setItem] = useState([]);
  const [theme, setTheme] = useState(false);
  
  useEffect(()=>{
    const items = JSON.parse(localStorage.getItem('items'));
    const theme = localStorage.getItem('theme');
    if(items){
      setItem(items);
      setTasks(items);
    } else {
      setItem([]);
      setTasks([]);
    }
    setTheme(theme);
  },[])

  useEffect(() => {
    if (items) {localStorage.setItem('items', JSON.stringify(items))}
  }, [items])

  useEffect(() => {
  localStorage.setItem('theme', theme );
  }, [theme])
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
    setItem([]);
  };

  function Completed(index){
  }

  function handleDelete(index){
   const removed = [...tasks];
   removed.splice(index, 1);
   setTasks(removed);
   setItem(removed)
  }
   if(theme){
    document.body.style = "background: #262626; transition-duration: 1s";
   } else {
    document.body.style = "background: white; transition-duration: 1s";
   }
  function handleTheme(){
    setTheme(!theme);
  }

  return (
    <div className= 'relative h-[95%] duration-500'>
      <div className='absolute top-20 hidden -right-10 -rotate-90 opacity-10 z-30 sm:visible '>Made with &hearts; by IshadP</div>
      <button onClick={Clear} className= { theme ? 'left-[2vw] bottom-4  bg-red-600 p-4 rounded-xl text-black font-black z-20 hover:-translate-x- hover:-translate-y-0 sm:left-[92%] sm:hover:-translate-y-1 sm:hover:-translate-x-1  md:left-10 fixed duration-500' : 'left-[2vw] bottom-4  bg-red-600 p-4 rounded-xl text-white font-black z-20 hover:-translate-x- hover:-translate-y-0 sm:left-[92%] sm:hover:-translate-y-1 sm:hover:-translate-x-1  md:left-10 fixed duration-500'}>CLEAR</button>
      <button onClick={Clear} className={ theme ? 'left-[2%] bottom-4  bg-white p-4 rounded-xl text-white font-black z-10 sm:left-[92%] fixed md:left-10' : 'left-[2%] bottom-4  bg-black p-4 rounded-xl text-black font-black z-10 sm:left-[92%] fixed md:left-10'}>CLEAR</button>
      <button onClick={handleTheme} className={ theme ? 'fixed left-[90%] underline text-white w-[10rem]' : 'fixed left-[90%] underline text-black w-[10rem]'}>{theme ? "I want light theme" : "I want dark theme"}</button>
      <div className='h-20 flex items-center justify-center m-10 mb-20 '>
        <p className='text-purple-800 font-Unione text-5xl sm:text-8xl'>TO-DO LIST</p>

      </div>
      <div>
      <div className='flex flex-nowrap items-center justify-center m-0 sm:m-5'>
       <form>
        <input type='text' value={task} onChange={(e)=> setTask(e.target.value)} className={ theme ? 'w-[50vw] border-t-2 border-b-2 border-l-2 border-gray-500 rounded-l-xl text-4xl p-1 sm:p-5 sm:w-100 text-white bg-transparent focus:outline-none duration-1000' : 'w-[50vw] border-t-2 border-b-2 border-l-2 border-gray-500 rounded-l-xl text-4xl p-1 sm:p-5 sm:w-100 focus:outline-none duration-1000'}/>
        <button type="submit" onClick={handleClick} className={ theme ? 'border-2 border-gray-500 rounded-r-xl text-4xl p-1 px-4 bg-transparent text-white sm:p-5 duration-1000' : 'border-2 border-gray-500 rounded-r-xl text-4xl p-1 px-4 bg-white  text-gray-700 sm:p-5 duration-1000'}>+</button>
       </form>
       </div>
        <div className='flex flex-col items-center justify-center'>
          <p className='bg-green-500 text-white p-5 rounded-xl font-black m-4'>Ongoing</p>
          {
           tasks.map((task, index) => (
            <div key={index} className='w-[50%] flex justify-between text-xl border-2 rounded-2xl p-4 m-2 relative ' >
            <p className={ theme ? 'w-[85%] overflow-hidden flex items-center text-3xl font-Jockone text-white' : 'w-[85%] overflow-hidden flex items-center text-3xl font-Jockone'}>{task}</p>
            <input type="checkbox" onChange={Completed}  className='absolute self-center left-[85%] w-[4vh] h-[4vh] appearance-none '/>
            <button onClick={()=> handleDelete(index)}><img src="/dustbin.svg" className='w-[5vh] opacity-70' /></button>
            </div>
          ))}
           
        </div>
       </div>
    </div>
  )
}

export default App
