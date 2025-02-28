import {AddItem} from "./AddItem";
import {Box, IconButton, Paper} from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import React from "react";
import s from './todolist.module.css'
type Props={
    title:string
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
                    height: 228,
                },
            }}
        >
            <Paper elevation={3} >
                <div className={s.TitleTodoList}>
                <p>{props.title}</p>
                <IconButton color="primary"><AddBoxOutlinedIcon color={"primary"}/></IconButton>
                </div>
                    <AddItem/>
            </Paper>
        </Box>
    </>
}