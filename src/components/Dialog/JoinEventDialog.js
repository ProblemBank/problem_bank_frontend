import { Button, Dialog, DialogActions, DialogContent, TextField } from '@mui/material';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  joinEventAction,
} from '../../redux/slices/event';

const JoinEventDialog = ({
  open,
  handleClose,
  joinEvent,
  eventId,
}) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState();

  const doJoinEvent = () => {
    joinEvent({ eventId, password }).then((response) => {
      if (response.meta.requestStatus != 'rejected') {
        setTimeout(() => navigate(`/event/${eventId}/`), 3000);
      }
    })
  }

  return (
    <Dialog maxWidth="md" open={open}
      onClose={() => {
        navigate('/events/');
        handleClose();
      }}>
      <DialogContent>
        <TextField onChange={(e) => { setPassword(e.target.value) }} fullWidth placeholder='رمز ورود' />
      </DialogContent>
      <DialogActions>
        <Button
          variant='contained' color='primary' fullWidth
          onClick={doJoinEvent} >
          {'ثبت'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default connect(null, {
  joinEvent: joinEventAction,
})(JoinEventDialog);