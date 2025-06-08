import { Route, Routes } from "react-router"
import {Main} from "../../app/Main";
import {PageNotFound} from "../components/PageNotFound/PageNotFound";
import {Login} from "../../features/todolists/ui/Login/Login";
import {ProtectedRoute} from "../components/ProtectedRoute/ProtectedRoute";
import {useAppSelector} from "../../app/hooks/useAppSelector";
export const Path={
    Main:'/',
    Login:'/login',
    NotFound: '*'
}as const
export const Routing = () => {
    const IsLoggedIn = useAppSelector(state=>state.auth.IsLoggedIn)
    return <Routes>
        <Route element={<ProtectedRoute isLogin={IsLoggedIn} />}>
        <Route path={Path.Main} element={<Main/>}/>
        </Route>
        <Route element={<ProtectedRoute isLogin={!IsLoggedIn} redirectPath={Path.Main} />}>
            <Route path={Path.Login} element={<Login/>}/>
        </Route>
        <Route path={Path.NotFound} element={<PageNotFound/>}/>
        </Routes>
}