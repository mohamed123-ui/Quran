import { configureStore } from "@reduxjs/toolkit";
import tabSlice from '../Redux/Slice'; // This should import the default export (the reducer)
import juzsSlice from "./JuzhSlice"
import revelationOrderSlice from"./revelationOrderSlice"
import detailSlice from"./detailsSlic"
import manualSlice from"./hiddenSlice"
import audioTestSlice from "./AudioTestSlice"
 export const Store= configureStore({
    reducer:{
   tabs:tabSlice,
   juzs:juzsSlice,   
revelationOrder:revelationOrderSlice,
details:detailSlice,
manualTest:manualSlice,
audioTest:audioTestSlice
}

})
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;