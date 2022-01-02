import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AddToEvent from '../containers/AddToEvent';
import AllSubmittedProblems from '../containers/AllSubmittedAnswers';
import CreateAccount from '../containers/CreateAccount';
import Event from '../containers/Event';
import Events from '../containers/Events';
import Login from '../containers/Login';
import Problem from '../containers/OneProblem';
import CorrectSubmittedProblem from '../containers/OneSubmittedAnswer';
import ProblemSet from '../containers/ProblemSet';
import PrivateRoute from './PrivateRoute';

const Root = () => {
  return (
    <Switch>
      <PrivateRoute path="/events/add_to_event/:eventId/" component={AddToEvent} />
      <PrivateRoute path="/events/" component={Events} />

      <PrivateRoute path="/event/:eventId/" component={Event} />
      <PrivateRoute path="/submitted_answer/:submitId/" component={CorrectSubmittedProblem} />
      <PrivateRoute path="/submitted_answer/" component={AllSubmittedProblems} />
      <PrivateRoute path="/problem_set/:page/" component={ProblemSet} />
      <PrivateRoute path="/problem/:mode/:problemId?/:problemGroupId?/" component={Problem} />
      <Route path="/create_account" component={CreateAccount} />
      <Route path="/" component={Login} />
    </Switch>
  );
};
export default Root;
