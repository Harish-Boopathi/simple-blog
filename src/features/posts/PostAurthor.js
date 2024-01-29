import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/userSlice'

const PostAurthor = ({userId}) => {

    const users = useSelector(selectAllUsers)

    const aurthor = users.find(user => userId === user.id)

    // console.log(userId);

  return (
    <span>
      by {aurthor ? aurthor.name : 'Unknown'}
    </span>
  )
}

export default PostAurthor
