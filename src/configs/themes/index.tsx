import { DirectionType } from '../../types/Global';
import MuiTheme from './MuiTheme';
import RTLMuiTheme from './RTLMuiTheme';

const selectTheme = (direction: DirectionType) => {
  if (direction === 'rtl') {
    return RTLMuiTheme;
  } else {
    return MuiTheme;
  }
};

export default selectTheme;
