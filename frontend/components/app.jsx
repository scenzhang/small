import React from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute } from '../util/route_util';
import NavBar from './navbar';
import LoginForm from './forms/login_form';
import SignupForm from './forms/signup_form';
import ArticleIndex from './articles/article_index';
import Article from './articles/article';
const App = () => (
  <div>
    <header>
      <Route path="/" component={NavBar}></Route>
    </header>

    <AuthRoute path="/login" component={LoginForm} />
    <AuthRoute path="/signup" component={SignupForm} />
    <Route path="/" exact component={ArticleIndex}></Route>
    <Route path="/articles/:articleId" component={Article}/ >
  </div>
)

export default App;