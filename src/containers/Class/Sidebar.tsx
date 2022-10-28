import {
  Button,
  ButtonGroup,
  Divider,
  Stack,
  Paper,
  Tabs,
  Tab,
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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <>
      <Stack spacing={2} component={Paper} sx={{ padding: 2 }}>
        {event?.problem_groups.length > 0 &&
          <>
            <Typography variant='h4'>
              {'صندوقچه‌ها'}
            </Typography>
            <Tabs variant='fullWidth' value={tabIndex} onChange={handleChange} orientation="vertical">
              {event?.problem_groups?.map((problemGroup, index) =>
                <Tab key={index} label={problemGroup.title} />)}
              {/* // <Stack direction='row'>
                //   {event?.role == 'owner' &&
                //     <IconButton
                //       onClick={(e) => {
                //         e.preventDefault();
                //         setAreYouSureDialog(true);
                //       }}
                //       size='small'>
                //       <ClearIcon style={{ fontSize: 15, color: 'red' }} />
                //     </IconButton>
                //   }
                // </Stack> */}
            </Tabs>
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
