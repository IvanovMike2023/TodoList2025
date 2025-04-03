import {AppDispatch} from "../../../../app/store";
import {APITodoList, TasksState} from "../../api/APITodoList";

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
type ActionType = ReturnType<typeof meAC>