import {TextField} from "@mui/material";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";

export const Editablespan = (props: { title: string, changeTaskTitle: (newtitle: string,) => void }) => {
    const [edit, setEdit] = useState(false)
    const [newtitle, setTitle] = useState('')

    const OnTaskTitleHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setEdit(true)
    }
    const OfTaskTitleHandler = () => {
        props.changeTaskTitle(newtitle)
        setEdit(false)
    }
    const EditTaskTitleHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTitle(e.currentTarget.value)
    }
    const EditKeyDownTaskTitleHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            setEdit(false)
        }
    }
    return <>{edit ?
        <TextField size="small" onKeyDown={EditKeyDownTaskTitleHandler}
                   onChange={EditTaskTitleHandler} value={newtitle}
                   onBlur={OfTaskTitleHandler}
                   label="Введите название" variant="outlined"/>
        : <span onClick={OnTaskTitleHandler}>{props.title}</span>
    }

    </>

}