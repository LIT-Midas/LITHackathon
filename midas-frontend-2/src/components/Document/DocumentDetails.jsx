import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Row, Col, Card, CardHeader, CardText, CardBody, CardTitle, CardSubtitle, Table } from 'reactstrap';

export default function DocumentDetail(props) {
  const [documentTitle, setDocumentTitle] = useState('Title Of Document');
  const [uploadedBy, setUploadedBy] = useState('Uploader Name');
  const [uploadDate, setUploadDate] = useState('Upload Date');
  const [keyInfo, setKeyInfo] = useState({});
  const [expense, setExpense] = useState(null);
  const [date, setDate] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [serialNum, setSerialNum] = useState(null);
  const [documentType, setDocumentType] = useState(null);
  const [documentLink, setDocumentLink] = useState('');
  const [renderDocument, setRenderDocument] = useState(<Loader type='Puff' color='#00BFFF' height={100} width={100} />);

  const { selectedFileId, setSelectedFieldId, setFileSelected } = props;
  useEffect(async () => {
    let fileData;
    await axios.get(`https://8169f98443ef.ngrok.io/documents/${selectedFileId}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((result) => {
      console.log(result.data);
      fileData = result.data;
    });

    if (fileData) {
      setDocumentTitle(fileData.name);
      setUploadedBy(fileData.uploader_name);
      setUploadDate(new Date(fileData.created_at));
      setKeyInfo(fileData.form_data);
      setDocumentType(fileData?.file_type);
      setExpense(fileData.form_data?.expense);
      setDate(new Date(fileData.form_data?.date));
      setCompanyName(fileData.form_data?.company_name);
      setSerialNum(fileData.form_data?.serial_number);
      setRenderDocument(<img className='img-fluid' src={"https://i.ibb.co/q9fs359/Guardian-Health.jpg"} alt='' />);
    }
    // const config = { responseType: 'blob' };
    // axios.get(blobUrl, config).then((response) => {
    //   new File([response.data], fileName);
    // });
    // return () => {
    //   cleanup;
    // };
  }, []);

  const retrieveSignedUrl = async () => {
    console.log(selectedFileId);
    selectedFileId && await axios.get(`https://8169f98443ef.ngrok.io/documents/presignedUrl/${selectedFileId}`, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': 'attachment',
      }
    }).then((request) => {
      console.log(request);
      return (request.data);
    }).catch((error) => {
      console.error(error);
    });
  }

  const updateDocument = async () => {
    const newFormData = {
      expense: expense,
      date: date,
      company_name: companyName,
      serial_number: serialNum
    }
    const data = {
      form_date: newFormData
    }
    selectedFileId && await axios.post(`https://8169f98443ef.ngrok.io/documents/${selectedFileId}`, data).then(res => {
      console.log("success", res)
      setFileSelected(false);
      setSelectedFieldId(null);
    })
  }

  return (
    <Card className='shadow'>
      <CardHeader className='border-0'>
        <h3 className='mb-0'>Document Detail</h3>
      </CardHeader>
      <CardBody>
        <Row>
          <Col>{renderDocument}</Col>
          <Col>
            <Row>
              <h4>Document Name</h4>
            </Row>
            <Row>
              <TextField id='standard-basic' value={documentTitle} onChange={(event) => setDocumentTitle(event.target.value)} />
            </Row>
            <Row className="pt-4">
              <Col>
                <Row>
                  <h4>Uploaded By</h4>
                </Row>
                <Row>
                  <TextField id='standard-basic' value={uploadedBy} />
                </Row>
              </Col>
              <Col>
                <Row>
                  <h4>Uploaded On</h4>
                </Row>
                <Row>
                  <MuiPickersUtilsProvider utils={DateFnsUtils} >
                    <KeyboardDatePicker
                      autoOk='true'
                      variant='inline'
                      format='dd MMM yyyy'
                      margin='normal'
                      value={uploadDate}
                      onChange={(newDate) => {
                        setUploadDate(newDate);
                      }}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Row>
              </Col>
            </Row>
            <Row className="pt-4">
              <h4>Extracted Key Info</h4>
            </Row>
            <Row>
              <Table className='align-items-center table-flush' responsive>
                <thead className='thead-light'>
                  <tr>
                    <th scope='col'>Required Data</th>
                    <th scope='col'>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{'expense'}</td>
                    <td><TextField id='standard-basic' value={expense} onChange={(e) => { setExpense(e.target.value) }} /></td>
                  </tr>
                  <tr>
                    <td>{'date'}</td>
                    <td>
                      <MuiPickersUtilsProvider utils={DateFnsUtils} >
                        <KeyboardDatePicker
                          autoOk='true'
                          variant='inline'
                          format='dd MMM yyyy'
                          margin='normal'
                          value={date}
                          onChange={(newDate) => {
                            setDate(newDate);
                          }}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </td>
                  </tr>
                  <tr>
                    <td>{'company_name'}</td>
                    <td><TextField id='standard-basic' value={companyName} onChange={(e) => { setCompanyName(e.target.value) }} /></td>
                  </tr>
                  <tr>
                    <td>{'serial_number'}</td>
                    <td><TextField id='standard-basic' value={serialNum} onChange={(e) => { setSerialNum(e.target.value) }} /></td>
                  </tr>
                </tbody>
              </Table>
            </Row>
            <button className='btn btn-primary' onClick={updateDocument}>Update</button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}
