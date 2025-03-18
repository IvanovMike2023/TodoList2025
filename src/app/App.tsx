import React, {useCallback, useEffect, useReducer, useState} from 'react';
import s from '../app.module.css'
import {Todolist} from "../Components/Todolist";
import {AddItem} from "../Components/AddItem";
import {v1} from "uuid";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store";
import {addTodoListAC, changeTitleTodoListAC, todolistsReducer} from "../Components/todoListReducer";

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
export type TasksState = {
    [key: string]: Task[]
}


function App() {
    const [task, setTasks] = useState<TasksState>({})

    const tasks = useSelector<RootState, TasksState>(state => state.tasks)
    const todolists = useSelector<RootState, Todolist[]>(state => state.todolists)
    const dispatch = useDispatch();

    const deleteTask = (todolistId: string, taskId: string) => {
        tasks[todolistId] = [...tasks[todolistId].filter((el) => el.id != taskId)]
        setTasks({...tasks})
    }

    const createTask = (title: string, id: string) => {
        const newTask = {id: v1(), title: title, isdone: true}
        const todolistTasks = tasks[id]
        tasks[id] = [...todolistTasks, newTask]
        setTasks({...tasks})
    }

    const createTodolist = useCallback((title: string) => {
        const action = addTodoListAC(title);
        dispatch(action);
    }, [dispatch]);
    const changeTitleTodolist = useCallback((title: string,todolistId:string) => {
        const action = changeTitleTodoListAC(title,todolistId);
        dispatch(action);
    }, []);
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
                <AddItem onCreateItem={createTodolist}/>
            </div>
            <div className={s.Container}>
                {todolists.map((el) => {
                    let allTodolistTasks = tasks[el.id]
                    return <Todolist key={el.id} todoListId={el.id} deleteTask={deleteTask} title={el.title}
                                     tasks={allTodolistTasks}
                                     onCreateItem={createTask}
                                     changeTitleTodolist={changeTitleTodolist}
                    />
                })}
            </div>
        </div>
    );
}


export default App;
