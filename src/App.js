import React, { useReducer, useContext, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

// chess-site pages
import PostView from './pages/PostView'
import NotFound from './pages/NotFound'
import AllPostView from './pages/AllPostView'
import LoginView from './pages/LoginView'
import RegisterView from './pages/RegisterView'

// chess-site components
import SiteNavbar from './pages/_components/SiteNavbar'

export const LoginContext = React.createContext()

let initialUser = {
  id: null,
  nick: null,
  token: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return state = action.value
    case 'logout':
      return state = initialUser
    default:
      return state
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialUser)
  return (
    <LoginContext.Provider value={{ userState: state, userDispatch: dispatch }}>
      <BrowserRouter>
        <SiteNavbar />
        <Switch>
          <Route exact path='/post/:username/:post_title' component={PostView} />
          <Route exact path='/' component={RedirectToPost} />
          <Route exact path='/posts' component={AllPostView} />
          <Route exact path='/login' component={LoginView} />
          <Route exact path='/register' component={RegisterView} />
          <Route exact path='/logout' component={Logout} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </LoginContext.Provider>
  );
}

const RedirectToPost = () => {
  return <Redirect to='/posts' />
}

const Logout = () => {
  const userContext = useContext(LoginContext)
  const { userState, userDispatch } = userContext

  useEffect(() => {
    userDispatch({ type: 'logout' })
  }, [userDispatch])

  return (
    <>
      {!userState.token && <Redirect to='/' />}
    </>
  )
}

export default App;
