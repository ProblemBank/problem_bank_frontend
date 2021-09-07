import React, { useState, useEffect } from 'react'

import {
  Grid,
  Header,
  Container,
  Segment,
  Label,
  Button,
  Icon,
  TextArea,
  Form,
} from 'semantic-ui-react';
import {
  createComment
} from '../../redux/actions/problem'
import { connect } from 'react-redux';

const CreateComment = ({
  createComment,
  id,
}) => {
  const [text, setText] = useState('');
  const [isLoading, setLoadingStatus] = useState(false);

  return (
    <Form
      style={{ textAlign: 'left' }}
      onSubmit={async () => {
        await createComment(text, id);
        window.location.reload();
        setLoadingStatus(true);
      }}>
      <TextArea
        onChange={(e) => setText(e.target.value)}
        placeholder='تو هم نظرت رو راجع به این مسئله بگو!' />
      <Button
        disabled={!text}
        loading={isLoading}
        positive
        style={{ marginTop: '10px' }}>
        ارسال
      </Button>
    </Form>
  );
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps;
  return ({
    id
  })
};


export default connect(
  mapStateToProps,
  {
    createComment
  }
)(CreateComment);