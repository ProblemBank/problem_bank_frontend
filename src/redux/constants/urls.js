// account:
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


// problem:
export const problemCRUDUrl = ({ problemId }) => problemId ? `problembank/problem/${problemId}/` : 'problembank/problem/';
export const eventCRUDUrl = ({ eventId }) => eventId ? `problembank/event/${eventId}/` : 'problembank/event/';
export const problemGroupCRUDUrl = ({ problemGroupId }) => problemGroupId ? `problembank/problemgroup/${problemGroupId}/` : 'problembank/problemgroup/';


export const addProblemToGroupUrl = ({ problemId, problemGroupId }) => `problembank/addproblemtogroup/${problemId}/${problemGroupId}/`;
