import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'; 
import axios from 'axios';

const POSTS_URL = 'https://fakestoreapi.com/products';

const initialState = {
    posts: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts',async() =>{
    const reaponse = await axios.get(POSTS_URL);
    return reaponse.data
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost)
    console.log('add',response.data)
    return response.data
})

export const deletePost =createAsyncThunk('posts/deletePost', async (del) => {
    const response = await axios.delete(`https://fakestoreapi.com/products/${del.idl}`)
    // .then(response => {
      console.log('del',response.data);
      return response.data
    // })
    // console.log('del1',response.data);

    // .catch(error => {
    //   console.error(error);
    // });
})


export const postSlice = createSlice({
    name:'posts',
    initialState,
    reducers:{
        addPost :{
            reducer(state,action) {
                state.posts.push(action.payload)
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
            const postChange = state.posts.find((post) => post.id === postId )
            if (postChange)
                postChange.reactions[reaction]++;
        }
    },
    extraReducers(bulider){
        bulider
            .addCase(fetchPosts.pending , (state , action) => {
                state.status = 'Loading!'

            })
            .addCase(fetchPosts.fulfilled , (state , action) => {
                state.status = 'succeeded';
                const loadedPosts = action.payload.map(post => {
                    post.date = new Date().toISOString();
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post;

                }); 

                state.posts = loadedPosts

            })
            .addCase(fetchPosts.rejected , (state , action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                // Fix for API post IDs:
                // Creating sortedPosts & assigning the id 
                // would be not be needed if the fake API 
                // returned accurate new post IDs
                const sortedPosts = state.posts.sort((a, b) => {
                    if (a.id > b.id) return 1
                    if (a.id < b.id) return -1
                    return 0
                })
                action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
                // console.log(action.payload.id)
                // End fix for fake API post IDs 

                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    thumbsUp: 0,
                    hooray: 0,
                    heart: 0,
                    rocket: 0,
                    eyes: 0
                }
                console.log(action.payload)
                state.posts.push(action.payload)
            })
            .addCase(deletePost.fulfilled , (state , action) => {
                console.log('hi',action.payload)
                state.posts = state.posts.filter(post => post.id !== action.payload.id )
                console.log(state.posts)
            })
            .addCase(deletePost.rejected , (state , action) => {
                console.log('hi',action.payload)
                state.posts = state.posts.filter(post => post.id !== action.payload.id )
                console.log(state.posts)
            })
    }
}) 

export default postSlice.reducer;

export const selcetPosts = state => state.posts.posts;
export const selcetStatus = state => state.posts.status;
export const selcetError = state => state.posts.error;


export const { addPost , addReaction } = postSlice.actions;