import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Timeline from '@material-ui/lab/Timeline';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimeLineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { CaseContext } from '../../services/case';
import EventDialog from './EventDialog';
import './Timeline.css';

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
  const { selectedCase } = useContext(CaseContext);
  const [loading, setLoading] = useState(true);
  const [timelineEvents, setTimelineEvents] = useState({});
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState();
  const classes = useStyles();

  useEffect(async () => {
    await fetchEvents();
  }, []);

  const fetchEvents = async () => {
    selectedCase && await axios.get(`https://8169f98443ef.ngrok.io/tasks/claim/${selectedCase}`).then((result) => {
      console.log(result.data);
      setTimelineEvents(result.data);
      setLoading(false);
    }).catch((error) => {
      console.error('Timeline error: ' + error);
    });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  if (loading) {
    return (<Loader type='Puff' color='#00BFFF' height={100} width={100} />);
  } else {
    return (
      <Timeline align={'left'} className={'content-none'}>
        {
          timelineEvents.map((anEvent) => {
            const eventDate = new Date(anEvent.start_date)?.toDateString();
            const completionDate = anEvent.completion_date == null ? null : new Date(anEvent.completion_date)?.toDateString();
            return (
              <TimelineItem>
                <TimeLineOppositeContent className={'opp-content'}>
                  <Typography variant='h9' component='h3' className={'date'}>
                    {eventDate}
                  </Typography>
                </TimeLineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Paper elevation={3} className={classes.paper}>
                    <Typography variant='h6' component='h1'>
                      {anEvent.name}
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
        }
        <TimelineItem>
          <TimeLineOppositeContent className={'opp-content pr-1'} />
          <TimelineSeparator>
            <TimelineDot color='primary'>
              <AddCircleOutlineOutlinedIcon />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent>
            <button type='button' className={'btn btn-primary'} onClick={handleClickOpen}>
              Add New Event
            </button>
            <EventDialog selectedValue={selectedValue} open={open} onClose={handleClose} fetchEvents={fetchEvents} setLoading={setLoading} />
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    );
  }
}
