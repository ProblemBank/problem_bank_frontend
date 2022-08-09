import React from 'react';
import { Route, Routes } from 'react-router-dom';

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
    <Routes>
      <Route path="/create_account" element={<CreateAccount />} />
      <Route path="/" element={<Login />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/events/join_event/:eventId/" element={<Events />} />
        <Route path="/events/" element={<Events />} />
        <Route path="/event/:eventId/" element={<Event />} />
        <Route path="/submitted_answer/:submitId/" element={<CorrectSubmittedProblem />} />
        <Route path="/submitted_answer/" element={<AllSubmittedProblems />} />
        <Route path="/problem_set/:page/" element={<ProblemSet />} />
        <Route path="/problem/:mode/:problemId?/:problemGroupId?/" element={<Problem />} />
      </Route>
    </Routes>
  );
};

export default Root;
