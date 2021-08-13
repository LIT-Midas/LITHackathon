import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { Row, Col, Card, CardHeader, CardText, CardBody, CardTitle, CardSubtitle, Table } from 'reactstrap';

export default function DocumentDetail() {
  const [document, setDocument] = useState(null);

  useEffect(() => {
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
          <Col></Col>
          <Col>
            <Row>
              <h2>Document Name</h2>
            </Row>
            <Row>
              <TextField id='standard-basic' defaultValue='Title of Doc' />
            </Row>
            <Row>
              <Col>
                <Row>
                  <h4>Uploaded By</h4>
                </Row>
                <Row>
                  <TextField id='standard-basic' defaultValue='Uploader Name' />
                </Row>
              </Col>
              <Col>
                <Row>
                  <h4>Uploaded On</h4>
                </Row>
                <Row>
                  <TextField id='standard-basic' defaultValue='Upload Date String' />
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
                <tbody></tbody>
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
