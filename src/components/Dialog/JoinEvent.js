import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  makeStyles,
  TextField,
} from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import {
  joinEventAction,
} from '../../redux/slices/event';

const useStyles = makeStyles((theme) => ({

}));

function Index({
  open,
  joinEvent,
  eventId,
}) {
  const classes = useStyles();
  const history = useHistory();
  const [password, setPassword] = useState();
  const [showEnterButton, setShowEnterButton] = useState(false);

  const doJoinEvent = () => {
    joinEvent({ eventId, password }).then((response) => {
      if (response.meta.requestStatus != 'rejected') {
        setShowEnterButton(true);
      }
    })
  }

  return (
    <Dialog maxWidth="md" open={open} onClose={() => history.push('/events/')}  >
      <DialogContent>
        <TextField onChange={(e) => { setPassword(e.target.value) }} fullWidth placeholder='رمز ورود' />
      </DialogContent>
      <DialogActions>
        {!showEnterButton &&
          <Button
            variant='contained' color='primary' fullWidth
            onClick={doJoinEvent} >
            {'ثبت'}
          </Button>
        }
        {showEnterButton &&
          <Button
            component={Link}
            to={`/event/${eventId}/`}
            variant='contained' color='primary' fullWidth>
            {'ورود'}
          </Button>
        }
      </DialogActions>
    </Dialog>
  );
}


export default connect(
  null,
  {
    joinEvent: joinEventAction,
  }
)(Index);