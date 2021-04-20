import React, { useState, useEffect } from 'react'
import axios from 'axios'

// chess-site components
import Main from './PostViewComponents/Main.js'
import SiteLoader from './_components/SiteLoader'
import SiteError from './_components/SiteError'

import { getPostEndpoint } from '../endpoints'

const PostView = ({ match }) => {

  const [post, setPost] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [commentaries, setCommentaries] = useState([])

  useEffect(() => {
    const { username, post_title } = match.params
    axios.get(getPostEndpoint(username, post_title))
      .then(res => {
        setPost(res.data)
        setCommentaries(res.data.Commentaries)
        setLoading(false)
      })
      .catch(err => {
        setError(true)
        setLoading(false)
        console.log(err)
      })
  }, [match.params])

  return (
    <>
      {loading && <SiteLoader />}
      {!loading && error && <SiteError />}
      {!loading && !error && <Main
        post={post}
        commentaries={commentaries}
      />}
    </>
  )
}

export default PostView
