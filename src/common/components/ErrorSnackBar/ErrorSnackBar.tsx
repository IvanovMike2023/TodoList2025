import {Alert, Snackbar} from "@mui/material";
import React, {SyntheticEvent} from "react";
import {useAppSelector} from "../../../app/hooks/useAppSelector";
import {useAppDispatch} from "../../../app/hooks/useAppDispatch";
import {setAppErrorAC} from "../../../app/app-slice";

export const ErrorSnackBar=()=>{
    const error = useAppSelector(state => state.app.error)
    const dispatch = useAppDispatch()
    const handleClose = (_: SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return
        }
        dispatch(setAppErrorAC({ error: null }))
    }
    return(    <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: "100%" }}>
            {error}
        </Alert>
    </Snackbar>
)
}