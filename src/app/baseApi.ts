import {AUTH_TOKEN} from "@/common/constants";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {useAppDispatch} from "@/app/hooks/useAppDispatch";
import {setAppErrorAC} from "@/app/app-slice";
//const dispatch = useAppDispatch()

export const baseApi = createApi({
    reducerPath: "APITodoList",
    tagTypes: ["Todolist", "Task"],
    baseQuery: async (args, api, extraOptions) => {
        const result = await fetchBaseQuery({
            baseUrl: import.meta.env.VITE_BASE_URL,
            prepareHeaders: headers => {
                headers.set('API-KEY', import.meta.env.VITE_API_KEY)
                headers.set('Authorization', `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
            },
        })(args, api, extraOptions)
        if (result.error) {
            if (result.error.status === 'FETCH_ERROR' || 'PARSING_ERROR') {
                api.dispatch(setAppErrorAC({error: result.error.error}))
            }
            if (result.error.status === 403 ) {
                api.dispatch(setAppErrorAC({error: '403 Forbidden Error. Check API-KEY'}))
            }
        }

        return result
    },
    endpoints: () => ({}),
})