import React from 'react'
import { useDispatch } from 'react-redux'
import { addReaction } from './postSlice'
const ReactionButtons = ({post}) => {

    const dispatch = useDispatch()

    const emojis =  {
        thumbsUp: '👍',
        wow: '😮',
        heart: '❤️',
        rocket: '🚀',
        coffee: '☕'
    }

    const buttons = Object.entries(emojis).map(([name,emoji]) => (
        <button
            key={name}
            type='button'
            className='reactionButton'
            onClick={() => dispatch(addReaction(
                {
                    postId:post.id,
                    reaction:name
                }
            ))}

        >
            {emoji} {post.reactions[name]}
        </button>
    ))

  return <div>{buttons}</div>
}

export default ReactionButtons
