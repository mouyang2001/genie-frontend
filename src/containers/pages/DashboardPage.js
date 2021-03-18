import React, { useState, useEffect } from 'react';

import {
  Grid, Box, Container,
  Typography, makeStyles, AppBar, Toolbar,
  IconButton, Tooltip,
  Dialog, DialogTitle, DialogContent,
  TextField, Switch, FormControlLabel, Button, Snackbar
} from '@material-ui/core';


import Conversation from '../../components/Conversation';
import ClientCard from '../../components/ClientCard';
import SliderSetting from '../../components/SliderSetting';
import BackButton from '../../components/BackButton';

import AccountCircle from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import TimelineIcon from '@material-ui/icons/Timeline';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '100vh',
    backgroundColor: '#EBEBEB',
    paddingBottom: theme.spacing(4)
  },

  nav: {
    backgroundColor: 'white',
    height: '80px',
    color: 'black',
  },

  navRight: {
    position: 'fixed',
    top: '4px',
    right: '20px',
  },

  logo: {
    marginTop: '20px',
    color: '#009688',
    fontWeight: '700',
    fontFamily: 'Comfortaa, sans-serif',
  },

  loginUserContainer: {
    marginTop: '10px',
    float: 'left',
    textAlign: 'right'
  },

  avatarContainer: {
    float: 'right',
  },

  avatar: {
    width: '50px',
    height: 'auto',
    color: '#00C2B0'
  },

  businessSettingsContainer: {
    display: 'flex',
    flexFlow: 'column',
    width: '400px',

    '& *': {
      marginBottom: theme.spacing(0.5)
    }
  },

  optionsBar: {
    borderRadius: theme.spacing(1),
    backgroundColor: '#00C2B0',
    color: 'white',
    margin: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },

  optionsIcons: {
    textAlign: 'right'
  },

  gridContainer: {
    paddingTop: theme.spacing(13)
  },

  clientContainer: {
    padding: theme.spacing(1.5),
    position: 'relative',
  },

  sideCard: {
    padding: theme.spacing(3),
    backgroundColor: 'white',
    boxShadow: '0 2px 3px rgba(0, 0, 0, 0.3)',
    borderRadius: '5px',
    marginBottom: 0,
    marginTop: 0,
  },

  statusIndicator: {
    marginBottom: theme.spacing(4)
  },

  settingsName: {
    width: '50%',
  }
}));

