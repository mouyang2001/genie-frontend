import React, {useState, useEffect} from 'react';

import {
  Paper, Grid, Box, Typography, makeStyles, Accordion, AccordionSummary, AccordionDetails
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing(3)
  },

  chatAccordion: {
    width: '100%',
    padding: theme.spacing(1),
    marginTop: '0 !important',
    marginBottom: '0 !important',

    '&:before': {
      display: 'none',
    }
  },

  chatSender: {
    fontSize: '0.8em'
  },

  chatContent: {

  },

  chatMe: {
    textAlign: 'right',
    backgroundColor: '#04BF7C',
    color: 'white'
  },

  chatClient: {
    backgroundColor: '#F5F5F5'
  },

  chatContainer: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: '15px',
  },
}));

export default function Conversation(props) {

  const classes = useStyles();

  const [clientChat, setClientChat] = useState([]);

  useEffect(() => {
    if (props.client.isTyping) {
      setClientChat([...props.client.chat, {sender: 'client', content: '...', time: Date()}]);
    } else {
      setClientChat(props.client.chat);
    }
  }, [props]);


  return (
    <Box className={classes.container}>
      <Accordion className={classes.chatAccordion}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box>
            <Typography variant='h5'>Recent Conversation</Typography>
            <Typography variant='body2'>with {props.client.name}</Typography>
          </Box>
        </AccordionSummary>

        <AccordionDetails>
          <Grid container>
            <Grid item xs={12}>
              {clientChat.map((chatMessage, index) => {
                let sender = (chatMessage.sender === "client") ? props.client.name : "Genie";

                let toClass = (chatMessage.sender === "client") ? classes.chatClient : classes.chatMe;

                return (
                  <Paper key={index} className={`${classes.chatContainer} ${toClass}`} elevation={0}>
                    <Typography variant="h6" className={classes.chatSender}>
                      {sender}
                    </Typography>
                    <Typography variant='body2' className={classes.chatContent}>
                      {chatMessage.content}
                    </Typography>
                  </Paper>
                )
              })}
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
