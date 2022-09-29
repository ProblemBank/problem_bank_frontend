import React from 'react';
import { useParams } from 'react-router-dom';

import EditMode from './Edit';
import SubmitMode from './Submit';
import ViewMode from './View';

const Index = () => {
  const { mode } = useParams();
  if (mode == 'edit' || mode == 'add') {
    return <EditMode />
  }
  if (mode.includes('view')) {
    return <ViewMode />
  }
  if (mode == 'submit') {
    return <SubmitMode />
  }
}

export default Index;