export default function DashboardPage() {

  const classes = useStyles();

  const [clientItems, setClientItems] = useState([]);
  const [currentStatus, setCurrentStatus] = useState([]);
  const [refresh, setRefresh] = useState(0);

  const [settingsOpen, setSettingsOpen] = useState(0);

  const [popup, setPopup] = useState(0);
  const [popupMessage, setPopupMessage] = useState('Updated clients list.');

  const [settingSpectrum, setSettingSpectrum] = useState(1);
  const [settingPrecision, setSettingPrecision] = useState(1);
  const [settingEstimate, setSettingEstimate] = useState(true);
  const [settingName, setSettingName] = useState('');
  const [settingCategory, setSettingCategory] = useState('');

  const [objectId, setObjectId] = useState('');


  // Load business settings from server
  useEffect(() => {

    fetch("https://genie-app-backend.herokuapp.com/api/settings", {
      method: "GET",
    }).then(async (res) => {
      let resObj = await res.json();

      setObjectId(resObj._id);
      setSettingSpectrum(resObj.quote_spectrum);
      setSettingPrecision(resObj.quote_precision);
      setSettingEstimate(resObj.auto_estimate);
      setSettingName(resObj.business_name);
      setSettingCategory(resObj.business_category);
    });

  }, [refresh]);


  // Load current conversations, and repeat every 3 seconds
  useEffect(() => {
    setCurrentStatus([]);
    const fetchCurrent = async () => {
      fetch(
        "https://genie-app-backend.herokuapp.com/api/clients/current"
      ).then(async (res) => {
        let resObj = await res.json();

        setCurrentStatus(resObj);
      });
    };

    fetchCurrent();

  }, [refresh]);

  // Load current client cards, and repeat every 3 seconds
  useEffect(() => {
    setClientItems([]);


    const fetchClients = () => {
      fetch("https://genie-app-backend.herokuapp.com/api/clients").then(
        async (res) => {
          let resObj = await res.json();
          setClientItems(resObj);
        }
      );
    };

    fetchClients();

    const interval = setInterval(fetchClients, 3000);

    return () => clearInterval(interval);

  }, [refresh]);

  const handleNameChange = (e) => {
    setSettingName(e.target.value);
  }

  const handleCategoryChange = (e) => {
    setSettingCategory(e.target.value);
  }


  const handleSettingsSave = () => {
    let resObj = {
      object_id: objectId,
      quote_spectrum: settingSpectrum,
      quote_precision: settingPrecision,
      auto_estimate: settingEstimate,
      business_name: settingName,
      business_category: settingCategory
    }

    const reqOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resObj)
    }

    fetch("https://genie-app-backend.herokuapp.com/api/settings", reqOptions);

    setSettingsOpen(0);
  }

  return (
    <Box className={classes.container}>
      <BackButton url={'/'} />

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
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
      <AppBar position="fixed" className={classes.nav}>
        <Toolbar>
          <Typography variant='h4' className={classes.logo}>
            Genie
          </Typography>

          <Box className={classes.navRight}>
            <Box className={classes.loginUserContainer}>
              <Typography>
                You are signed in as...
              </Typography>
              <Typography variant='h6'>
                {settingName.toUpperCase()}
              </Typography>
            </Box>
            <IconButton className={classes.avatarContainer}>
              <AccountCircle className={classes.avatar}/>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Dialog open={settingsOpen} onClose={handleSettingsSave}>
        <DialogTitle>Quotation Settings</DialogTitle>
        <DialogContent>
          <Box className={classes.businessSettingsContainer}>
            <SliderSetting title="Quote Spectrum" left="$" right="$$$" value={settingSpectrum} callback={(val) => setSettingSpectrum(val)} />

            <SliderSetting title="Quote Precision" left="low" right="high" value={settingPrecision} callback={(val) => setSettingPrecision(val)} />

            <TextField label='business name' className={classes.settingsName} value={settingName} onChange={handleNameChange} />

            <TextField label='business category' className={classes.settingsName} value={settingCategory} onChange={handleCategoryChange} />

            <FormControlLabel control={<Switch />} label='Autosend Estimate' checked={settingEstimate} onChange={() => setSettingEstimate(!settingEstimate)} />

            <Button onClick={handleSettingsSave}>Save</Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Container maxWidth={'lg'} className={classes.gridContainer}>

        <Box className={classes.optionsBar}>
          <Grid container alignItems='center'>
            <Grid item xs={4}>
              <Typography variant='h6'>Options</Typography>
            </Grid>
            <Grid item xs={8} className={classes.optionsIcons}>
              <Tooltip title="Analytics">
                <IconButton color='inherit'>
                  <TimelineIcon color='inherit' />
                </IconButton>
              </Tooltip>
              <Tooltip title="Refresh">
                <IconButton color='inherit' onClick={() => setRefresh(!refresh)}>
                  <AutorenewIcon color='inherit' />
                </IconButton>
              </Tooltip>

              <Tooltip title="Settings">
                <IconButton color='inherit' onClick={() => setSettingsOpen(1)}>
                  <SettingsIcon color='inherit' />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Box>



        <Grid container>
          <Grid item xs={false} sm={5} md={4}>
            <Grid container className={classes.clientContainer}>
              <Grid item xs={12} className={`${classes.sideCard} ${classes.statusIndicator}`}>
                <Typography variant='h5' display='inline'>{currentStatus.length} </Typography>
                <Typography variant='body2' display='inline'>Recent Conversation{currentStatus.length === 1 ? '' : 's'}</Typography>
              </Grid>

              {currentStatus.map((client, index) => {
                return (
                  <Conversation client={client} key={index} />
                );
              })}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={7} md={8}>
            <Grid container>
              {clientItems.map((item, index) => {
                return (
                  <Grid item xs={12} md={6} key={index} className={classes.clientContainer}>
                    <ClientCard item={item} updateCallback={(message) => {setRefresh(!refresh); setPopupMessage(message); setPopup(1)}} />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Container>


    </Box>
  );
}
