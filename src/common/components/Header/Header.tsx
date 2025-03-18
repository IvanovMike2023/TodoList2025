import s from "../../../app.module.css";
import React from "react";

export const Header =()=>{
    return   <div className={s.HeadWrapper}>
        <div className={s.Menu}>menu</div>
        <div className={s.Login}>
            <div>
                <button>login</button>
            </div>
        </div>
    </div>
}