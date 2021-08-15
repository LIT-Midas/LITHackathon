import DateFnsUtils from '@date-io/date-fns';
import { TextareaAutosize } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import axios from 'axios';
import 'date-fns';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { CaseContext } from '../../services/case';
import './EventDialog.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const emails = ['username@gmail.com', 'user02@gmail.com'];
const useAStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export default function EventDialog(props) {
  const classes = useAStyles();
  const { onClose, selectedValue, open, fetchEvents, setLoading } = props;
  const { selectedCase } = useContext(CaseContext);
  const [eventOwner, setEventOwner] = useState(null);
  const [eventType, setEventType] = useState(null);
  const [eventName, setEventName] = useState(null);
  const [eventDetails, setEventDetails] = useState(null);
  const [eventDate, setEventDate] = useState(new Date());
  const eventTypeMapping = {
    "Filed Writ of Summons": "filed_writ_of_summons",
    "Filed Statement of Claims": "filed_statement_of_claims",
    "Filed Writ of Summons and Statement of Claims": "filed_writ_of_summons_and_statement_of_claims",
    "Filed Memorandum of Appearance": "filed_memorandum_of_appearance",
    "Defence reply": "defence_reply",
    "Defence to counterclaim": "defence_to_counterclaim",
    "Discovery stage": "discovery_stage",
    "Custom": "custom",
  }
  const eventPersonaMapping = {
    "Counsel": "counsel",
    "Opposing Counsel": "opposing_counsel",
  }

  const handleClose = () => {
    onClose(selectedValue);
  };

  const notify = () => toast("Event has successfully been created!");

  const createEvent = async () => {
    const type = eventOwner + '_' + eventTypeMapping[eventType];
    const data = {
      "name": eventName,
      "claim_id": selectedCase,
      "details": eventDetails,
      "type": type,
      "start_date": eventDate,
    }
    await axios.post('https://8169f98443ef.ngrok.io/tasks', data, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      notify()
      setLoading(true);
      fetchEvents();
      setEventOwner(null);
      setEventType(null);
      setEventName(null);
      setEventDetails(null);
      setEventDate(new Date());
      handleClose();
    }).catch((error) => {
      console.error('Error creating task: ' + error);
    })
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        variant={'success'}
      />
      <Dialog onClose={handleClose} aria-labelledby='simple-dialog-title' open={open}>
        <DialogTitle id='simple-dialog-title'>Add New Event</DialogTitle>
        <Grid container spacing={3} className={'m-3'} align="center">
          <Grid item xs={12} align="center">
            <FormControl className={'pr-5'}>
              <Select
                align='start'
                id='event-owner'
                value={eventOwner}
                onChange={(event) => {
                  setEventOwner(event.target.value);
                }}>
                {(
                  Object.keys(eventPersonaMapping).map(function (key) {
                    return <MenuItem value={eventPersonaMapping[key]}>{key}</MenuItem>
                  })
                )}
              </Select>
              <FormHelperText>Who should be carrying out the action?</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} align="center">
            <FormControl className={'pr-5'}>
              <Select
                align='start'
                id='event-owner'
                value={eventType}
                onChange={(event) => {
                  setEventType(event.target.value);
                  if (event.target.value != 'custom') {
                    setEventName(event.target.value);
                  } else {
                    setEventName(null);
                  }

                }}>
                {(
                  Object.keys(eventTypeMapping).map(function (key) {
                    return <MenuItem selected={true} value={key}>{key}</MenuItem>
                  })
                )}
              </Select>
              <FormHelperText>What is the type of event?</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} align="center">
            <FormControl className={''}>
              <TextField
                margin="dense"
                id="event-name"
                type="text"
                fullWidth
                value={eventName}
                onChange={(e) => { setEventName(e.target.value) }}
                required
              />
              <FormHelperText>What is the name of this event?</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} align="center">
            <FormControl className={'pr-5'}>
              <TextareaAutosize
                margin="dense"
                id="event-details"
                type="textarea"
                className={'textarea-border'}
                fullWidth
                value={eventDetails}
                onChange={(e) => { setEventDetails(e.target.value) }}
                required
              />
              <FormHelperText>Are there any additional details?</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} align="center">
            <FormControl className={'date'}>
              <MuiPickersUtilsProvider utils={DateFnsUtils} >
                <KeyboardDatePicker
                  autoOk='true'
                  variant='inline'
                  format='dd MMM yyyy'
                  margin='normal'
                  value={eventDate}
                  onChange={(date) => {
                    setEventDate(date);
                  }}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
              <FormHelperText>What is the deadline for this event?</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        {/* <CircularProgress color='secondary' /> */}
        <button type='button' class='btn btn-primary m-4' onClick={createEvent}>
          Create
        </button>
      </Dialog >
    </>
  );
}

EventDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};
