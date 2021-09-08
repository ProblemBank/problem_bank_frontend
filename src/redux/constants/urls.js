// account:
export const loginUrl = 'account/login/';
export const createAccountUrl = 'account/create/';


export const changePasswordUrl = 'account/change_pass/';
export const verificationCodeUrl = 'account/verification_code/';
export const accountCRUDUrl = ({ userId }) =>
  userId ? `account/${userId}/` : 'account/';
export const profileCRUDUrl = ({ userId }) =>
  userId ? `profile/${userId}/` : 'profile/';
export const studentshipCRUDUrl = ({ userId }) =>
  userId ? `studentship/${userId}/` : 'studentship/';
export const discountCRUDUrl = ({ discountCodeId }) =>
  discountCodeId
    ? `discount_code/${discountCodeId}/`
    : 'discount_code/';
export const merchandiseDiscountCodeUrl = ({ merchandiseId }) =>
  `/merchandise/${merchandiseId}/discount_codes/`;


// problem:
export const problemCRUDUrl = ({ problemId }) => problemId ? `problembank/problem/${problemId}/` : 'problembank/problem/';
export const eventCRUDUrl = ({ eventId }) => eventId ? `problembank/event/${eventId}/` : 'problembank/event/';
export const problemGroupCRUDUrl = ({ problemGroupId }) => problemGroupId ? `problembank/problemgroup/${problemGroupId}/` : 'problembank/problemgroup/';


export const addProblemToGroupUrl = ({ problemId, problemGroupId }) => `problembank/addproblemtogroup/${problemId}/${problemGroupId}/`;
export const removeProblemFromGroupUrl = ({ problemId, problemGroupId }) => `problembank/removeproblemfromgroup/${problemId}/${problemGroupId}/`;
