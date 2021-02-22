import React from 'react';

//Core
import {
  Box, Typography, Zoom,
  makeStyles, IconButton, Tooltip
} from '@material-ui/core';

//Icons
import ChatIcon from "@material-ui/icons/Chat";
import CallIcon from "@material-ui/icons/Call";
import BallotIcon from "@material-ui/icons/Ballot";

import BackButton from '../../components/BackButton';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexFlow: 'column',
    justify: 'center',
    alignItems: 'space-around',
    height: '100vh',
  },

  containerFill: {
    flexGrow: 1
  },

  title: {
    flexGrow: 1,
    margin: 24,
    fontSize: 36,
    color: "#009688",
    fontWeight: 500,
  },

  menuTitle: {
    fontSize: 36,
    color: "#009688",
    fontWeight: 420,
    textAlign: "center",
  },

  menuContainer: {
    textAlign: "center",
  },

  iconButton: {
    borderRadius: "1000px",
    backgroundColor: "#009688",

    '&:hover': {
      backgroundColor: '#15AA9C'
    },

    margin: 50,
  },

  icon: {
    fontSize: 80,
    color: "white",
  },
}));

export default function ClientPage() {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <BackButton url='/' />
      <Box className={classes.containerFill}></Box>
      <Typography variant='h5' align='center'>Select Input Simulator</Typography>
      <div className={classes.menuContainer}>
        <a href="/client/chat">
          <Tooltip title='Backwards Compatible Chat' TransitionComponent={Zoom}>
            <IconButton
              className={classes.iconButton}
              aria-label="ChatIcon"
            >
              <ChatIcon className={classes.icon} />
            </IconButton>
          </Tooltip>

        </a>
        <a href="/client/form">
          <Tooltip title='New AI Chatbot' TransitionComponent={Zoom}>

            <IconButton
              className={classes.iconButton}
              aria-label="FormIcon"
            >
              <BallotIcon className={classes.icon} />
            </IconButton>
          </Tooltip>
        </a>

        <a href="/client/call">
          <Tooltip title='New Voice Integrations' TransitionComponent={Zoom}>

            <IconButton
              className={classes.iconButton}
              aria-label="CallIcon"
            >
              <CallIcon className={classes.icon} />
            </IconButton>
          </Tooltip>
        </a>
      </div>

      <Box className={classes.containerFill}>

      </Box>
    </Box>
  );
}
