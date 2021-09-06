import { Grid, IconButton, makeStyles, Tooltip } from '@material-ui/core';
import { AddCircle as AddCircleIcon } from '@material-ui/icons';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import ArticleCard from '../../components/Cards/ArticleCard';
import CreateArticleDialog from '../../components/Dialog/CreateArticleDialog';

const useStyles = makeStyles((theme) => ({
  absolute: {
    position: 'absolute',
    right: theme.spacing(2),
    zIndex: 5,
  },
  cardHolder: {
  },
}));

function Index() {
  const classes = useStyles();
  const t = useTranslate();

  const [openCreateArticleDialog, setOpenCreateArticleDialog] = useState(false);

  return (
    <>
      <Grid
        container item
        spacing={2}
        alignItems="center"
        justify="center"
        direction="row">
        <Grid item container xs={12} justify='center'>
          <Tooltip
            arrow
            title={'افزودن ویجت'}>
            <IconButton>
              <AddCircleIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <CreateArticleDialog
        open={openCreateArticleDialog}
        handleClose={() => setOpenCreateArticleDialog(false)}
      />
    </>
  );
}
const mapStateToProps = (state) => ({
});
export default connect(mapStateToProps)(Index);
