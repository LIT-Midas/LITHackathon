import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
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
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Container } from 'reactstrap';
import { AccountContext } from '../services/account';
import { CaseContext } from '../services/case';
import './Cases.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cases = () => {
  const baseURL = 'https://localhost:8000';
  const { userId } = useContext(AccountContext);
  const { setSelectedCase, setCaseName } = useContext(CaseContext);
  const [casesData, setCasesData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const newCaseName = useRef('');
  const newClientName = useRef('');
  const newClientEmail = useRef('');
  const newDescription = useRef('');
  const newClientContactNumber = useRef(null);
  const history = useHistory();

  useEffect(() => {
    setSelectedCase(null);
    setCaseName(null);
    getCases();
  }, [])

  const notify = () => toast("Case has been successfully created!!");

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

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    clearNewVariables();
  };

  const getCases = async () => {
    if (userId != null && userId != '') {
      await axios
        .get(baseURL + `/claims/user/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then(function (response) {
          const result = response?.data;
          if (response?.status === 200) {
            console.log(result);
            setCasesData(result ?? []);
          } else {
            // if (result?.message !== null) {
            //   setResponseType(result?.message ? 'danger' : null);
            // }
            // setResponseMessage(result?.message);
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }

  const createCase = async () => {
    const data = {
      "name": newCaseName.current,
      "user_id": userId,
      "client_name": newClientName.current,
      "client_email": newClientEmail.current,
      "description": newDescription.current,
      "contact_number": '' + newClientContactNumber.current,
      "start_date": new Date(),
    }
    await axios
      .post(baseURL + '/claims', data, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(function (response) {
        const result = response?.data;
        if (response?.status === 200) {
          handleClose();
          notify();
          getCases();
        }
      })
      .catch(function (error) {
      });
  }

  const CaseGrid = () => {
    const gridItems = [
      <Grid item xs={12} s={6} md={4} lg={3} spacing={3} className="px-2 py-2">
        <Card className={classes.root}>
          <CardContent className={'add-case my-auto'}>
            <Button onClick={handleClickOpen}>
              <Row>
                <AddIcon fontSize={'50'} />
                <h4 className={"material-icons-outlined"}>
                  add a new case
                </h4>
              </Row>
            </Button>
          </CardContent>
          <CardActions>
          </CardActions>
        </Card>
      </Grid>
    ];

    casesData.map((cases, index) => {
      gridItems.push(<Grid item xs={12} s={6} md={4} lg={3} spacing={3} className="px-2 py-2">
        <Card className={classes.root}>
          <CardContent className={'pb-0'}>
            <Typography variant="h5" component="h2">
              {cases.name}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
            </Typography>
            <Typography variant="body2" component="p">
              {cases.description}
            </Typography>
            <Typography variant="body2" component="p" color="textSecondary">
              Last Updated: {new Date(cases.updated_at).toDateString()}
            </Typography>
            <Typography variant="body2" component="p" className={'pt-1'} color="textSecondary">
              {cases.contact_number}
            </Typography>
          </CardContent>
          <CardActions className={'pt-0'}>
            <Button size="small" onClick={() => {
              console.log(cases.id);
              setSelectedCase(cases.id);
              setCaseName(cases.name);
              history.push('/admin/timeline');
            }}>Select Case</Button>
          </CardActions>
        </Card>
      </Grid>)
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

  const RegistrationDialog = () => {
    return (
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a new case</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter all the following detail of the case to add it to your list of cases
          </DialogContentText>
          <TextField
            margin="dense"
            id="caseName"
            label="Case Name"
            type="text"
            fullWidth
            onChange={(e) => { newCaseName.current = e.target.value; }}
            required
          />
          <TextField
            margin="dense"
            id="clientName"
            label="Client Name"
            type="text"
            fullWidth
            onChange={(e) => { newClientName.current = e.target.value }}
            required
          />
          <TextField
            margin="dense"
            id="clientEmail"
            label="Client Email"
            type="email"
            fullWidth
            onChange={(e) => { newClientEmail.current = e.target.value }}
            required
          />
          <TextField
            margin="dense"
            id="clientContact"
            label="Client Contact Number"
            type="number"
            fullWidth
            onChange={(e) => { newClientContactNumber.current = e.target.value }}
            required
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="textarea"
            fullWidth
            onChange={(e) => { newDescription.current = e.target.value }}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={createCase} color="primary">
            Add Case
          </Button>
        </DialogActions>
      </Dialog>
    )
  }


  const clearNewVariables = () => {
    newCaseName.current = '';
    newClientName.current = '';
    newClientEmail.current = '';
    newClientContactNumber.current = null;
    newDescription.current = '';
  }

  // Client, description, last modified
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
      <RegistrationDialog />
      <Container>
        <h1 className="pt-3 title">Select a case:</h1>
      </Container>
      <CaseGrid />
    </>
  );
};

export default Cases;
