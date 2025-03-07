import React, {useEffect, useState} from 'react';
import s from './app.module.css'
import './App.css';
import {Todolist} from "./Components/Todolist";
import {AddItem} from "./Components/AddItem";
import {v1} from "uuid";
import {state, Task, Tasks} from './state'

type FilterValues = 'all'| 'ative'
export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}
function App() {

   const deleteTask=()=>{
       console.log('dddd')
   }

    const [tasks,setTasks]=useState<Task[]>(state)
    const [todolist,setTodoList]=useState<Todolist[]>([
        {id:v1(),title: 'cass',filter: 'all'},
        {id:v1(),title: 'cascasc',filter: 'all'},
        {id:v1(),title: 'ccascsaccccc',filter: 'all'}
    ])

    const addTask = (title:string)=>{
       const newTask={id:v1(),title:title,isdone:true}
        const newtasks=[...state,newTask]
         setTasks(newtasks)
    }
    useEffect(()=>{
        console.log(state)
        console.log(tasks)
    },[tasks])
    return (
        <div className={s.AppContainer}>
            <div className={s.HeadWrapper}>
                <div className={s.Menu}>menu</div>
                <div className={s.Login}>
                    <div>
                        <button>login</button>
                    </div>
                </div>
            </div>
            <div className={s.WrapperBody}>
                <AddItem />
            </div>
            <div className={s.Container}>
                {todolist.map((el)=>{
                  return  <Todolist key={el.id} deleteTask={deleteTask} title={el.title} tasks={tasks} addTask={addTask}/>

                })}
            </div>
        </div>
    );
}


export default App;
