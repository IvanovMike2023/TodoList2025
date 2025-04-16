import {TodolistItem} from "./TodoListItem/TodolistItem";
import React, {useEffect} from "react";
import {
    changeFilterTodoListAC,
    changeTodoListTC,
    deleteTodoListTC,
    fetchTodolistsTC,
    FilterValuesType, todolistsSlice
} from "../../../../common/components/todoList-slice";
import {createTaskTC, deleteTaskTC, updateTaskTC} from "../../../../common/components/task-slice";
import {useAppDispatch} from "../../../../app/hooks/useAppDispatch";
import {useAppSelector} from "../../../../app/hooks/useAppSelector";
import {Grid, Paper} from "@mui/material";
import {APITodoList} from "../../api/APITodoList";
import {log} from "util";

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
    }
    const createTask = (title: string, todolistId: string) => {
        dispatch(createTaskTC(title,todolistId))
       /// setTasks({...tasks})
    }
    const changeTitleTodolist = (title: string, todolistId: string) => {
        dispatch(changeTodoListTC(title,todolistId))
    }
    const changeTaskTitle = (title: string, taskId: string, todolistId: string) => {
        dispatch(updateTaskTC({title:title}, taskId, todolistId));
    }
    const SetStatusTask=(status:number,taskId: string, todolistId: string)=>{
        dispatch(updateTaskTC({status:status}, taskId, todolistId));
    }
    const SetFilterTask=(filter:FilterValuesType, todolistId: string)=>{
        dispatch(todolistsSlice.actions.changeFilterTodoListAC({filter, todolistId}));
    }
    return <>
        <Grid container spacing={3}>
        {todolists.map((el) => {
            let allTodolistTasks = tasks[el.id]
            return <Grid item key={el.id}>
                <Paper style={{padding: '10px'}}>
                    <TodolistItem key={el.id} todoListId={el.id} deleteTask={deleteTask} title={el.title}
                                 tasks={allTodolistTasks}
                                  filter={el.filter}
                                 onCreateItem={createTask}
                                 changeTitleTodolist={changeTitleTodolist}
                                 changeTaskTitle={changeTaskTitle}
                                 deleteTodoList={deleteTodoList}
                                  SetStatusTask={SetStatusTask}
                                  SetFilterTask={SetFilterTask}
            />
                </Paper>
                    </Grid>
        })}
        </Grid>
    </>
}