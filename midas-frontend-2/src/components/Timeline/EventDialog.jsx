import 'date-fns';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import { blue } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { createEvent } from '@testing-library/react';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

const emails = ['username@gmail.com', 'user02@gmail.com'];
const useAStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export default function EventDialog(props) {
  const classes = useAStyles();
  const { onClose, selectedValue, open } = props;
  const [eventOwner, setEventOwner] = useState(null);
  const [eventType, setEventType] = useState(null);
  const [eventName, setEventName] = useState(null);
  const [eventDate, setEventDate] = useState(new Date());
  const eventMapping = {
    
  }

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const createEvent = () => {
    alert(eventOwner);
    alert(eventType);
    alert(eventName);
    alert(eventDate);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby='simple-dialog-title' open={open}>
      <DialogTitle id='simple-dialog-title'>Add New Event</DialogTitle>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Typography variant='h6'>Assigned To</Typography>
        </Grid>
        <Grid item xs={8}>
          <FormControl className={classes.formControl}>
            <Select
              id='event-owner'
              value={eventOwner}
              onChange={(event) => {
                setEventOwner(event.target.value);
              }}>
              <MenuItem value='counsel'>Counsel</MenuItem>
              <MenuItem value='opposing-counsel'>Opposing Counsel</MenuItem>
              <MenuItem value='client'>Client</MenuItem>
            </Select>
            <FormHelperText>Who should be carrying out the action</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <Typography variant='h6'>Event Type</Typography>
        </Grid>
        <Grid item xs={8}>
          <FormControl className={classes.formControl}>
            <Select
              id='event-type'
              value={eventType}
              onChange={(event) => {
                setEventType(event.target.value);
              }}>
              <MenuItem value='counsel'>Counsel</MenuItem>
              <MenuItem value='opposing-counsel'>Opposing Counsel</MenuItem>
              <MenuItem value='client'>Client</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <Typography variant='h6'>Event Name</Typography>
        </Grid>
        <Grid item xs={8}>
          <FormControl className={classes.formControl}>
            <Select
              id='event-name'
              value={eventName}
              onChange={(event) => {
                setEventName(event.target.value);
              }}>
              <MenuItem value='counsel'>Counsel</MenuItem>
              <MenuItem value='opposing-counsel'>Opposing Counsel</MenuItem>
              <MenuItem value='client'>Client</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <Typography variant='h6'>Event Date</Typography>
        </Grid>
        <Grid item xs={8}>
          <FormControl className={classes.formControl}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                autoOk='true'
                variant='inline'
                format='MM/dd/yyyy'
                margin='normal'
                id='date-picker-inline'
                label='Date picker inline'
                value={eventDate}
                onChange={(date) => {
                  setEventDate(date);
                }}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </FormControl>
        </Grid>
      </Grid>
      <button type='button' class='btn btn-primary' onClick={createEvent}>
        Create
        <CircularProgress color='secondary' />
      </button>
    </Dialog>
  );
}

EventDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};
