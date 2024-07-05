import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './Todoslice'



export const store =configureStore({
    reducer:{
        tasks:todoReducer
    }
})

