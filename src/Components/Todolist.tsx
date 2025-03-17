import {AddItem} from "./AddItem";
import {Box, IconButton, Paper} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import s from './todolist.module.css'
import {Tasks} from "../state";
import {Task, TasksState} from "../app/App";
type Props={
    title:string,
    todoListId:string,
    deleteTask:(taskId:string,todolistId:string)=>void
    onCreateItem:(title:string,id:string)=>void
    tasks:Task[]
}
export const Todolist=(props:Props)=>{
const todolistHandler=(title:string)=>{
    props.onCreateItem(title,props.todoListId)
}

    return <>
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,
                    width: 228,
                    height: 328,
                },
            }}
        >
            <Paper elevation={3} >
                <div className={s.TitleTodoList}>
                <p>{props.title}</p>
                <IconButton color="primary"><DeleteIcon color={'action'}/></IconButton>
                </div>
                    <AddItem onCreateItem={todolistHandler} />
                <ul>
                { props.tasks.map((el)=>{
                   return <li key={el.id}> {el.title} <IconButton color="primary"><DeleteIcon onClick={()=>props.deleteTask(props.todoListId,el.id)} color={'action'}/></IconButton></li>
                })  }
                </ul>
            </Paper>
        </Box>
    </>
}