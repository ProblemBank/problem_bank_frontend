import { Button, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import {
  createAccountAction,
} from '../../redux/slices/account';
import { addNotificationAction } from '../../redux/slices/notifications';
import { toEnglishNumber } from '../../utils/translateNumber';

const InputFields = ({
  isFetching,
  createAccount,
  addNotification,
  token,
}) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    phone_number: '',
    password: '',
    confirmationPassword: '',
    first_name: '',
    last_name: '',
  });

  if (token) {
    return navigate("/events/");
  }

  const putData = (event) => {
    setData({
      ...data,
      [event.target.name]: toEnglishNumber(event.target.value),
    });
  };

  const isJustDigits = (number) => {
    var regex = new RegExp(`\\d{${number.length}}`);
    if (regex.test(toEnglishNumber(number))) {
      return true;
    } else {
      return false;
    }
  };

  const isPhoneNumberValid = (phoneNumber) => {
    var regex = new RegExp('^(\\+98|0)?9\\d{9}$');
    if (regex.test(phoneNumber)) {
      return true;
    } else {
      return false;
    }
  };

  const doRegistration = () => {
    const { phone_number, password, confirmationPassword, first_name, last_name } = data;
    if (!phone_number || !password || !confirmationPassword || !first_name || !last_name) {
      addNotification({
        message: 'لطفاً همه‌ی مواردی که ازت خواسته شده رو پر کن!',
        type: 'error',
      });
      return;
    }

    if (!isPhoneNumberValid(phone_number)) {
      addNotification({
        message: 'شماره تلفن همراهی که وارد کردی معتبر نیست.',
        type: 'error',
      });
      return;
    }

    if (password !== confirmationPassword) {
      addNotification({
        message: 'رمزهایی که وارد کردی مشابه هم نیستند.',
        type: 'error',
      });
      return;
    }

    createAccount({ ...data, username: data.phone_number });
  };

  return (
    <>
      <Grid item>
        <TextField
          variant="outlined"
          fullWidth
          onChange={(e) => {
            if (isJustDigits(e.target.value)) {
              putData(e);
            }
          }}
          value={data.phone_number}
          name="phone_number"
          label="شماره تلفن همراه"
          inputProps={{ className: 'ltr-input' }}
          type="tel"
        />
      </Grid>

      <Grid item>
        <TextField
          variant="outlined"
          fullWidth
          onChange={putData}
          label="گذرواژه"
          name="password"
          inputProps={{ className: 'ltr-input' }}
          type="password"
        />
      </Grid>

      <Grid item>
        <TextField
          variant="outlined"
          fullWidth
          onChange={putData}
          label="تکرار گذرواژه"
          type="password"
          inputProps={{ className: 'ltr-input' }}
          name="confirmationPassword"
        />
      </Grid>

      <Grid item>
        <TextField
          variant="outlined"
          fullWidth
          onChange={putData}
          value={data.first_name}
          name="first_name"
          label="نام"
        />
      </Grid>

      <Grid item>
        <TextField
          variant="outlined"
          fullWidth
          onChange={putData}
          value={data.last_name}
          name="last_name"
          label="نام خانوادگی"
        />
      </Grid>

      <Grid container item direction="row" justifyContent="center">
        <Button
          onClick={doRegistration}
          variant="contained"
          color="primary"
          disabled={isFetching}
          fullWidth>
          ثبت
        </Button>
      </Grid>

      <Grid item>
        <Typography align="center">
          {' اگه از قبل حساب داشتی، می‌تونی از '}
          <Link to="/login">{'این‌جا'}</Link>
          {' وارد بشی.'}
        </Typography>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => ({
  token: state.account.token,
  isFetching: state.account.isFetching,
});

export default connect(mapStateToProps, {
  createAccount: createAccountAction,
  addNotification: addNotificationAction,
})(InputFields);
