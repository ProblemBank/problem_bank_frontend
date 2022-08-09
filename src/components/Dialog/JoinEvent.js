import { Button, Dialog, DialogActions, DialogContent, TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
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
    <Dialog maxWidth="md" open={open} onClose={() => navigate('/events/')}  >
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