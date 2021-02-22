import React, { useState } from 'react';

import {
  Box, TextField, makeStyles, Paper, Button, Grid, Typography, IconButton,
  Accordion, AccordionSummary, AccordionDetails, Tooltip, Snackbar
} from "@material-ui/core";


import BackButton from '../../components/BackButton';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'column',
    height: '100vh',
    textAlign: 'center'
  },

  containerFill: {
    flexGrow: 1,
    minHeight: 100
  },

  container: {
    margin: 'auto',
    width: 550,
    [theme.breakpoints.only('xs')]: {
      width: '100%'
    }
  },

  gridContainer: {
    padding: theme.spacing(4)
  },

  inputField: {
    background: '#f5f5f5',
    width: '100%',
    padding: theme.spacing(2),
    '& *': {
      fontSize: '1em',
    },
  },

  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  keyTitle: {
    fontSize: '0.7em',
    fontWeight: 500
  },

  summaryTitle: {
    fontSize: '1em'
  },

  accordion: {
    backgroundColor: '#f5f5f5',
  },

  responseTitle: {
    marginBottom: theme.spacing(2)
  }

}));

export default function ClientFormPage() {
  const classes = useStyles();

  const [text, setText] = useState('');
  const [entities, setEntities] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [expandResult, setExpandResult] = useState(false);

  const [popup, setPopup] = useState(0);
  const [popupMessage, setPopupMessage] = useState('Sent!');

  const generateAutoText = () => {
    setText(
      'Hey there, my name is John Smith and I\'m looking to book a wedding videographer for 25 July 2020. My wedding is going to be held at Markovina Estate in Kumeu, Auckland. I\'m really just looking for roughly 5 hours of coverage and ideally I\'d like to have 2 videographers present to make sure that everything is covered. My email is jsmith@gmail.com'
    );
  }

  const handleSave = () => {
    const reqOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: text
      })
    }

    if (text == '') {
      setPopupMessage('Enter some text!')
      setPopup(1);

      return 1;
    } else {
      setPopupMessage('Sent!')
      setPopup(1);
    }


    fetch(
      "https://genie-app-backend.herokuapp.com/api/inputs/form-aibot",
      reqOptions
    ).then(async (res) => {
      const data = await res.json();

      if (data.statusCode) return true;

      setEntities(data.entities);
      setKeywords(data.keywords);
      setExpandResult(true);
    });
  };
  return (
    <Box className={classes.root}>
      <BackButton url='/client' />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={popup}
        autoHideDuration={6000}
        message={popupMessage}
        onClose={() => setPopup(0)}

        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={() => setPopup(0)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >

      </Snackbar>

      <Box className={classes.containerFill}></Box>
      <Paper className={classes.container}>
        <Grid container spacing={4} className={classes.gridContainer}>
          <Grid item xs={12} align='left'>
            <Typography variant='h5'>
              Genie Bot AI
            </Typography>
            <Typography variant='body2'>
              Hey there! Please provide as much detail as you can about what service you are looking for and your contact information.
            </Typography>
            <br />
            <Box className={classes.buttonContainer}>
              <Typography variant='body2'>
                Don't worry about making it look neat, just include your name, email, details of project, coverage needed, number of creatives, dates and anything else you think might be important to know.
              </Typography>

              <Box>
                <Tooltip title='auto-generate some text' placement={'right'}>
                  <Button colour='primary' onClick={generateAutoText}>Auto</Button>
                </Tooltip>
                <Button color='secondary' onClick={handleSave}>Save</Button>
              </Box>
            </Box>

            <br />
            <TextField
              rows={5} multiline={true}
              className={classes.inputField}
              value={text} onChange={(e) => setText(e.target.value)}
            >
            </TextField>
          </Grid>

          <Grid item xs={12} align='left'>
            <Typography className={classes.responseTitle} variant='body1' align='left'>
              Responses
            </Typography>

            <Accordion
              className={classes.accordion} expanded={expandResult}
              onChange={() => setExpandResult(!expandResult)}
              >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant='h6' className={classes.summaryTitle}>Key Information</Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Grid container spacing={2}>
                  {entities.map((entity, index) => {
                    return (
                      <Grid item xs={12} key={index}>
                        <Typography className={classes.keyTitle}>
                          {entity.type}
                        </Typography>

                        <Typography className={classes.valueContent} variant='body2'>
                          {entity.content}
                        </Typography>
                      </Grid>
                    )
                  })}
                </Grid>
              </AccordionDetails>
            </Accordion>

            <Accordion
              className={classes.accordion} expanded={expandResult}
              onChange={() => setExpandResult(!expandResult)}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant='h6' className={classes.summaryTitle}>Other Keywords</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container>
                  {keywords.map((word, index) => {
                    return (
                      <Grid item xs={12} key={index}>
                        <Typography className={classes.valueContent} variant='body2'>{word}
                        </Typography>
                      </Grid>
                    )
                  })}
                </Grid>

              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Paper>

      <Box className={classes.containerFill}></Box>
    </Box>
  );
}
