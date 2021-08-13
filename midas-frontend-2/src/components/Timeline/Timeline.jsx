import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import EventDialog from './EventDialog';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  timelineItem: {
    missingOppositeContent: {
      '&:before': {
        display: 'none',
      },
    },
  },
}));

export default function MidasTimeline() {
  const [loading, setLoading] = useState(true);
  const [timelineEvents, setTimelineEvents] = useState({});
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState();
  const classes = useStyles();

  useEffect(async () => {
    await axios.post('https://run.mocky.io/v3/b09c2bd5-6e77-4843-bd09-84967de84419').then((result) => {
      setTimelineEvents(result.data.data);
      setLoading(false);
    });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <Timeline>
      {loading ? (
        <Loader type='Puff' color='#00BFFF' height={100} width={100} />
      ) : (
        timelineEvents.map((anEvent) => {
          const eventDate = new Date(anEvent.event_date).toDateString();
          const completionDate = anEvent.completion_date == null ? null : new Date(anEvent.completion_date).toDateString();
          return (
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={3} className={classes.paper}>
                  <Typography variant='h6' component='h1'>
                    {eventDate}: {anEvent.event_name}
                  </Typography>
                  {completionDate != null ? (
                    <Typography>
                      <i>Completed on {completionDate}</i>
                    </Typography>
                  ) : null}
                </Paper>
              </TimelineContent>
            </TimelineItem>
          );
        })
      )}
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color='primary'>
            <AddCircleOutlineOutlinedIcon />
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent>
          <button type='button' class='btn btn-primary' onClick={handleClickOpen}>
            Add New Event
          </button>
          <EventDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
