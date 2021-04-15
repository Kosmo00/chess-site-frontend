import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// chess-site pages
import PostView from './pages/PostView'
import NotFound from './pages/NotFound'
import AllPostView from './pages/AllPostView'

// chess-site components
import SiteNavbar from './pages/_components/SiteNavbar'

const App = () => {
  return (
    <>
      <SiteNavbar />
      <div id='main' className='mt-5'>
        <BrowserRouter>
          <Switch>
            <Route exact path='/post/:username/:post_title' component={PostView} />
            <Route exact path='/' component={RedirectToPost} />
            <Route exact path='/posts' component={AllPostView} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>

    </>
  );
}

const RedirectToPost = props => {
  props.history.push('/posts')
  return <></>
}

export default App;
