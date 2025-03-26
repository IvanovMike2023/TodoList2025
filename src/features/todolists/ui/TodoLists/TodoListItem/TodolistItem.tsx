import {AddItemForm} from "../../../../../common/components/AddItemForm/AddItemForm";
import {Box, IconButton, Paper} from "@mui/material";
import React from "react";
import {TodoListTitle} from "./TodoListTitle/TodoListTitle";
import {Tasks} from "./Tasks/Tasks";
import {FilterButtonst} from "./FilterButtons/FilterButtonst";
import {TaskType} from "../../../api/APITodoList";
import {Editablespan} from "./Tasks/editablespan";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
    title: string,
    todoListId: string,
    deleteTask: (taskId: string, todolistId: string) => void
    onCreateItem: (title: string, id: string) => void
    changeTitleTodolist: (title: string, id: string) => void
    changeTaskTitle: (title: string, taskId: string, todolistId: string) => void
    tasks: TaskType[]
    deleteTodoList: (todolislId: string) => void
}
export const TodolistItem = (props: Props) => {
    const todolistHandler = (title: string) => {
        props.onCreateItem(title, props.todoListId)
    }
    const changeTitleTodolist = (newtitle: string) => {
        props.changeTitleTodolist(newtitle, props.todoListId)
    }

    return <>
        <Editablespan title={props.title} changeTaskTitle={changeTitleTodolist}/>
        <IconButton color="primary"><DeleteIcon color={'action'}/></IconButton>
        <AddItemForm onCreateItem={todolistHandler}/>
        {props.tasks.map(el => <Tasks key={el.id} title={el.title} taskId={el.id}
                                      changeTaskTitle={props.changeTaskTitle} todoListId={props.todoListId}
                                      deleteTask={props.deleteTask}/>)}
        <FilterButtonst/>
    </>
}