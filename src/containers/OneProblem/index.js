import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';

import {
  getAllSourcesAction,
  getAllSubtopicsAction,
  getAllTopicsAction,
} from '../../redux/slices/problem';
import EditMode from './Edit';
import SubmitMode from './submit';
import ViewMode from './View';

const Index = ({
  getAllTopics,
  getAllSubtopics,
  getAllSources,
}) => {

  // React.useEffect(() => {
  //   getAllTopics({});
  //   getAllSubtopics({});
  //   getAllSources({});
  // }, []);

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
    getAllTopics: getAllTopicsAction,
    getAllSubtopics: getAllSubtopicsAction,
    getAllSources: getAllSourcesAction,
  }
)(Index);