import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

// react-bootstrap components
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import FormControl from 'react-bootstrap/FormControl'
import Label from 'react-bootstrap/FormLabel'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

// chess-site HOCs
import WithCenterContainer from './_HOCs/WithCenterContainer'

// chess-site providers
import { LoginContext } from '../App'

import { postLogin } from '../endpoints'

const LoginView = () => {

  const [nick, setNick] = useState('')
  const [password, setPassword] = useState('')

  const userContext = useContext(LoginContext)
  const { userState, userDispatch } = userContext

  const handleSubmit = e => {
    e.preventDefault()
    const data = {
      nick,
      password
    }

    axios.post(postLogin(), data)
      .then(res => {
        userDispatch({
          type: 'login', value: {
            id: res.data.id,
            nick: res.data.nick,
            token: res.data.token
          }
        })
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      {userState.token && <Redirect to='/' />}
      <WithCenterContainer>
        <Col xl={4} lg={6} md={8} xs={10}>
          <Card>
            <Card.Header>
              <Card.Title>
                <h3>Login Form</h3>
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Label htmlFor='nick'>Nickname</Label>
                <FormControl id='nick' placeholder='Nick' name='nick' onChange={e => { setNick(e.target.value) }} />
                <Label htmlFor='password' className='mt-2'>Password</Label>
                <FormControl id='password' placeholder='password' type='password' name='password' onChange={e => { setPassword(e.target.value) }} />
                <Button type='submit' className='mt-2'>Login</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </WithCenterContainer>
    </>
  )
}

export default LoginView
