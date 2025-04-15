import * as React from 'react';
import {AppProvider} from '@toolpad/core/AppProvider';
import {type AuthProvider, SignInPage} from '@toolpad/core/SignInPage';
import {useTheme} from '@mui/material/styles';
import {APITodoList} from "../../api/APITodoList";
import {useAppDispatch} from "../../../../app/hooks/useAppDispatch";
import {AuthTC, meAC} from "./loginReducer";
import {ChangeEvent, useEffect, useState} from "react";
import {Path} from "../../../../common/routing/Routing";
import {useAppSelector} from "../../../../app/hooks/useAppSelector";
import {useNavigate} from "react-router-dom";

const providers = [{ id: 'credentials', name: 'Email and Password' }];



export const  Login=()=> {
    const dispatch=useAppDispatch()
const [login,setlogin]=useState('')
const [pass,setpass]=useState('sac')
const handleLogin=(e:ChangeEvent<HTMLInputElement>)=>{
    setlogin(e.target.value)
}
const handlePass=(e:ChangeEvent<HTMLInputElement>)=>{
    setpass(e.target.value)
}
const Auth=()=>{
    const result={
        email:'ivanov.michail.2023@yandex.ru',
        password:'linux20121989LINUX',
        rememberMe:true
    }
    dispatch(AuthTC(result))
}
    return (
             <div>
                 <input type="text" value={login} onChange={handleLogin}/>
                 <input type="text" value={pass} onChange={handlePass}/>
                 <button onClick={Auth}>submit</button>
             </div>
    );
 }
// export const  Login=()=> {
//     const dispatch = useAppDispatch()
//     const theme = useTheme();
//     const isme = useAppSelector(state=>state.me.isme)
//     const navigate=useNavigate()
//     const signIn: (provider: AuthProvider, formData: FormData) => void =  (
//         provider,
//         formData,
//     ) => {
//
//         const email =formData.get('email')as string
//         const password=formData.get('password') as string
//         const result={email,password,rememberMe:true}
//         console.log(result)
//       dispatch(AuthTC(result))
//     };
//     useEffect(() => {
//         if(isme)
//             navigate(Path.Main)
//     }, [isme])
//     console.log(isme)
//     return (
//         // preview-start
//         <AppProvider theme={theme}>
//             <SignInPage
//                 signIn={signIn}
//                 providers={providers}
//                 slotProps={{ emailField: { autoFocus: false }, form: { noValidate: true } }}
//             />
//         </AppProvider>
//         // preview-end
//     );
// }
