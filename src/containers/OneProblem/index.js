import React from 'react';
import { useParams } from 'react-router';
import { connect } from 'react-redux';

import EditMode from './Edit';
import ViewMode from './View';

import {
  getTopicAction,
  getSubtopicAction,
} from '../../redux/slices/problem';

const Index = ({
  getTopic,
  getSubtopic,
}) => {

  React.useEffect(() => {
    getTopic({});
    getSubtopic({})
  }, []);

  const { mode } = useParams();
  if (mode == 'edit' || mode == 'add') {
    return <EditMode />
  } else if (mode == 'view') {
    return <ViewMode />
  }
}

const mapStateToProps = (state) => ({

})

export default connect(
  mapStateToProps,
  {
    getTopic: getTopicAction,
    getSubtopic: getSubtopicAction,
  }
)(Index);