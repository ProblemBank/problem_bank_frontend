import React from 'react';
import { useParams } from 'react-router';
import { connect } from 'react-redux';

import EditMode from './Edit';
import ViewMode from './View';
import SubmitMode from './submit';

import {
  getTopicAction,
  getSubtopicAction,
  getSourceAction,
} from '../../redux/slices/problem';

const Index = ({
  getTopic,
  getSubtopic,
  getSource,
}) => {

  React.useEffect(() => {
    getTopic({});
    getSubtopic({});
    getSource({});
  }, []);

  const { mode } = useParams();
  if (mode == 'edit' || mode == 'add') {
    return <EditMode />
  }
  if (mode == 'view') {
    return <ViewMode />
  }
  if (mode == 'submit') {
    return <SubmitMode />
  }
}

const mapStateToProps = (state) => ({

})

export default connect(
  mapStateToProps,
  {
    getTopic: getTopicAction,
    getSubtopic: getSubtopicAction,
    getSource: getSourceAction,
  }
)(Index);