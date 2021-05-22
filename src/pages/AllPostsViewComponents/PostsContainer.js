import React from 'react'

// chess-site components
import Post from './Post'

const PostsContainer = ({ posts }) => {
  return (
    <>
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </>
  )
}

export default PostsContainer
