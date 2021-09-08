import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Event from '../containers/Event';
import Login from '../containers/Login';
import Problem from '../containers/Problem';
import ProblemSet from '../containers/ProblemSet';

const Root = () => {
  return (
    <Switch>
      <Route path="/problem_set/:page/" component={ProblemSet} />
      <Route path="/problem/:mode/problem_group/:problemGroupId/" component={Problem} />
      <Route path="/problem/:mode/:problemId?/" component={Problem} />
      <Route path="/event/:eventId/" component={Event} />
      <Route path="/" component={Login}></Route>
    </Switch>
  );
};
export default Root;
