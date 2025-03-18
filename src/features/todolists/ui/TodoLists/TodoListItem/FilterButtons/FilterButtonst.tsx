import {Button, ButtonGroup} from "@mui/material";
import s from "../../../../../../common/components/todolist.module.css";
import React from "react";

export const FilterButtonst=()=>{
    return <>
        <ButtonGroup className={s.ButtonWrap} color="secondary" aria-label="Medium-sized button group">
            <Button color={"inherit"} key="All">All</Button>
            <Button color={"primary"} key="two">Active</Button>
            <Button color={"secondary"} key="three">Completed</Button>
        </ButtonGroup></>
}