import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AllSubmittedProblems from '../containers/AllSubmittedAnswers';
import CreateAccount from '../pages/CreateAccount';
import Event from '../containers/Event';
import Events from '../containers/Events';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Problem from '../containers/OneProblem';
import CorrectSubmittedProblem from '../containers/OneSubmittedAnswer';
import ProblemSet from '../containers/ProblemSet';
import PrivateRoute from './PrivateRoute';

const Root = () => {
  return (
    <Routes>
      <Route path="/create-account/" element={<CreateAccount />} />
      <Route path="/login/" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/dashboard/" element={<Dashboard />} />
        <Route path="/events/" element={<Events />} />

        <Route path="/event/:eventId/" element={<Event />} />
        <Route path="/submitted_answer/:submitId/" element={<CorrectSubmittedProblem />} />
        <Route path="/submitted_answer/" element={<AllSubmittedProblems />} />
        <Route path="/problem_set/:page/" element={<ProblemSet />} />

        <Route path="/problem/:problemId/:mode/" element={<Problem />} />
        <Route path="/event/:eventId/problem-group/:problemGroupId/:mode/" element={<Problem />} />
        <Route path="/event/:eventId/problem-group/:problemGroupId/problem/:problemId/:mode/" element={<Problem />} />
      </Route>
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default Root;
