import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { DirectionType } from '../types/Global';

const createEmotionCache = (direction: DirectionType) => {
  if (direction === 'rtl') {
    return createCache({ key: 'muirtl', stylisPlugins: [prefixer, rtlPlugin] });
  } else {
    return null;
  }
};

export default createEmotionCache;
