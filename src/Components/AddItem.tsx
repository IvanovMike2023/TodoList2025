import s from "../app.module.css";
import {IconButton, TextField} from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import React from "react";

export const AddItem = () => {
    return <>
        <div className={s.ButtonAdd}>
            <TextField id="outlined-basic" label="Введите название" variant="outlined" />
            <IconButton color="primary"><AddBoxOutlinedIcon color={"primary"}/></IconButton>
        </div>
    </>
}