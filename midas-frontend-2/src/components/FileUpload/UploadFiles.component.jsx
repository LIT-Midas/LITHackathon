import axios from "axios";
import React, { useState, useContext } from "react";
import { Col, Form, Row } from 'reactstrap';
import { CaseContext } from "../../services/case.js";
import { AccountContext } from "../../services/account.js";
import FileUpload from "./FileUpload.component.jsx";

const UploadFiles = (props) => {
  const [newDocuments, setNewDocuments] = useState({
    documents: []
  });
  const { setOpenUpload, fetchDocuments } = props;
  const { name, persona } = useContext(AccountContext);
  const { selectedCase } = useContext(CaseContext);

  const updateUploadedFiles = (files) => {
    setNewDocuments({ ...newDocuments, documents: files });
  };

  const uploadDocuments = async () => {
    const formData = new FormData();

    newDocuments.documents.forEach(file => {
      formData.append("files", file);
    });
    formData.append("claim_id", selectedCase);
    formData.append("uploader_name", name);
    formData.append("persona", persona);
    await axios.post('http://node-express-env.eba-ubjpmur8.us-east-2.elasticbeanstalk.com/documents', formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then((response) => {
      if (response?.status === 200) {
        console.log('successfully uploaded documents');
      }
      fetchDocuments();
    }).catch((error) => {
      console.error('Error uploading documents: ' + error);
    })
    setOpenUpload(false);
  }

  return (
    <div>
      <Form className={'mx-4'}>
        <FileUpload
          accept=".jpg,.png,.jpeg,.pdf,.mp4,.mov,.wmv"
          multiple
          updateFilesCb={updateUploadedFiles}
        />
        <Row className={'pb-2 upload-button'}>
          <Col>
            <button type='button' className={'btn btn-primary'} onClick={uploadDocuments}>
              Upload
            </button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default UploadFiles;