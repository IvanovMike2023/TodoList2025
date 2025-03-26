import {AddItemForm} from "../../../../../common/components/AddItemForm/AddItemForm";
import {Box, IconButton, Paper} from "@mui/material";
import React from "react";
import {Tasks} from "./Tasks/Tasks";
import {FilterButtonst} from "./FilterButtons/FilterButtonst";
import {TaskStatuses, TaskType} from "../../../api/APITodoList";
import {Editablespan} from "./Tasks/editablespan";
import DeleteIcon from "@mui/icons-material/Delete";
import s from "../../../../../common/components/todolist.module.css";

type Props = {
    title: string,
    todoListId: string,
    deleteTask: (taskId: string, todolistId: string) => void
    onCreateItem: (title: string, id: string) => void
    changeTitleTodolist: (title: string, id: string) => void
    changeTaskTitle: (title: string, taskId: string, todolistId: string) => void
    tasks: TaskType[]
    deleteTodoList: (todolislId: string) => void
    SetStatusTask: (status: number,taskId: string, todolistId: string) => void

}
export const TodolistItem = (props: Props) => {
    const todolistHandler = (title: string) => {
        props.onCreateItem(title, props.todoListId)
    }
    const changeTitleTodolist = (newtitle: string) => {
        props.changeTitleTodolist(newtitle, props.todoListId)
    }
    const deleteTitleTodolist = () => {
        props.deleteTodoList(props.todoListId)
    }
    return <>
        <div className={s.TitleTodoList}>
        <Editablespan title={props.title} changeTaskTitle={changeTitleTodolist}/>
        <IconButton color="primary"><DeleteIcon onClick={deleteTitleTodolist} color={'action'}/></IconButton>
        </div>
        <AddItemForm onCreateItem={todolistHandler}/>
        {props.tasks.map(el => <Tasks  key={el.id} title={el.title} taskId={el.id} status={el.status}
                                      changeTaskTitle={props.changeTaskTitle} todoListId={props.todoListId}
                                       SetStatusTask={props.SetStatusTask}
                                      deleteTask={props.deleteTask}/>)}
        <FilterButtonst/>
    </>
}