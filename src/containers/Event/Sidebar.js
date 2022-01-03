import {
  Button,
  ButtonGroup,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import AreYouSure from '../../components/Dialog/AreYouSure';
import {
  addProblemGroupAction,
  editProblemGroupAction,
  getProblemGroupAction,
  removeProblemGroupAction,
} from '../../redux/slices/problemGroup';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
}));

const Event = ({
  getProblemGroup,
  addProblemGroup,
  removeProblemGroup,

  event, tabIndex, setTabIndex,
}) => {
  const classes = useStyles();
  const { eventId } = useParams();
  const [problemGroupName, setProblemGroupName] = useState();
  const [showAreYouSureDialog, setAreYouSureDialog] = useState(false);

  const doAddProblemGroup = () => {
    addProblemGroup({
      title: problemGroupName,
      event: eventId,
      problems: [],
    })
  }

  return (
    <>
      <Paper className={classes.paper}>
        <Grid container item direction="column" spacing={2}>
          {event?.role != 'participant' &&
            <>
              <Grid item>
                <Typography variant='h4'>
                  {'گروه‌مسئله‌ی جدید'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => {
                    setProblemGroupName(e.target.value);
                  }}
                  fullWidth
                  value={problemGroupName}
                  label='عنوان'
                  variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  onClick={doAddProblemGroup}
                  color='primary'
                  variant='outlined'>
                  {'ایجاد'}
                </Button>
              </Grid>
              <Grid item>
                <Divider />
              </Grid>
            </>
          }
          {event?.problem_groups.length > 0 &&
            <>
              <Grid item>
                <Typography variant='h4'>
                  {'همه‌ی گروه‌مسئله‌ها'}
                </Typography>
              </Grid>
              <Grid item>
                <ButtonGroup disableFocusRipple orientation="vertical" color="primary" fullWidth>
                  {event?.problem_groups?.map((problemGroup, index) => (
                    <Button
                      key={index}
                      onClick={() => setTabIndex(index)}
                      variant={tabIndex == index && 'contained'}>
                      {problemGroup.title}
                      {(event?.role == 'mentor' || event?.role == 'owner') &&
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
              </Grid>
            </>
          }
        </Grid>
      </Paper>
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

export default connect(
  mapStateToProps,
  {
    removeProblemGroup: removeProblemGroupAction,
    editProblemGroup: editProblemGroupAction,
    getProblemGroup: getProblemGroupAction,
    addProblemGroup: addProblemGroupAction,
  }
)(Event);
