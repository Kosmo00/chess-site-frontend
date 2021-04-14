import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// chess-site pages
import PostView from './pages/PostView'
import NotFound from './pages/NotFound'

// chess-site components
import SiteNavbar from './pages/_components/SiteNavbar'

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
  props.history.push('/post/Kosmo/Mediojuego_tipico')
  return <></>
}

export default App;
