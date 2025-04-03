import * as React from 'react';
import {AppProvider} from '@toolpad/core/AppProvider';
import {type AuthProvider, SignInPage} from '@toolpad/core/SignInPage';
import {useTheme} from '@mui/material/styles';
import {APITodoList} from "../../api/APITodoList";
import {useAppDispatch} from "../../../../app/hooks/useAppDispatch";
import {meAC} from "./loginReducer";
import {useEffect} from "react";
import {Path} from "../../../../common/routing/Routing";
import {useAppSelector} from "../../../../app/hooks/useAppSelector";
import {useNavigate} from "react-router-dom";

const providers = [{ id: 'credentials', name: 'Email and Password' }];



export default function Login() {
    const dispatch = useAppDispatch()
    const theme = useTheme();
    const isme = useAppSelector(state=>state.me.isme)
    const navigate=useNavigate()
    const signIn: (provider: AuthProvider, formData: FormData) => void =  (
        provider,
        formData,
    ) => {

        const email =formData.get('email')as string
        const password=formData.get('password') as string
        const result={email,password,rememberMe:true}
        APITodoList.auth(result).then(res=>{
            console.log(res)
            dispatch(meAC(true))
        })
    };
    useEffect(() => {
        if(isme)
            navigate(Path.Main)
    }, [isme])
    return (
        // preview-start
        <AppProvider theme={theme}>
            <SignInPage
                signIn={signIn}
                providers={providers}
                slotProps={{ emailField: { autoFocus: false }, form: { noValidate: true } }}
            />
        </AppProvider>
        // preview-end
    );
}
