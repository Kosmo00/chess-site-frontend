import React, { useEffect, useState } from 'react'
import axios from 'axios'

// chess-site components
import SiteLoader from './_components/SiteLoader'
import SiteError from './_components/SiteError'
import Main from './UserProfileComponents/Main'

// endpoints
import { getUserData } from '../endpoints'

const UserProfile = ({ match }) => {

  const [user, setUser] = useState({})
  const [post_counter, setPostCounter] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    axios.get(getUserData(match.params.username))
      .then(res => {
        setUser(res.data.user)
        setPostCounter(res.data.post_count)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setError(true)
        setLoading(false)
      })

  }, [match.params.username])
  return (
    <>
      {loading && <SiteLoader />}
      {!loading && error && <SiteError />}
      {!loading && !error && <Main user={user} post_counter={post_counter} />}
    </>
  )
}

export default UserProfile
