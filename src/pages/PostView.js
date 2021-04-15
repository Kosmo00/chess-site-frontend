import React, { useState, useEffect } from 'react'
import axios from 'axios'

// chess-site components
import Main from './PostViewComponents/Main.js'

import { getPostEndpoint } from '../endpoints'

const PostView = ({ match }) => {

  const [post, setPost] = useState({})

  const [commentaries, setCommentaries] = useState([])

  useEffect(() => {
    const { username, post_title } = match.params
    axios.get(getPostEndpoint(username, post_title))
      .then(res => {
        setPost(res.data)
        setCommentaries(res.data.comentaries)
      })
      .catch(err => {
        console.log(err)
      })
  }, [match.params])

  return (
    <Main
      post={post}
      commentaries={commentaries}
    />
  )
}

export default PostView
