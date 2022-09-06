import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import {
  joinEventAction,
  createEventAction,
} from '../../../redux/slices/event';

function CreateEventDialog({
  open,
  handleClose,

  createEvent,
}) {
  const [title, setTitle] = useState<string>(null);
  const submit = () => {
    createEvent({ title }).then((response) => {
      if (response.meta.requestStatus == 'fulfilled') {
        handleClose();
        setTitle(null);
      }
    });;
  }

  return (
    <Dialog maxWidth="md" open={open} onClose={handleClose}>
      <DialogTitle>
        {'ایجاد کلاس جدید'}
      </DialogTitle>
      <DialogContent>
        <TextField value={title} onChange={(e) => setTitle(e.target.value)} fullWidth placeholder='نام' />
      </DialogContent>
      <DialogActions>
        <Button variant='contained' color='primary' onClick={submit} >
          {'ثبت'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}


export default connect(null, {
  createEvent: createEventAction,
})(CreateEventDialog);