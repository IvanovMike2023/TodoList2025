import {v1} from "uuid";
export type Tasks=Task[]

export type Task= {
    id: string
    title: string
    isdone:boolean
}
export const state:Tasks=[
    {id:v1(),title:'xsax',isdone:true},
    {id:v1(),title:'2222',isdone:true},
    {id:v1(),title:'3333',isdone:true},
    {id:v1(),title:'55555',isdone:true}
]