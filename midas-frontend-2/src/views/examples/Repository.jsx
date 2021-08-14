/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Add from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import axios from 'axios';
import React, { useState, useRef, useContext, useEffect } from 'react';
import {
  Badge, Card, CardFooter, CardHeader, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress, Row, Table, UncontrolledDropdown, UncontrolledTooltip
} from 'reactstrap';
import UploadFiles from '../../components/FileUpload/UploadFiles.component.jsx';
import Header from '../../components/Headers/Header.js';
import { CaseContext } from '../../services/case.js';
import './Repository.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FileDownloadTable from '../../components/FileDownload/FileDownloadTable.component.jsx';

const Repository = () => {

  const [openUpload, setOpenUpload] = useState(false);
  const [openRequestDialog, setOpenRequestDialog] = useState(false);
  const { selectedCase } = useContext(CaseContext);
  const [data, setData] = useState([]);
  const recipientName = useRef(null);
  const recipientEmail = useRef(null);

  const notify = () => toast("Awesome! Your request has been sent to the recipient.");

  useEffect(async () => {
    await fetchDocuments();
  }, [])

  const sendDocumentRequest = async () => {
    const paramData = {
      "name": recipientName.current,
      "email": recipientEmail.current,
      "claim_id": selectedCase,
    }
    await axios.post('https://26b8cf35526e.ngrok.io/clients', paramData, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((request) => {
      if (request.status === 200) {
        console.log('successful');
        notify();
      }
    }).catch((error) => {
      console.error(error);
    });
    setOpenRequestDialog(false);
  }

  const fetchDocuments = async () => {
    if (selectedCase != null && selectedCase != '') {
      await axios.get(`https://26b8cf35526e.ngrok.io/documents/claim/${selectedCase}`, {
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
  }

  const RequestDocumentDialog = () => {
    return (
      <Dialog open={openRequestDialog} onClose={() => { setOpenRequestDialog(false); }} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Request for documents</DialogTitle>
        <DialogContent>
          <DialogContentText className={'pr-3 text-align-center align-items-center'}>
            Enter all the necessary information for the request to be sent to the correct recipient.
          </DialogContentText>
          <TextField
            margin="dense"
            id="recipientEmail"
            label="Recipient Name"
            type="text"
            fullWidth
            onChange={(e) => { recipientName.current = e.target.value }}
            required
          />
          <TextField
            margin="dense"
            id="recipientEmail"
            label="Recipient Email"
            type="email"
            fullWidth
            onChange={(e) => { recipientEmail.current = e.target.value }}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpenRequestDialog(false); }} color="primary">
            Cancel
          </Button>
          <Button onClick={sendDocumentRequest} color="primary">
            Send Request
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  return (
    <>
      <Header />
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
      <RequestDocumentDialog />
      {/* Page content */}
      <Container className='mt--7' fluid>
        {/* Table */}
        <Row>
          <div className='col'>
            <Card className='shadow'>
              <CardHeader className='border-0'>
                <Row>
                  <Col xs lg={openUpload ? '11' : '9'} className={'my-auto'}>
                    <h3 className='mb-0'>{openUpload ? 'Upload Documents' : 'Documents'}</h3>
                  </Col>
                  <Col xs lg='1' className={'my-auto'}>
                    {
                      openUpload ?
                        <button type='button' className={'btn btn-primary'} onClick={() => { setOpenUpload(false) }}>
                          <RemoveIcon />
                        </button> :
                        <button type='button' className={'btn btn-primary'} onClick={() => { setOpenUpload(true); setOpenRequestDialog(false); }}>
                          <Add />
                        </button>
                    }
                  </Col>
                  {
                    !openUpload ? (
                      <Col xs lg={'2'} className={'my-auto'}>
                        <button type='button' className={'btn btn-primary'} onClick={() => { setOpenRequestDialog(true) }}>
                          Request docs
                        </button>
                      </Col>
                    ) : <> </>
                  }
                </Row>
              </CardHeader>
              {
                openUpload ?
                  <UploadFiles setOpenUpload={setOpenUpload} fetchDocuments={fetchDocuments} /> :
                  <FileDownloadTable data={data} />
              }
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Repository;
