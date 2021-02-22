import React from 'react';

import {
  Box, makeStyles
} from "@material-ui/core";

import BackButton from '../../components/BackButton';

const useStyles = makeStyles((theme) => ({
}));

export default function ClientCallPage() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <BackButton url='/client' />
    </Box>
  );
}
