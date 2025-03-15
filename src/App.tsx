import React, {useEffect, useState} from 'react';
import s from './app.module.css'
import './App.css';
import {Todolist} from "./Components/Todolist";
import {AddItem} from "./Components/AddItem";
import {v1} from "uuid";

type FilterValues = 'all' | 'ative'
export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}
 export type Task = {
    id: string
    title: string
    isdone: boolean
}
export type TasksState ={
    [key:string]:Task[]
}


function App() {
const todoListId1=v1()
const todoListId2=v1()
    const Tasks ={
        [todoListId1]:[
        {id: v1(), title: 'xsax', isdone: true},
        {id: v1(), title: '33333', isdone: true},
        {id: v1(), title: '3333', isdone: true},
        {id: v1(), title: '55555', isdone: true}
    ],   [todoListId2]:[
        {id: v1(), title: '22222', isdone: true},
        {id: v1(), title: '2222', isdone: true}
    ]
}
    const deleteTask = (todolistId:string,taskId:string) => {
        tasks[todolistId]=[...tasks[todolistId].filter((el)=>el.id!=taskId)]
        setTasks({...tasks})
    }

    const [tasks, setTasks] = useState<TasksState>(Tasks)
    const [todolist, setTodoList] = useState<Todolist[]>([
        {id: todoListId1, title: 'cass', filter: 'all'},
        {id: todoListId2, title: 'cascasc', filter: 'all'},
    ])

    const addTask = (title: string,todolistId:string) => {
        const newTask = {id: v1(), title: title, isdone: true}
        const todolistTasks = tasks[todolistId]
        tasks[todolistId]=[...todolistTasks,newTask]
        setTasks({...tasks})
    }
const addTodoList=(title: string)=>{
    const newTodolist={id:v1(),title:title,filter:'all'}
    //todolist=[todolist,newTodolist]
    console.log(todolist)
    console.log(title)
}


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
                <AddItem addTodoList={addTodoList}/>
            </div>
            <div className={s.Container}>
                {todolist.map((el) => {
                    return <Todolist key={el.id} todoListId={el.id} deleteTask={deleteTask} title={el.title} tasks={tasks}
                                     addTask={addTask}/>
                })}
            </div>
        </div>
    );
}


export default App;
