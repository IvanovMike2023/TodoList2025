import * as React from 'react';
import {useEffect} from 'react';
import {Checkbox, FormControl, FormControlLabel, FormGroup, Grid, TextField} from "@mui/material";
import {Controller, useForm} from 'react-hook-form';
import s from './Login.module.css';
import {useAppSelector} from "../../../../app/hooks/useAppSelector";
import {loginTC} from "./auth-slice";
import {useAppDispatch} from "../../../../app/hooks/useAppDispatch";
import {useNavigate} from "react-router-dom";
import {Path} from "../../../../common/routing/Routing";


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
    const isme = useAppSelector(state=>state.auth.IsLoggedIn)
    console.log(isme)
    const dispatch = useAppDispatch()
    const navigate=useNavigate()
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<Inputs>({ defaultValues: { email: '', password: '', rememberMe: false } })
    const onsubmit=(data:Inputs)=>{
        //dispatch(AuthTC(data))
        dispatch(loginTC(data))
        console.log(data)
        reset()
    }
useEffect(()=>{
    if(isme) {
        navigate(Path.Main)
    }
},[isme])
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