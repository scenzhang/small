import React from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute } from '../util/route_util';
import NavBarContainer from './navbar/navbar_container';
import LoginFormContainer from './forms/login_form_container';
import SignupFormContainer from './forms/signup_form_container';
import ArticleIndex from './articles/article_index';

const App = () => (
  <div>
    <header>
      <Route path="/" component={NavBarContainer}></Route>
    </header>

    <AuthRoute path="/login" component={LoginFormContainer} />
    <AuthRoute path="/signup" component={SignupFormContainer} />
    <Route path="/" exact component={ArticleIndex}></Route>
  </div>
)

export default App;