import * as React from 'react';
import {useEffect} from 'react';
import {Checkbox, FormControl, FormControlLabel, FormGroup, Grid, TextField} from "@mui/material";
import {Controller, useForm} from 'react-hook-form';
import s from './Login.module.css';
import {useAppSelector} from "../../../../app/hooks/useAppSelector";
import {useAppDispatch} from "../../../../app/hooks/useAppDispatch";
import {Path} from "../../../../common/routing/Routing";
import {useNavigate} from "react-router";
import {useLoginMutation} from "@/features/todolists/api/APITodoList";
import {selectIsLoggedIn, setIsLoggedInAC} from "@/app/app-slice";
import {loginTC} from "@/features/todolists/ui/Login/auth-slice";
import {AUTH_TOKEN} from "@/common/constants";


// const providers = [{ id: 'credentials', name: 'Email and Password' }];
//
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
export const Login = () => {
    const IsLoggedIn = useAppSelector(selectIsLoggedIn)
    const dispatch = useAppDispatch()
    const navigate=useNavigate()
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<Inputs>({ defaultValues: { email: '', password: '', rememberMe: false } })
    const [login]=useLoginMutation()
    const onsubmit=(data:Inputs)=>{
        login(data).then((res)=>{
            dispatch( setIsLoggedInAC({IsLoggedIn:true}))
            localStorage.setItem(AUTH_TOKEN, res.data.data?.token)
        })
        reset()
    }
useEffect(()=>{
    if(IsLoggedIn) {
        navigate(Path.Main)
    }
},[IsLoggedIn])
    return (
        <Grid container justifyContent={'center'}>
            <form onSubmit={handleSubmit(onsubmit)}>
            <FormControl>
                <FormGroup>
                    <TextField label="Email" margin="normal" error={!!errors.email}
                        {...register('email',{
                        required: 'Email is required',
                        pattern: {
                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: 'Incorrect email address',
                        },
                    })}  />
                    {errors.email && <span className={s.errorMessage}>{errors.email.message}</span>}
                    <TextField type="password" label="Password" margin="normal" {...register('password')} />
                    <FormControlLabel
                        label={'Remember me'}
                        control={
                            <Controller
                                name={'rememberMe'}
                                control={control}
                                render={({ field: { value, ...rest } }) => <Checkbox {...rest} checked={value} />}
                            />
                        }
                    />
                    <input type="submit" />
                    {/*...*/}
                </FormGroup>
            </FormControl>
            </form>
        </Grid>
    )
}
type Inputs = {
    email: string
    password: string
    rememberMe: boolean
}