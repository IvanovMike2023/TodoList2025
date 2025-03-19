import s from "../../../../app.module.css";
import {TodolistItem} from "./TodoListItem/TodolistItem";
import React, {useCallback, useId, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../app/store";
import {TasksState, TodolistType} from "../../../../app/App";
import {changeTitleTodoListAC} from "../../../../common/components/todoListReducer";
import {changeTaskTitleAC} from "../../../../common/components/taskReducer";
import {useAppDispatch} from "../../../../app/hooks/useAppDispatch";
import {useAppSelector} from "../../../../app/hooks/useAppSelector";

export const TodoLists=()=>{
    const todolists = useAppSelector(state => state.todolists)
    const tasks = useAppSelector(state => state.tasks)
    const dispatch = useAppDispatch();
    const newId=useId()
    const [task, setTasks] = useState<TasksState>({})

    const deleteTask = (todolistId: string, taskId: string) => {
        tasks[todolistId] = [...tasks[todolistId].filter((el) => el.id != taskId)]
        setTasks({...tasks})
    }

    const createTask = (title: string, id: string) => {
        const newTask = {id: newId, title: title, isdone: true}
        const todolistTasks = tasks[id]
        tasks[id] = [...todolistTasks, newTask]
        setTasks({...tasks})
    }
    const changeTitleTodolist = (title: string,todolistId:string) => {
        const action = changeTitleTodoListAC(title,todolistId);
        dispatch(action);
    }

    const changeTaskTitle = (title: string, taskId: string,todolistId:string) => {
        const action = changeTaskTitleAC(title,taskId,todolistId);
         dispatch(action);
    }
    return    <div className={s.Container}>
        {todolists.map((el) => {
            let allTodolistTasks = tasks[el.id]
            return <TodolistItem key={el.id} todoListId={el.id} deleteTask={deleteTask} title={el.title}
                                 tasks={allTodolistTasks}
                                 onCreateItem={createTask}
                                 changeTitleTodolist={changeTitleTodolist}
                                 changeTaskTitle={changeTaskTitle}
            />
        })}
    </div>
}