import React from 'react';

import {
  IconButton, makeStyles, Tooltip
} from '@material-ui/core';

import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme) => ({

  backButton: {
    position: 'fixed',
    left: 20,
    bottom: 10,
    color: "#009688",
    zIndex: 10
  }

}));

export default function BackButton(props) {
  const classes = useStyles();

  return (
    <a href={props.url}>
      <Tooltip title='Back' placement='right'>
        <IconButton
          edge="start"
          className={classes.backButton}
          color="inherit"
          aria-label="back"
        >
          <ArrowBackIcon />
        </IconButton>
      </Tooltip>
    </a>
  );
}
