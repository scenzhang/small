import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute } from '../util/route_util';
import GreetingContainer from './greeting/greeting_container';
import LoginFormContainer from './forms/login_form_container';
import SignupFormContainer from './forms/signup_form_container';

const App = () => {
  return (
    <div>
      <Route path='/'>
        {/* <header>
          <GreetingContainer /> */}
        {/* </header> */}
        <div>
          <Switch>
            <AuthRoute path="/login" component={LoginFormContainer} exact />
            <AuthRoute path="/signup" component={SignupFormContainer} exact />
            <Route path='/' component={GreetingContainer} />
          </Switch>
        </div>
      </Route>
    </div >
  )
}

export default App;