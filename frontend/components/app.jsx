import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute } from '../util/route_util';
import NavBar from './navbar';
import LoginForm from './forms/login_form';
import SignupForm from './forms/signup_form';
import ArticleIndex from './articles/article_index';
import Article from './articles/article';
import ArticleForm from './articles/article_form';
const App = () => (
  <div>
    <header>
      <Route path="/" component={NavBar}></Route>
    </header>

    <AuthRoute path="/login" component={LoginForm} />
    <AuthRoute path="/signup" component={SignupForm} />
    <Route path="/" exact component={ArticleIndex}></Route>
    <Switch>
      <Route path="/articles/new" component={ArticleForm} />
      <Route exact path="/articles/:articleId" component={Article} />
    </Switch>
  </div>
)

export default App;