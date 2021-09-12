// account:
export const loginUrl = 'account/login/';
export const createAccountUrl = 'account/create/';


// mentor:
export const getAllSubmittedProblemsUrl = 'problembank/jugeablesubmit/';
export const getOneSubmittedProblemUrl = ({ submitId }) => `problembank/jugeablesubmit/${submitId}/`;
export const judgeOneSubmittedProblemUrl = ({ submitId, mark }) => `game/judge/${submitId}/${mark}/`;

export const changePasswordUrl = 'account/change_pass/';
export const accountCRUDUrl = ({ userId }) =>
  userId ? `account/${userId}/` : 'account/';
export const profileCRUDUrl = ({ userId }) =>
  userId ? `profile/${userId}/` : 'profile/';

// problem:
export const problemCRUDUrl = ({ problemId }) => problemId ? `problembank/problem/${problemId}/` : 'problembank/problem/';
export const eventCRUDUrl = ({ eventId }) => eventId ? `problembank/event/${eventId}/` : 'problembank/event/';
export const problemGroupCRUDUrl = ({ problemGroupId }) => problemGroupId ? `problembank/problemgroup/${problemGroupId}/` : 'problembank/problemgroup/';

export const addProblemToGroupUrl = ({ problemId, problemGroupId }) => `problembank/addproblemtogroup/${problemId}/${problemGroupId}/`;
export const removeProblemFromGroupUrl = ({ problemId, problemGroupId }) => `problembank/removeproblemfromgroup/${problemId}/${problemGroupId}/`;
export const getProblemsByFilter = 'problembank/getproblembyfilter/'