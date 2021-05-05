import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { getAllPostsEndpoint } from '../endpoints'

// chess-site components
import Main from './AllPostsViewComponents/Main'
import SiteError from './_components/SiteError'
import SiteLoader from './_components/SiteLoader'

const AllPostView = () => {

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    axios.get(getAllPostsEndpoint())
      .then(res => {
        setPosts(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
        setError(true)
      })
  }, [])

  return (
    <>
      {loading && <SiteLoader />}
      {!loading && error && <SiteError />}
      {!loading && !error && <Main posts={posts} />}
    </>
  )
}

export default AllPostView
