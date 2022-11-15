import {
  Button,
  FormControl,
  InputLabel,
  FormLabel,
  MenuItem,
  RadioGroup,
  Select,
  FormControlLabel,
  Radio,
  Typography,
  Stack,
} from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getEventsAction,
} from '../../redux/slices/event';
import {
  addProblemToGroupAction,
  copyProblemToGroupAction,
} from '../../redux/slices/problem';
import { EventType } from '../../types/Models';

type AddProblemToProblemGroupPropsType = {
  getEvents: any;
  copyProblemToGroup: any;
  addProblemToGroup: any;
  events: EventType[];
}

const AddProblemToProblemGroup: FC<AddProblemToProblemGroupPropsType> = ({
  getEvents,
  copyProblemToGroup,
  addProblemToGroup,
  events,
}) => {
  const { problemId } = useParams();
  const [selectedProblemGroupId, setSelectedProblemGroupId] = useState<number>(null);
  const [selectedCopyType, setSelectCopyType] = useState('add');
  const [problemGroups, setProblemGroups] = useState([]);

  useEffect(() => {
    getEvents();
  }, []);

  const accessibleEvents = events.filter((event) => event.role == 'mentor' || event.role == 'owner')

  const doCopyProblemToGroup = () => {
    if (!selectedCopyType || !selectedProblemGroupId) {
      return;
    }
    if (selectedCopyType == 'add') {
      addProblemToGroup({
        problemId,
        problemGroupId: selectedProblemGroupId,
      })
    } else if (selectedCopyType == 'copy') {
      copyProblemToGroup({
        problemId,
        problemGroupId: selectedProblemGroupId,
      })
    }
  }

  return (
    <Stack spacing={2}>
      <Typography gutterBottom variant='h3'>{'افزودن به صندوقچه'}</Typography>
      <FormControl variant="outlined" fullWidth>
        <InputLabel>کلاس</InputLabel>
        <Select
          onChange={(e) => setProblemGroups(events.filter((event) => event.id == e.target.value)?.[0]?.problem_groups)}
          label='کلاس'>
          {accessibleEvents.map((event) => (
            <MenuItem key={event.id} value={event.id}>
              {event.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl >

      <FormControl disabled={problemGroups?.length == 0 ? true : false} variant="outlined" fullWidth>
        <InputLabel>صندوقچه</InputLabel>
        <Select
          onChange={(e) => setSelectedProblemGroupId(e.target.value as number)}
          label='صندوقچه'>
          {problemGroups?.map((problemGroup) => (
            <MenuItem key={problemGroup.id} value={problemGroup.id}>
              {problemGroup.title}
            </MenuItem>

          ))}
        </Select>
      </FormControl >

      <FormControl fullWidth>
        <FormLabel>نوع عملیات</FormLabel>
        <RadioGroup row value={selectedCopyType} onChange={(e) => setSelectCopyType(e.target.value)}>
          <FormControlLabel value="add" control={<Radio />} label="اضافه‌کردن" />
          <FormControlLabel value="copy" control={<Radio />} label="کپی‌کردن" />
        </RadioGroup>
      </FormControl>

      <Button onClick={doCopyProblemToGroup} fullWidth variant='outlined'>
        {'ثبت'}
      </Button>
    </Stack>
  );
}

const mapStateToProps = (state) => ({
  events: state.event.events,
});

export default connect(mapStateToProps, {
  getEvents: getEventsAction,
  copyProblemToGroup: copyProblemToGroupAction,
  addProblemToGroup: addProblemToGroupAction,
})(AddProblemToProblemGroup);