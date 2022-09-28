import {
  Button,
  ButtonGroup,
  Divider,
  Stack,
  Paper,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import AreYouSure from '../../components/Dialog/AreYouSure';
import {
  addProblemGroupAction,
  editProblemGroupAction,
  removeProblemGroupAction,
} from '../../redux/slices/problemGroup';

const Sidebar = ({
  addProblemGroup,
  removeProblemGroup,

  event, tabIndex, setTabIndex,
}) => {
  const { eventId } = useParams();
  const [problemGroupName, setProblemGroupName] = useState('');
  const [showAreYouSureDialog, setAreYouSureDialog] = useState(false);

  const submit = () => {
    if (!problemGroupName) return;
    addProblemGroup({
      title: problemGroupName,
      event: eventId,
      problems: [],
    })
  }

  return (
    <>
      <Stack spacing={2} component={Paper} sx={{ padding: 2 }}>
        {event?.problem_groups.length > 0 &&
          <>
            <Typography variant='h4'>
              {'صندوقچه‌ها'}
            </Typography>
            <ButtonGroup disableFocusRipple orientation="vertical" color="primary" fullWidth>
              {event?.problem_groups?.map((problemGroup, index) => (
                <Button
                  key={index}
                  onClick={() => setTabIndex(index)}
                  variant={tabIndex == index ? 'contained' : 'outlined'}>
                  {problemGroup.title}
                  {event?.role == 'owner' &&
                    <IconButton
                      onClick={(e) => {
                        e.preventDefault();
                        setAreYouSureDialog(true);
                      }}
                      size='small'>
                      <ClearIcon style={{ fontSize: 15, color: 'red' }} />
                    </IconButton>
                  }
                </Button>
              ))}
            </ButtonGroup>
            <Divider />
          </>
        }
        {event?.role != 'participant' &&
          <>
            <Typography variant='h4'>
              {'صندوقچه جدید'}
            </Typography>
            <TextField
              onChange={(e) => {
                setProblemGroupName(e.target.value);
              }}
              InputProps={{
                sx: {
                  padding: 0,
                },
                endAdornment:
                  <Button
                    size='small'
                    onClick={submit}
                    color='primary'>
                    {'ایجاد'}
                  </Button>
              }}
              fullWidth
              value={problemGroupName}
              label='عنوان'
              variant="outlined" />
            <Divider />
          </>
        }
        <Button variant='contained' fullWidth>
          {'تنظیمات'}
        </Button>
      </Stack>
      <AreYouSure
        open={showAreYouSureDialog}
        handleClose={() => setAreYouSureDialog(!showAreYouSureDialog)}
        callBackFunction={() => removeProblemGroup({ problemGroupId: event.problem_groups[tabIndex].id })} />
    </>
  );
};

const mapStateToProps = (state) => ({
  event: state.event.event,
  problemGroup: state.problemGroup.problemGroup,
})

export default connect(mapStateToProps, {
  removeProblemGroup: removeProblemGroupAction,
  editProblemGroup: editProblemGroupAction,
  addProblemGroup: addProblemGroupAction,
})(Sidebar);
