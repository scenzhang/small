import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute } from '../util/route_util';
import NavBar from './navbar';
import LoginForm from './forms/login_form';
import SignupForm from './forms/signup_form';
import ArticleIndex from './articles/article_index';
import Article, { Response } from './articles/article';
import ArticleForm, { ResponseForm } from './articles/article_form';
import UserProfile from './users/user_profile';
const App = () => (
  <div className="app">
    <header>
      <Route path="/:route?/:id?/:mode?" component={NavBar}></Route>
    </header>

    <Route path="/login" component={LoginForm} />
    <Route path="/signup" component={SignupForm} />
    <Route path="/" exact component={ArticleIndex}></Route>
    <Switch>
      <Route path="/articles/new" component={ArticleForm} />
      <Route path="/articles/:id/edit" component={ArticleForm} />
      <Route exact path="/articles/:id" component={Article} />
    </Switch>
    <Route exact path="/responses/:id" component={Response} />
    <Route path="/responses/:id/edit" component={ResponseForm} />
    <Route path="/users/:id" component={UserProfile} />
    <Switch>
      {/* <Route exact path="/users/:id/"> */}
    </Switch>
  </div>
)

export default App;