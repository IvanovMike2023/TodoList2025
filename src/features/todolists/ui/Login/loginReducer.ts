import {AppDispatch} from "../../../../app/store";
import {APITodoList, LoginArgs, TasksState} from "../../api/APITodoList";

type initStateType={
    isme: boolean
}
const initialState = {isme:false} as initStateType
export const loginReducer=(state:initStateType=initialState,action:ActionType):initStateType=>{
    switch (action.type){
        case 'ME':
            return {isme: action.payload.isme}
        default:
            return state
    }
}
export const meAC=(isme:boolean)=>({type:'ME',payload:{isme}}as const)
export const meTC=()=>(dispatch: AppDispatch)=>{
    APITodoList.me().then(res => {
        console.log(res)
         if(res.data.resultCode===0){
         dispatch(meAC(true))
         }
         else console.log('you are not initialise')
    })
}
export const deleteAuthTC=()=>(dispatch:AppDispatch)=>{
    APITodoList.deleteauth().then(res=>{
        console.log(res)
        if(res.data.resultCode===0){
            dispatch(meAC(false))
        }
        else console.log('you are not initialise')
    })
}
export const AuthTC=(result:LoginArgs)=>(dispatch:AppDispatch)=>{
    APITodoList.auth(result).then(res=>{
        console.log("AUTH")
        console.log(result)
        console.log(res)
        dispatch(meAC(true))
    })
}
type ActionType = ReturnType<typeof meAC>