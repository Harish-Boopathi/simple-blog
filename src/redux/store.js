import {configureStore} from '@reduxjs/toolkit';
import postReducer from '../features/posts/postSlice'
import userReducer from '../features/users/userSlice'
// import loginReducer from '../features/login/loginSlice'

export const store = configureStore({
    reducer:{
        posts:postReducer,
        users:userReducer,
        // datas:loginReducer
    }
})