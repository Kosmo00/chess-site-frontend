import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { getAllPostsEndpoint } from '../endpoints'

// chess-site components
import Main from './AllPostsViewComponents/Main'

const AllPostView = () => {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios.get(getAllPostsEndpoint())
      .then(res => {
        setPosts(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <Main posts={posts} />
  )
}

export default AllPostView
