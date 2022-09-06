// account:
export const loginUrl = 'account/login/';
export const createAccountUrl = 'account/create/';
export const refreshTokenUrl = 'accounts/login/refresh/';

// mentor:
export const getAllSubmittedProblemsUrl = 'problembank/getsubmits/';
export const getOneSubmittedProblemUrl = ({ submitId }) => `problembank/jugeablesubmit/${submitId}/`;

export const judgeOneSubmittedProblemUrl = ({ submitId, mark }) => `problembank/judge/${submitId}/${mark}/`;

// problem:
export const problemCRUDUrl = ({ problemId }) => problemId ? `problembank/problem/${problemId}/` : 'problembank/problem/';
export const eventCRUDUrl = ({ eventId }) => eventId ? `problembank/event/${eventId}/` : 'problembank/event/';
export const getOneEventUrl = ({ eventId }) => `problembank/event/${eventId}/`;
export const problemGroupCRUDUrl = ({ problemGroupId }) => problemGroupId ? `problembank/problemgroup/${problemGroupId}/` : 'problembank/problemgroup/';

export const addProblemToGroupUrl = ({ problemId, problemGroupId }) => `problembank/addproblemtogroup/${problemId}/${problemGroupId}/`;
export const copyProblemToGroup = ({ problemId, problemGroupId }) => `problembank/copyproblemtogroup/${problemId}/${problemGroupId}/`;
export const removeProblemFromGroupUrl = ({ problemId, problemGroupId }) => `problembank/removeproblemfromgroup/${problemId}/${problemGroupId}/`;
export const getProblemsByFilter = 'problembank/getproblembyfilter/ '
export const submitAnswerUrl = ({ problemId, problemGroupId }) => `problembank/submit/${problemId}/${problemGroupId}/`;

// properties:
export const topicCRUDUrl = ({ topicId }) => topicId ? `problembank/topic/${topicId}/` : 'problembank/topic/';
export const subtopicCRUDUrl = ({ subtopicId }) => subtopicId ? `problembank/subtopic/${subtopicId}/` : 'problembank/subtopic/';
export const sourceCRUDUrl = ({ sourceId }) => sourceId ? `problembank/source/${sourceId}/` : 'problembank/source/';

// event:
export const eventUrl = 'problembank/event/';
export const getEventsUrl = 'problembank/get_events/';
export const getAllMyEventUrl = 'problembank/getevents/';
export const joinEventUrl = ({ eventId }) => `problembank/add_to_event/${eventId}/`;
