import React, {useEffect} from 'react';

import {makeStyles, Box} from '@material-ui/core';

import Image from '../../resources/images/sppraxMediaBackground.png';
import BackButton from '../../components/BackButton';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#EBEBEB",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundImage: `url(${Image})`,
    backgroundSize: 'cover'

  },

  backButton: {
    marginRight: theme.spacing(2),
    color: "#009688",
  },

  title: {
    flexGrow: 1,
    margin: 24,
    fontSize: 36,
    color: "#009688",
    fontWeight: 420,
  },
}));

export default function ClientChatPage() {
  const classes = useStyles();

  useEffect(() => {
    const script = document.createElement("script");
    script.type = 'text/javascript';
    script.src = "https://widget.instabot.io/jsapi/rokoInstabot.js";
    script.crossorigin = true;
    script.innerHTML = 'apiKey: "iNaFp81BQM6TBmzFj0pYR9kFP3JjQiayjSEsIjIoedk="';

    script.onload = () => {
      console.log(window.RokoInstabot);
      window.RokoInstabot.trigger();
    }

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    }
  }, []);

  return (
    <Box className={classes.root}>
      <BackButton url='/client' />
    </Box>
  );
}
