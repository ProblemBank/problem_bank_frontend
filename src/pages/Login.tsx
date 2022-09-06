import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginAction } from '../redux/slices/account';
import { addNotificationAction } from '../redux/slices/notifications';
import { toEnglishNumber } from '../utils/translateNumber';
import isNumber from '../utils/validators/isNumber'

type LoginPagePropsType = {
  isFetching: boolean;
  login: any;
  addNotification: any;
  token: string;
};

const LoginPage: FC<LoginPagePropsType> = ({
  login,
  token,
  isFetching,
}) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    password: '',
    username: '',
  });

  useEffect(() => {
    if (token) {
      navigate('/dashboard/');
    }
  }, [token])

  const collectData = (event) => {
    setData({
      ...data,
      [event.target.name]: toEnglishNumber(event.target.value),
    });
  };

  const submit = () => {
    const { username, password } = data;
    if (!username || !password) {
      return;
    }
    login(data);
  };

  return (
    <Container
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Grid container item xs={12} sm={8} md={4} spacing={2}>
        <Grid style={{ height: 64, width: '100%' }}></Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Grid container>
              <Grid
                container
                item
                direction="column"
                justifyContent="center"
                spacing={2}>
                <Grid item>
                  <Typography
                    gutterBottom
                    component="h1"
                    variant="h2"
                    align="center">
                    {'ورود'}
                  </Typography>
                </Grid>
                <Grid item>
                  <TextField
                    autoComplete="on"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => {
                      if (isNumber(e.target.value)) {
                        collectData(e);
                      }
                    }}
                    value={data.username}
                    name="username"
                    label="نام کاربری"
                    inputProps={{ className: 'ltr-input' }}
                  />
                </Grid>

                <Grid item>
                  <TextField
                    autoComplete="on"
                    variant="outlined"
                    fullWidth
                    onChange={collectData}
                    label="گذرواژه"
                    name="password"
                    inputProps={{ className: 'ltr-input' }}
                    type="password"
                  />
                </Grid>
                <Grid container item direction="row" justifyContent="center">
                  <Button
                    onClick={submit}
                    variant="contained"
                    color="primary"
                    disabled={isFetching}
                    fullWidth>
                    بزن بریم
                  </Button>
                </Grid>
                <Grid item>
                  <Typography align="center">
                    {'حساب کاربری نداری؟ از '}
                    <Link to="/create-account/">{'این جا'}</Link>
                    {' یک حساب برای خودت بساز.'}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  token: state.account.token,
  isFetching: state.account.isFetching,
});

export default connect(mapStateToProps, {
  login: loginAction,
  addNotification: addNotificationAction,
})(LoginPage);