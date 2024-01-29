import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { selcetPosts , selcetError , selcetStatus ,fetchPosts } from './postSlice'
import PostAurthor from './PostAurthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'

const Post = () => {
    
    const dispatch = useDispatch()
    const posts = useSelector( selcetPosts )
    const status = useSelector( selcetStatus )
    const error = useSelector( selcetError )

    console.log(posts)

    useEffect(() => {
      if(status === 'idle'){
        dispatch(fetchPosts())
      }
    },[status,dispatch])

    console.log(error,status);

    const renderPosts = record => {
        return(
        <article key={record.id}>
            <h3>{record.title}</h3>
            <p>{record.description}</p>
            <p className='postCredit'>
              <p>{record.id}</p>
              <PostAurthor userId={record.userId}/>
              <TimeAgo timestamp={record.date}/>
            </p>
            <ReactionButtons post={record}/>
        </article>
        )
    }
  return (
    <section>
      <h2>posts</h2>
      {posts && posts.map(e => renderPosts(e))}
    </section>
  )
}

export default Post
