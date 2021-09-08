import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Event from '../containers/Event';
import Login from '../containers/Login';
import Problem from '../containers/Problem';
import ProblemSet from '../containers/ProblemSet';
import PrivateRoute from './PrivateRoute';

const Root = () => {
  return (
    <Switch>
      <PrivateRoute path="/problem_set/:page/" component={ProblemSet} />
      <PrivateRoute path="/problem/:mode/problem_group/:problemGroupId/" component={Problem} />
      <PrivateRoute path="/problem/:mode/:problemId?/" component={Problem} />
      <PrivateRoute path="/event/:eventId/" component={Event} />
      <Route path="/" component={Login}></Route>
    </Switch>
  );
};
export default Root;
