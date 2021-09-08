import {
  Button,
  ButtonGroup,
  Grid,
  Hidden,
  makeStyles,
  Paper,
} from '@material-ui/core';
import ClassIcon from '@material-ui/icons/Class';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupIcon from '@material-ui/icons/Group';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { Link, useParams } from 'react-router-dom';

import {
  getAllWorkshopsInfoAction,
  getEventTeamsAction,
  getOneEventInfoAction,
} from '../../redux/slices/events';
import DiscountCode from './DiscountCode';
import Info from './Info';
import Layout from './Layout';
import RegistrationReceipts from './RegistrationReceipts';
import Teams from './Teams';
import Workshops from './Workshops';

const useStyles = makeStyles((theme) => ({
  rightBox: {
    padding: theme.spacing(2),
  },
}));

const tabs = [
  {
    label: 'اطلاعات کلی',
    icon: '',
    component: Info,
  },
  // {
  //   label: 'ایجاد فرم ثبت‌نام',
  //   icon: '',
  //   component: CreateRegistrationForm,
  // },
  {
    label: 'رسیدهای ثبت‌نام',
    icon: '',
    component: RegistrationReceipts,
  },
  {
    label: 'کد تخفیف',
    icon: '',
    component: DiscountCode,
  },
  {
    label: 'تیم‌ها',
    icon: GroupIcon,
    component: Teams,
  },
  {
    label: 'کارگاه‌ها',
    icon: ClassIcon,
    component: Workshops,
  },
];

const Event = ({
  getWorkshopsInfo,
  getOneEventInfo,
  getTeams,
}) => {
  const t = useTranslate();
  const { eventId } = useParams();

  const [tabIndex, setTabIndex] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    if (eventId) {
      getOneEventInfo({ eventId });
      getTeams({ eventId });
      getWorkshopsInfo({});
    }
  }, [eventId]);

  const TabComponent = tabs[tabIndex].component;

  return (
    <Layout>
      <Grid container spacing={2} direction="row" justify="center">
        <Grid
          container
          item
          sm={3}
          xs={12}
          direction="column"
          justify="space-between">
          <Grid item>
            <ButtonGroup orientation="vertical" color="primary" fullWidth>
              {tabs.map((tab, index) => (
                <Button
                  key={index}
                  onClick={() => setTabIndex(index)}
                  variant={tabIndex == index && 'contained'}
                  startIcon={tab.icon && <tab.icon />}>
                  {tab.label}
                </Button>
              ))}
            </ButtonGroup>
          </Grid>
          <Hidden xsDown>
            <Grid item>
              <Button
                fullWidth
                color="primary"
                component={Link}
                to="/"
                startIcon={<ExitToAppIcon />}>
                {t('back')}
              </Button>
            </Grid>
          </Hidden>
        </Grid>
        <Grid item sm={9} xs={12}>
          <Paper elevation={3} className={classes.rightBox}>
            <TabComponent />
          </Paper>
        </Grid>
        <Hidden smUp>
          <Grid item>
            <Button fullWidth color="primary" startIcon={<ExitToAppIcon />}>
              {t('back')}
            </Button>
          </Grid>
        </Hidden>
      </Grid>
    </Layout>
  );
};

export default connect(null, {
  getOneEventInfo: getOneEventInfoAction,
  getWorkshopsInfo: getAllWorkshopsInfoAction,
  getTeams: getEventTeamsAction,
})(Event);
