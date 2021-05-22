import React from 'react'

// chess-site-components
import PostsContainer from './PostsContainer'

// chess-site HOCs
import WithAside from '../_HOCs/WithAside'

const Main = ({ posts }) => {
  return (
    <WithAside id='all_posts'>
      <PostsContainer posts={posts} />
    </WithAside>
  )
}

export default Main
