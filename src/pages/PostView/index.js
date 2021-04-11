import React, { useState, useEffect } from 'react'
import axios from 'axios'

// chess-site components
import Main from './Main'

import { getPostEndpoint } from '../../endpoints'

const PostView = () => {

  const [post, setPost] = useState({})

  const [commentaries, setCommentaries] = useState([])

  useEffect(() => {
    axios.get(getPostEndpoint())
      .then(res => {
        console.log(res.data)
        setPost(res.data)
        setCommentaries(res.data.comentaries)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <Main
      post={post}
      commentaries={commentaries}
    />
  )
}

export default PostView
