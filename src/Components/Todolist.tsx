import {AddItem} from "./AddItem";
import {Box, Button, ButtonGroup, Checkbox, IconButton, Paper, TextField} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from './todolist.module.css'
import {Task, TasksState} from "../app/App";

type Props = {
    title: string,
    todoListId: string,
    deleteTask: (taskId: string, todolistId: string) => void
    onCreateItem: (title: string, id: string) => void
    changeTitleTodolist: (title: string, id: string) => void
    tasks: Task[]
}
export const Todolist = (props: Props) => {
    const [edit, setEdit] = useState(false)
    const [title, setTitle] = useState(props.title)
    const todolistHandler = (title: string) => {
        props.onCreateItem(title, props.todoListId)
    }
    const OnTaskTitleHandler = () => {
        setEdit(true)
    }
    const OfTaskTitleHandler = () => {
        setEdit(false)
    }
    const EditTaskTitleHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTitle(e.target.value)
        props.changeTitleTodolist(e.target.value, props.todoListId)
    }
    const EditKeyDownTaskTitleHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            props.changeTitleTodolist(title, props.todoListId)
            setEdit(false)
        }
    }
    return <>
        <Box sx={{
            display: 'flex',
            marginTop: 5,
            '& > :not(style)': {m: 1, width: 280, height: 228,},
        }}>
            <div className="MuiPaper-root">
                <Paper elevation={3}>
                    <div className={s.TitleTodoList}>
                        {edit ?
                            <TextField size="small" onKeyDown={EditKeyDownTaskTitleHandler}
                                       onChange={EditTaskTitleHandler} value={props.title} onBlur={OfTaskTitleHandler}
                                       label="Введите название" variant="outlined"/>
                            : <p onClick={OnTaskTitleHandler}>{props.title}</p>}
                        <IconButton color="primary"><DeleteIcon color={'action'}/></IconButton>
                    </div>
                    <div className={s.TaskInput}>
                        <AddItem onCreateItem={todolistHandler}/>
                    </div>
                    {props.tasks.map((el) => {
                        return <div className={s.TaskItems}>
                            <div key={el.id}><Checkbox defaultChecked/>
                                {el.title}</div>
                            <IconButton color="primary"><DeleteIcon style={{width: '20px'}}
                                                                    onClick={() => props.deleteTask(props.todoListId, el.id)}
                                                                    color={'action'}/></IconButton>

                        </div>
                    })}
                    <ButtonGroup className={s.ButtonWrap} color="secondary" aria-label="Medium-sized button group">
                        <Button color={"inherit"} key="All">All</Button>
                        <Button color={"primary"} key="two">Active</Button>
                        <Button color={"secondary"} key="three">Completed</Button>
                    </ButtonGroup>
                </Paper>
            </div>
        </Box>
    </>
}