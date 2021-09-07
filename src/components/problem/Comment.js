import React, { useState, useEffect } from 'react'
import {
  Grid,
  Header,
  Container,
  Segment,
  Label,
  Button,
  Icon,
  Image,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import {
  getUser,
} from '../../redux/actions/account';

const Comment = ({
  getUser,
  users,
  commenterId,
  text,
}) => {
  const [commenter, setCommenter] = useState('');
  const [mode, setMode] = useState('show'); // TODO: add editing mode

  useEffect(() => {
    getUser(commenterId);
  }, [getUser])

  useEffect(() => {
    if (users && users.find(users => users.id == commenterId)) {
      setCommenter(users.find(users => users.id == commenterId))
    }
  }, [users])

  return (
    <Segment textAlign='right'>
      { commenter &&
        <Grid verticalAlign='middle'>
          <Grid.Row columns={2}>
            <Grid.Column width={16}>
              <Image
                style={{ marginTop: '0px', marginBottom: '0px' }}
                floated='right'
                size='mini'
                src={`${process.env.PUBLIC_URL}/account.png`}
              >
              </Image>
              <div style={{ marginTop: '6px' }}>
                {`${commenter.first_name} ${commenter.last_name} گفته:`}
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ paddingTop: '0' }}>
            <Grid.Column>
              <b>
                {text}
              </b>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      }
    </Segment>
  );
}

const mapStateToProps = (state, ownProps) => ({
  users: state.account.users,
  commenterId: ownProps.commenterId,
  text: ownProps.text,
})

export default connect(
  mapStateToProps,
  {
    getUser,
  }
)(Comment);