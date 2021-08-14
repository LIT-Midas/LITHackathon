import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import { Row, Col, Card, CardHeader, CardText, CardBody, CardTitle, CardSubtitle, Table } from 'reactstrap';

export default function DocumentDetail() {
  const [documentTitle, setDocumentTitle] = useState('Title Of Document');
  const [uploadedBy, setUploadedBy] = useState('Uploader Name');
  const [uploadDate, setUploadDate] = useState('Upload Date');
  const [keyInfo, setKeyInfo] = useState({});
  const [documentType, setDocumentType] = useState(null);
  const [documentLink, setDocumentLink] = useState('');
  const [renderDocument, setRenderDocument] = useState(<Loader type='Puff' color='#00BFFF' height={100} width={100} />);

  useEffect(async () => {
    let fileData;
    await axios.post('https://run.mocky.io/v3/2647a40c-7d65-4987-988f-709c349d6962').then((result) => {
      fileData = result.data.data;
    });
    console.log(fileData);
    if (fileData) {
      setDocumentTitle(fileData.file_name);
      setUploadedBy(fileData.uploaded_by);
      setUploadDate(new Date(fileData.upload_date));
      setKeyInfo(fileData.key_info);
      setDocumentType(fileData.file_type);
      const fileLink = fileData.link;
      switch (fileData.file_type) {
        case 'img':
          setRenderDocument(<img className='img-fluid' src={fileLink} alt='' />);
          break;
        default:
          break;
      }
    }
    // const config = { responseType: 'blob' };
    // axios.get(blobUrl, config).then((response) => {
    //   new File([response.data], fileName);
    // });
    // return () => {
    //   cleanup;
    // };
  }, []);

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
              <h2>Document Name</h2>
            </Row>
            <Row>
              <TextField id='standard-basic' value={documentTitle} onChange={(event) => setDocumentTitle(event.target.value)} />
            </Row>
            <Row>
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
                  <TextField id='standard-basic' value={uploadDate} />
                </Row>
              </Col>
            </Row>
            <Row>
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
                  {Object.entries(keyInfo).map(([key, value]) => {
                    return (
                      <tr>
                        <td>{key}</td>
                        <td>{value}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Row>
            <CardTitle tag='h5'>Card title</CardTitle>
            <CardSubtitle tag='h6' className='mb-2 text-muted'>
              Card subtitle
            </CardSubtitle>
            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
            <button className='btn btn-primary'>Update</button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}
