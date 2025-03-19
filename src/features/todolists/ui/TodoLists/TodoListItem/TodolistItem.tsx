import {AddItemForm} from "../../../../../common/components/AddItemForm/AddItemForm";
import {Box, Paper} from "@mui/material";
import React from "react";
import {Task} from "../../../../../app/App";
import {TodoListTitle} from "./TodoListTitle/TodoListTitle";
import {Tasks} from "./Tasks/Tasks";
import {FilterButtonst} from "./FilterButtons/FilterButtonst";

type Props = {
    title: string,
    todoListId: string,
    deleteTask: (taskId: string, todolistId: string) => void
    onCreateItem: (title: string, id: string) => void
    changeTitleTodolist: (title: string, id: string) => void
    changeTaskTitle: (title: string, taskId: string,todolistId:string) => void
    tasks: Task[]
    deleteTodoList: (todolislId:string)=>void
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
                    <TodoListTitle deleteTodoList={props.deleteTodoList} title={props.title} todoListId={props.todoListId}
                                   changeTitleTodolist={props.changeTitleTodolist}/>
                        <AddItemForm onCreateItem={todolistHandler}/>
                    <Tasks changeTaskTitle={props.changeTaskTitle} tasks={props.tasks} todoListId={props.todoListId} deleteTask={props.deleteTask}/>
                    <FilterButtonst/>
                </Paper>
            </div>
        </Box>
    </>
}