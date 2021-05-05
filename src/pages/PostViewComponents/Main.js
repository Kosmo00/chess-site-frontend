import React, { useState } from 'react'
import PropTypes from 'prop-types'

// chess-site components
import PostSection from './PostSection'
import CommentariesSection from './CommentariesSection'
import BoardSection from './BoardSection'

// chess-site HOCs
import WithAside from '../_HOCs/WithAside'

const Main = ({ post, commentaries }) => {

  const [boardView, setBoardView] = useState(true)

  return (
    <WithAside id='publication'>
      {boardView && <BoardSection />}
      {!boardView && <PostSection post={post} />}
      {!boardView && <CommentariesSection commentaries={commentaries} />}
    </WithAside>
  )
}

Main.propTypes = {
  post: PropTypes.object.isRequired,
  commentaries: PropTypes.array
}

export default Main
