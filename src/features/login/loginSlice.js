import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'; 
import {email,password} from './Login'
import axios from 'axios';

const datas_URL = 'https://react-assignment-api.mallow-tech.com/api/login';

const initialState = {
    datas: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}
// export const loadData =(email,password) =>{
    export const credentials = {
        email: '',
        password: ''
      }

    var config = {
        method: 'post',
      maxBodyLength: Infinity,
        url: 'https://react-assignment-api.mallow-tech.com/api/login',
        headers: { 
          'Content-Type': 'application/json', 
          'X-Requested-With': 'XMLHttpRequest'
        },
        data : JSON.stringify(credentials)
      };
// }
export const  fetchData = createAsyncThunk('',async() =>{
    // console(e);
    // config.data.email = e;
    // config.data.password = pass;
    const reaponse = await axios(config);
    return reaponse.data
})

export const loginSlice = createSlice({
    name:'datas',
    initialState,
    reducers:{
        addPost :{
            reducer(state,action) {
                state.datas.push(action.payload)
            },
            prepare(title,content,userId){
                return{
                    payload:{
                        id:nanoid,
                        title,
                        content,
                        date: new Date().toISOString(),
                        userId,
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    }
                }
            }
        },
        addReaction : (state,action) => {
            const {postId , reaction} = action.payload;
            const postChange = state.datas.find((post) => post.id === postId )
            if (postChange)
                postChange.reactions[reaction]++;
        }
    },
    extraReducers(bulider){
        bulider
            .addCase(fetchData.pending , (state , action) => {
                state.status = 'Loading!'

            })
            .addCase(fetchData.fulfilled , (state , action) => {
                state.status = 'succeeded';
                const loadeddatas = action.payload
                state.datas = state.datas.concat(loadeddatas)

            })
            .addCase(fetchData.rejected , (state , action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
}) 

export default loginSlice.reducer;

export const selcetlog = state => state.datas.datas;
export const selcetStatus = state => state.datas.status;
export const selcetError = state => state.datas.error;


export const { addPost , addReaction } = loginSlice.actions;