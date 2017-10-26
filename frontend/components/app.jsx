import React from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute } from '../util/route_util';
import NavBarContainer from './navbar/navbar_container';
import LoginForm from './forms/login_form';
import SignupForm from './forms/signup_form';
import ArticleIndex from './articles/article_index';

const App = () => (
  <div>
    <header>
      <Route path="/" component={NavBarContainer}></Route>
    </header>

    <AuthRoute path="/login" component={LoginForm} />
    <AuthRoute path="/signup" component={SignupForm} />
    <Route path="/" exact component={ArticleIndex}></Route>
  </div>
)

export default App;