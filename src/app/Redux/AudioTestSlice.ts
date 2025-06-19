import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type AudioTestState = {
transcript:string;
listening:boolean;
}
const initialState: AudioTestState = {
    transcript:"",
    listening:false
}
const audioTestSlice= createSlice({
name: "audioTest",
initialState,
reducers:{

settranscript: (state, action : PayloadAction<string>) => {
    state.transcript = action.payload;
}
},
setlistening: (state ,action:PayloadAction<boolean>)=>{
state.listening = action.payload;
}
    ,
    setreset:(state:any)=>{
        state.transcript = "";
    }
    
})
export const { settranscript, setlistening, setreset } = audioTestSlice.actions;
export default audioTestSlice.reducer;