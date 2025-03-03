import React from 'react';
import s from './app.module.css'
import './App.css';
import {Todolist} from "./Components/Todolist";
import {AddItem} from "./Components/AddItem";
export type Tasks=Task[]
type Task= {
    id: number
    title: string
    isdone:boolean
}
function App() {
   const deleteTask=()=>{
       console.log('dddd')
   }


    const tasks:Tasks=[
        {id:1,title:'xsax',isdone:true},
        {id:2,title:'2222',isdone:true},
        {id:3,title:'3333',isdone:true}
    ]
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
                <AddItem/>
            </div>
            <div className={s.Container}>
                <Todolist deleteTask={deleteTask} title={'casac'} tasks={tasks}/>
            </div>
        </div>
    );
}

export default App;
