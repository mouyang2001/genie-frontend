import React from 'react';

import {
  Box, Grid, Typography, makeStyles,
  IconButton
} from '@material-ui/core';

import PersonIcon from '@material-ui/icons/Person';
import DashboardIcon from '@material-ui/icons/Dashboard';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#009688',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },

  textContainer: {
    margin: 0,
    padding: 0,
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',

    fontFamily: "Comfortaa",
    fontWeight: 500,
    color: 'white'
  },

  selectionContainer: {
    marginTop: theme.spacing(6)
  },

  title: {
    fontFamily: 'inherit'
  },

  subtitle: {
    textAlign: 'center'
  },

  selectionIcon: {
    width: '30px',
    margin: theme.spacing(1),
    height: 'auto',
  },

  selectionText: {
    color: 'rgba(0, 0, 0, 0.5)'
  }


}));

export default function IndexPage() {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Box className={classes.textContainer}>
        <Typography variant='h1' className={classes.title}>Genie</Typography>
        <Typography variant='body1' className={classes.subtitle}>ai powered quoting engine</Typography>

        <Grid container justify='center' align='center' className={classes.selectionContainer}>
          <Grid item xs={6}>
              <IconButton onClick={() => {setTimeout(() => (window.location = '/client'), 500)}}>
                <PersonIcon className={classes.selectionIcon} />
              </IconButton>
            <Typography className={classes.selectionText}>Client Simulator</Typography>
          </Grid>

          <Grid item xs={6}>
            <IconButton onClick={() => {setTimeout(() => (window.location = '/dashboard'), 500)}}>
              <DashboardIcon className={classes.selectionIcon} />
            </IconButton>
            <Typography className={classes.selectionText}>Dashboard</Typography>
          </Grid>
        </Grid>

      </Box>
    </Box>
  );
}
