import axios from "axios";
import {
  CardBody,
  Container,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import Header from "../Headers/Header.js";
import React, { useState, useEffect, useContext, useRef } from "react";
import { CaseContext } from "../../services/case";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Row from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import FileDownloadTable from "../FileDownload/FileDownloadTable.component";

const ShareDocument = () => {

  const { selectedCase } = useContext(CaseContext);
  const [sharers, setSharers] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [data, setData] = useState([]);
  const userName = useRef(null);
  const userEmail = useRef(null);


  useEffect(async () => {
    await retrieveClaimSharers();
    await retrieveClaimDocuments();
  }, []);

  const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

  const classes = useStyles();

  const handleClickOpen = () => {
    setDialogOpen(true);
  }

  const handleClose = () => {
    setDialogOpen(false);
  }

  const ReceiverGrid = () => {
    const gridItems = [
      <Grid item xs={12} s={6} md={4} lg={3} spacing={3} className="px-2 py-2">
        <Card className={classes.root}>
          <CardContent className={'add-case my-auto'}>
            <Button onClick={handleClickOpen}>
              <Row>
                <AddIcon fontSize={'50'} />
                <h4 className={"material-icons-outlined"}>
                  Share a document with a user
                </h4>
              </Row>
            </Button>
          </CardContent>
          <CardActions>
          </CardActions>
        </Card>
      </Grid>
    ];

    sharers.map((sharer, index) => {
      gridItems.push(<Grid item xs={12} s={6} md={4} lg={3} spacing={3} className="px-2 py-2">
        <Card className={classes.root}>
          <CardContent className={'pb-0'}>
            <Typography variant="h5" component="h2">
              {sharer.name}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
            </Typography>
            <Typography variant="body2" component="p">
              {sharer.description}
            </Typography>
            <Typography variant="body2" component="p" color="textSecondary">
              Last Updated: {new Date(sharer.updated_at).toDateString()}
            </Typography>
            <Typography variant="body2" component="p" className={'pt-1'} color="textSecondary">
              {sharer.contact_number}
            </Typography>
          </CardContent>
          <CardActions className={'pt-0'}>
            <Button size="small" onClick={() => {
            }}>Select Case</Button>
          </CardActions>
        </Card>
      </Grid>
      )
    });

    return (
      <Grid
        container
        direction="row"
        justifyContent="start"
        alignItems="center"
        className="pt-3"
      >
        {gridItems}
      </Grid>
    )
  }

  const retrieveClaimDocuments = async () => {
    selectedCase && await axios.get(`https://26b8cf35526e.ngrok.io/documents/claim/${selectedCase}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((request) => {
      console.log(request.data);
      setData(request.data ?? []);
    }).catch((error) => {
      console.error(error);
    })
  }

  const retrieveClaimSharers = async () => {
    selectedCase && await axios.get(`https://26b8cf35526e.ngrok.io/receivers/claim/${selectedCase}`)
      .then((request) => {
        console.log(request);
        if (request.status === 200) {
          setSharers([]);
        }
      })
      .catch((error) => {
        console.error(error);
      })
  }

  const shareDocuments = async () => {
    // TODO: Call API to share documents.
  }

  const NewShareDialog = () => {
    return (
      <Dialog open={dialogOpen} className={'w-100'} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Share files with a new recipient:</DialogTitle>
        <DialogContent className={'w-100'}>
          <TextField
            margin="dense"
            id="caseName"
            label="Recipient Name"
            type="text"
            fullWidth
            onChange={(e) => { userName.current = e.target.value; }}
            required
          />
          <TextField
            margin="dense"
            id="caseEmail"
            label="Recipient Email"
            type="email"
            fullWidth
            onChange={(e) => { userEmail.current = e.target.value }}
            required
          />
          <FileDownloadTable data={data} />
        </DialogContent>
        <DialogActions className={'w-100'}>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={shareDocuments} color="primary">
            Share
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  return (
    <>
      <Header />
      <NewShareDialog />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <Col>
            <Typography className={'pl-2'} color="textPrimary" variant={'h7'}>
              Share Documents
            </Typography>
          </Col>
        </Row>
        <Row >
          <div className="col">
            <ReceiverGrid />
          </div>
        </Row>
      </Container>
    </>
  );
}

export default ShareDocument;