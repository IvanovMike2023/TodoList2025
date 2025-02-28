import {AddItem} from "./AddItem";
import {Box, IconButton, Paper} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import s from './todolist.module.css'
import {Tasks} from "../App";
type Props={
    title:string,
    deleteTask:()=>void
    tasks:Tasks
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
                    <AddItem/>
                <ul>
                {props.tasks.map((el)=>{
                   return <li> {el.title} <IconButton color="primary"><DeleteIcon onClick={props.deleteTask} color={'action'}/></IconButton></li>
                })}
                </ul>
            </Paper>
        </Box>
    </>
}