import { updateToken } from '../../configs/axios';
import createStore from './createStore';

const removeOldJsonData = (delta, data = {}) => {
  for (const key in data) {
    if (Date.now() > data[key].lastUpdate + delta) {
      delete data[key];
    }
  }
};

const persistedState = localStorage.getItem('ProblemBankState')
  ? JSON.parse(localStorage.getItem('ProblemBankState'))
  : {};

removeOldJsonData(108000000, persistedState?.mentor?.teams);

// persistedState.mentor = {
//   ...mentorInitialState,
//   ...persistedState.mentor,
// };

const reduxStore = createStore(persistedState);

reduxStore.subscribe(() => {
  const state = reduxStore.getState();
  localStorage.setItem(
    'ProblemBankState',
    JSON.stringify({
      account: state.account,
      Intl: state.Intl,
    })
  );
  updateToken({ token: state.account.token });
});

export default reduxStore;
