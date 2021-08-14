import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Card, CardHeader, Container } from 'reactstrap';
import UploadFiles from './UploadFiles.component';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const ClaimFileUpload = (props) => {
  const classes = useStyles();

  return (
    <Container className="pt-5">
      <Card className='shadow'>
        <CardHeader className='border-0 pb-0'>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            You have been requested to upload documents.
          </Typography>
        </CardHeader>
        <UploadFiles setOpenUpload={(value) => { console.log(value) }} />
      </Card>
    </Container>
  );
}

export default ClaimFileUpload;