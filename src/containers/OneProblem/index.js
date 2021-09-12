import React from 'react';
import { useParams } from 'react-router';

import EditMode from './Edit';
import ViewMode from './View';

const Index = () => {
  const { mode } = useParams();
  if (mode == 'edit' || mode == 'add') {
    return <EditMode />
  } else if (mode == 'view') {
    return <ViewMode />
  }
}

export default Index;