import React, {useEffect, useState} from 'react'
import axios from 'axios'

import {getAllPostsEndpoint} from '../../endpoints'

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
  })

  return (
    <div>
      
    </div>
  )
}

export default AllPostView
