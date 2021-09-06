// auth:
export const loginUrl = 'auth/accounts/login/';
export const changePasswordUrl = 'auth/accounts/change_pass/';
export const verificationCodeUrl = 'auth/accounts/verification_code/';
export const accountCRUDUrl = ({ userId }) =>
  userId ? `auth/accounts/${userId}/` : 'auth/accounts/';
export const profileCRUDUrl = ({ userId }) =>
  userId ? `auth/profile/${userId}/` : 'auth/profile/';
export const studentshipCRUDUrl = ({ userId }) =>
  userId ? `auth/studentship/${userId}/` : 'auth/studentship/';
export const discountCRUDUrl = ({ discountCodeId }) =>
  discountCodeId
    ? `auth/discount_code/${discountCodeId}/`
    : 'auth/discount_code/';
export const merchandiseDiscountCodeUrl = ({ merchandiseId }) =>
  `/auth/merchandise/${merchandiseId}/discount_codes/`;

// team:
export const getTeamsUrl = '/fsm/team/'; //todo: get team per registration form
export const makeTeamHeadUrl = ({ teamId }) => `/fsm/team/${teamId}/make_team_head/`;

// event:
export const addMentorToWorkshopUrl = ({ fsmId }) =>
  `/fsm/fsm/${fsmId}/add_mentor/`;
export const getMentoredFsmsUrl = ({ eventId }) =>
  `/fsm/event/${eventId}/get_mentored_fsms/`;

// workshop:
export const workshopCRUDUrl = ({ fsmId }) =>
  fsmId ? `/fsm/fsm/${fsmId}/` : '/fsm/fsm/';
export const getAllWorkshopStatesInfoUrl = ({ fsmId }) =>
  `/fsm/fsm/${fsmId}/get_states/`;
export const getAllWorkshopEdges = ({ fsmId }) =>
  `/fsm/fsm/${fsmId}/get_edges/`;

// state:
export const stateCRUDUrl = ({ stateId }) =>
  stateId ? `/fsm/state/${stateId}/` : '/fsm/state/';
export const edgeUrl = ({ edgeId }) =>
  edgeId ? `/fsm/edge/${edgeId}/` : '/fsm/edge/';

// widget:
export const widgetCRUDUrl = ({ widgetId }) =>
  widgetId ? `fsm/widget/${widgetId}/` : 'fsm/widget/';
export const statesCRUDUrl = ({ stateId }) =>
  stateId ? `fsm/state/${stateId}/` : 'fsm/state/';

// fsm:
export const eventInfoUrl = ({ eventId }) =>
  eventId ? `fsm/event/${eventId}/` : 'fsm/event/';
export const allRegistrationReceiptsUrl = ({ registrationFormId }) =>
  `fsm/registration/${registrationFormId}/receipts/`;
export const oneRegistrationReceiptUrl = ({ registrationReceiptId }) =>
  `fsm/receipts/${registrationReceiptId}/`;
export const validateRegistrationReceiptUrl = ({ registrationReceiptId }) =>
  `/fsm/receipts/${registrationReceiptId}/validate/`;
export const getPlayerFromTeamUrl = ({ id }) =>
  `/fsm/fsm/${id}/get_player_from_team/`;

export const getUnreadNotificationsUrl = 'notifications/api/unread_list/';

export const articlesUrl = 'fsm/article/';

export const helpUrl = 'fsm/help/';

export const workshopTeamsUrl = 'fsm/workshopplayers/';

export const goBackwardUrl = 'fsm/gobackward/';

export const goForwardUrl = 'fsm/goforward/';

export const participantGetCurrentStateUrl = 'fsm/getcurrentstate/';

export const mentorGetCurrentStateUrl = 'fsm/mentorgetplayerstate/';

export const visitWorkshopPlayerUrl = 'fsm/visitteam/';

export const sendAnswerUrl = 'fsm/sendanswer/';

export const startWorkshopUrl = 'fsm/startWorkshop/';

export const requestMentorUrl = 'fsm/requestmentor/';

export const getEventRegistrationInfoUrl = 'auth/registration-info/';

export const paymentRequestUrl = 'auth/pay/';

export const applyDiscountUrl = 'auth/verify-discount/';

export const getScoresUrl = 'fsm/getscores/';

export const getProblemsUrl = 'fsm/getproblems/';

export const getSubmissionsUrl = 'fsm/getsubmissions/';

export const markSubmissionUrl = 'fsm/marksubmission/';

export const getWorkshopsDescriptionUrl = 'fsm/getworkshopsdescription/';
