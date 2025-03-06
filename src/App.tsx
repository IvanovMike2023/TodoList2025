import React, {useEffect, useState} from 'react';
import s from './app.module.css'
import './App.css';
import {Todolist} from "./Components/Todolist";
import {AddItem} from "./Components/AddItem";
import {v1} from "uuid";
export type Tasks=Task[]
type Task= {
    id: string
    title: string
    isdone:boolean
}

function App() {
   const deleteTask=()=>{
       console.log('dddd')
   }
    let tasksState:Tasks=[
        {id:v1(),title:'xsax',isdone:true},
        {id:v1(),title:'2222',isdone:true},
        {id:v1(),title:'3333',isdone:true},
        {id:v1(),title:'55555',isdone:true}
    ]
    const [tasks,setTasks]=useState(tasksState)

    const addTask = (title:string)=>{
        console.log(title)
       const newTask={id:v1(),title:title,isdone:true}
        const newtasks=[...tasksState,newTask]
         setTasks(newtasks)

    }
    useEffect(()=>{
        console.log(tasksState)
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
                <Todolist deleteTask={deleteTask} title={'casac'} tasks={tasks} addTask={addTask}/>
            </div>
        </div>
    );
}

export default App;
