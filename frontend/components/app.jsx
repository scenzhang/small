import React from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute } from '../util/route_util';
import GreetingContainer from './greeting/greeting_container';
import LoginFormContainer from './forms/login_form_container';
import SignupFormContainer from './forms/signup_form_container';

const App = () => (
  <div>
    <header>
      <GreetingContainer />
    </header>

    <AuthRoute path="/login" component={LoginFormContainer} />
    <AuthRoute path="/signup" component={SignupFormContainer} />
  </div>
)

export default App;