import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// chess-site components
import PostView from './pages/PostView'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/post' component={PostView} />
        <Route exact path='/' component={RedirectToPost} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>

  );
}

const RedirectToPost = props => {
  props.history.push('/post')
  return <></>
}

export default App;
