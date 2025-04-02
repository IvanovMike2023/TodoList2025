import axios from "axios";

const token = "ef7ff5dd-c4a1-4818-a09c-d1c24bd17361"

export const AppHttpRequest = () => {
    return axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}