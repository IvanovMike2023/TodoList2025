import {AddItem} from "./AddItem";
import {Box, IconButton, Paper} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import s from './todolist.module.css'
import {Tasks} from "../state";
import {TasksState} from "../App";
type Props={
    title:string,
    todoListId:string,
    deleteTask:(taskId:string,todolistId:string)=>void
    addTask:(title:string,id:string)=>void
    tasks:TasksState
}
export const Todolist=(props:Props)=>{

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
                    <AddItem todolistId={props.todoListId} addTask={props.addTask}/>
                <ul>
                {props.tasks[props.todoListId].map((el)=>{
                   return <li key={el.id}> {el.title} <IconButton color="primary"><DeleteIcon onClick={()=>props.deleteTask(props.todoListId,el.id)} color={'action'}/></IconButton></li>
                })}
                </ul>
            </Paper>
        </Box>
    </>
}