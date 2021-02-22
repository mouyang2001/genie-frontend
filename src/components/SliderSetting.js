import React from 'react';

import {
  Grid, Box,
  Typography, Slider
} from '@material-ui/core';


// props: title, left, right, steps, callback, value
export default function SliderSetting(props) {

  return (
    <Box>
      <Typography>{props.title}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Typography variant='body2'>{props.left}</Typography>
        </Grid>
        <Grid item xs={8}>
          <Slider min={1} max={5} value={props.value} onChange={(e, newVal) => props.callback(newVal)} />
        </Grid>
        <Grid item xs={2}>
          <Typography variant='body2'>{props.right}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
