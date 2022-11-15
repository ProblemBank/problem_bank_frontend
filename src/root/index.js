import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AllSubmittedProblems from '../containers/AllSubmittedAnswers';
import CreateAccount from '../pages/CreateAccount';
import Class from '../containers/Class';
import Classes from '../pages/Classes';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Problem from '../containers/Problem';
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
        <Route path="/problemset/:page/" element={<ProblemSet />} />
        <Route path="/dashboard/" element={<Dashboard />} />
        <Route path="/events/" element={<Classes />} />

        <Route path="/event/:eventId/" element={<Class />} />
        <Route path="/submitted-answers/:submitId/" element={<CorrectSubmittedProblem />} />
        <Route path="/submitted-answers/" element={<AllSubmittedProblems />} />

        <Route path="/problem/:problemId/:mode/" element={<Problem />} />
        <Route path="/event/:eventId/problem-group/:problemGroupId/:mode/" element={<Problem />} />
        <Route path="/event/:eventId/problem-group/:problemGroupId/problem/:problemId/:mode/" element={<Problem />} />
      </Route>
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default Root;
