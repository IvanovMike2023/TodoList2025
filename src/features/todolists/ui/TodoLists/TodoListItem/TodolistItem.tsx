import {AddItemForm} from "../../../../../common/components/AddItemForm/AddItemForm";
import {Box, Button, ButtonGroup, Checkbox, IconButton, Paper, TextField} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from '../../../../../common/components/todolist.module.css'
import {Task, TasksState} from "../../../../../app/App";
import {TodoListTitle} from "./TodoListTitle/TodoListTitle";
import {Tasks} from "./Tasks/Tasks";
import {FilterButtonst} from "./FilterButtons/FilterButtonst";

type Props = {
    title: string,
    todoListId: string,
    deleteTask: (taskId: string, todolistId: string) => void
    onCreateItem: (title: string, id: string) => void
    changeTitleTodolist: (title: string, id: string) => void
    tasks: Task[]
}
export const TodolistItem = (props: Props) => {
    const todolistHandler = (title: string) => {
        props.onCreateItem(title, props.todoListId)
    }

    return <>
        <Box sx={{
            display: 'flex',
            marginTop: 5,
            '& > :not(style)': {m: 1, width: 280, height: 228,},
        }}>
            <div className="MuiPaper-root">
                <Paper elevation={3}>
                    <TodoListTitle title={props.title} todoListId={props.todoListId}
                                   changeTitleTodolist={props.changeTitleTodolist}/>
                        <AddItemForm onCreateItem={todolistHandler}/>
                    <Tasks tasks={props.tasks} todoListId={props.todoListId} deleteTask={props.deleteTask}/>
                    <FilterButtonst/>
                </Paper>
            </div>
        </Box>
    </>
}