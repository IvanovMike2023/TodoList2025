import s from "../../../../app.module.css";
import {TodolistItem} from "./TodoListItem/TodolistItem";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../app/store";
import {TasksState, TodolistType} from "../../../../app/App";
import {changeTitleTodoListAC} from "../../../../common/components/todoListReducer";
import {v1} from "uuid";

export const TodoLists=()=>{
    const todolists = useSelector<RootState, TodolistType[]>(state => state.todolists)
    const tasks = useSelector<RootState, TasksState>(state => state.tasks)
    const dispatch = useDispatch();

    const [task, setTasks] = useState<TasksState>({})

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
    const changeTitleTodolist = (title: string,todolistId:string) => {
        const action = changeTitleTodoListAC(title,todolistId);
        dispatch(action);
    }
    return    <div className={s.Container}>
        {todolists.map((el) => {
            let allTodolistTasks = tasks[el.id]
            return <TodolistItem key={el.id} todoListId={el.id} deleteTask={deleteTask} title={el.title}
                                 tasks={allTodolistTasks}
                                 onCreateItem={createTask}
                                 changeTitleTodolist={changeTitleTodolist}
            />
        })}
    </div>
}