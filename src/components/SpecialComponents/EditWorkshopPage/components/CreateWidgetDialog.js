import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import WIDGET_TYPES from '../../../Widget/WidgetTypes';

export default function CreateWidgetDialog({ open, handleClose, stateId }) {
  const [type, setType] = useState('');
  const t = useTranslate();

  if (type) {
    const { WidgetEditDialog } = WIDGET_TYPES[type];
    return (
      <WidgetEditDialog
        stateId={stateId}
        open={open}
        handleClose={() => {
          setType('');
          handleClose();
        }}
      />
    );
  }

  return (
    <Dialog open={open} maxWidth='sm' onClose={handleClose}>
      <DialogTitle>{t('createWidget')}</DialogTitle>
      <DialogContent>
        <FormControl size='small' fullWidth style={{ width: '200px' }} variant="outlined">
          <InputLabel>{t('widgetType')}</InputLabel>
          <Select
            onChange={(e) => setType(e.target.value)}
            name='fsmId'
            label={t('widgetType')}>
            {Object.keys(WIDGET_TYPES).map((option, index) => (
              <MenuItem key={index} value={option}>
                {WIDGET_TYPES[option].label}
              </MenuItem>
            ))}
          </Select>
        </FormControl >
      </DialogContent>
      <DialogActions>

      </DialogActions>
    </Dialog>
  );
}
