import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

// chess-site components
import Main from './PostViewComponents/Main.js'
import SiteLoader from './_components/SiteLoader'
import SiteError from './_components/SiteError'

import { getPostEndpoint } from '../endpoints'

const propTypes = {
  match: PropTypes.object.isRequired
}

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

PostView.propTypes = propTypes

export default PostView
