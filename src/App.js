import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// chess-site pages
import PostView from './pages/PostView'
import NotFound from './pages/NotFound'

// chess-site components
import SiteNavbar from './pages/components/SiteNavbar'

const App = () => {
  return (
    <>
      <SiteNavbar />
      <BrowserRouter>
        <Switch>
          <Route exact path='/post/:username/:post_title' component={PostView} />
          <Route exact path='/' component={RedirectToPost} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

const RedirectToPost = props => {
  props.history.push('/posts')
  return <></>
}

export default App;
