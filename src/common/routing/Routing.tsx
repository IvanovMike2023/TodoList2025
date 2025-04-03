import { Route, Routes } from "react-router"
import {Main} from "../../app/Main";
import Login from "../../features/todolists/ui/Login/Login";
import {PageNotFound} from "../components/PageNotFound/PageNotFound";
export const Path={
    Main:'/',
    Login:'login',
    NotFound: '*'
}as const
export const Routing = () => (
    <Routes>
        <Route path={Path.Main} element={<Main />} />
        <Route path={Path.Login} element={<Login />} />
        <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
)