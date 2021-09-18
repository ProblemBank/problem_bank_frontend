import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AllSubmittedProblems from '../containers/AllSubmittedProblems';
import CreateAccount from '../containers/CreateAccount';
import Event from '../containers/Event';
import Login from '../containers/Login';
import Problem from '../containers/OneProblem';
import ProblemSet from '../containers/ProblemSet';
import CorrectSubmittedProblem from '../containers/SubmitAnswer';
import PrivateRoute from './PrivateRoute';

const Root = () => {
  return (
    <Switch>
      <PrivateRoute path="/answer/:submitId/" component={CorrectSubmittedProblem} />
      <PrivateRoute path="/answer/" component={AllSubmittedProblems} />
      <PrivateRoute path="/problem_set/:page/" component={ProblemSet} />
      <PrivateRoute path="/problem/:mode/problem_group/:problemGroupId/" component={Problem} />
      <PrivateRoute path="/problem/:mode/:problemId?/" component={Problem} />
      <PrivateRoute path="/event/:eventId/" component={Event} />
      <Route path="/create_account" component={CreateAccount} />
      <Route path="/" component={Login} />
    </Switch>
  );
};
export default Root;
