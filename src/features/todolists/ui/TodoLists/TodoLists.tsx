import s from "../../../../app.module.css";
import {TodolistItem} from "./TodoListItem/TodolistItem";
import React, {useEffect, useState} from "react";
import {changeTodoListTC, deleteTodoListTC, fetchTodolistsTC} from "../../../../common/components/todoListReducer";
import {changeTaskTC, changeTaskTitleAC, createTaskTC, deleteTaskTC} from "../../../../common/components/taskReducer";
import {useAppDispatch} from "../../../../app/hooks/useAppDispatch";
import {useAppSelector} from "../../../../app/hooks/useAppSelector";
import {Grid, Paper} from "@mui/material";

export const TodoLists = () => {
    const todolists = useAppSelector(state => state.todolists)
    const tasks = useAppSelector(state => state.tasks)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    const deleteTodoList = (todolislId: string) => {
        dispatch(deleteTodoListTC(todolislId))
    }
    const deleteTask = ( taskId: string,todolistId: string) => {

        dispatch(deleteTaskTC(taskId,todolistId))
        //tasks[todolistId] = [...tasks[todolistId].filter((el) => el.id != taskId)]
    }
    const createTask = (title: string, todolistId: string) => {
        dispatch(createTaskTC(title,todolistId))
       /// setTasks({...tasks})
    }
    const changeTitleTodolist = (title: string, todolistId: string) => {
        dispatch(changeTodoListTC(title,todolistId))
    }
    const changeTaskTitle = (title: string, taskId: string, todolistId: string) => {
        console.log(title,taskId,todolistId)
       // const action = changeTaskTitleAC(title, taskId, todolistId);
        dispatch(changeTaskTC({title:title}, taskId, todolistId));
    }
    return <>
        <Grid container spacing={3}>
        {todolists.map((el) => {
            let allTodolistTasks = tasks[el.id]
            return <Grid item key={el.id}>
                <Paper style={{padding: '10px'}}>
                    <TodolistItem key={el.id} todoListId={el.id} deleteTask={deleteTask} title={el.title}
                                 tasks={allTodolistTasks}
                                 onCreateItem={createTask}
                                 changeTitleTodolist={changeTitleTodolist}
                                 changeTaskTitle={changeTaskTitle}
                                 deleteTodoList={deleteTodoList}
            />
                </Paper>
                    </Grid>
        })}
        </Grid>
    </>
}