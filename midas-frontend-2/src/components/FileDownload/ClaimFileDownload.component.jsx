import React, { useState, useContext, useEffect } from "react";
import axios from 'axios';
import FileDownloadTable from "./FileDownloadTable.component";
import { CaseContext } from "../../services/case";
import { Container } from "reactstrap";

const ClaimFileDownload = () => {
  const { selectedCase } = useContext(CaseContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDocuments();
  }, [])

  const fetchDocuments = async () => {
    if (selectedCase != null && selectedCase != '') {
      await axios.get(`http://node-express-env.eba-ubjpmur8.us-east-2.elasticbeanstalk.com/documents/claim/${selectedCase}`, {
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

  return (
    <div style={{ height: 530, width: '100%' }}>
      <FileDownloadTable data={data} />
    </div>
  )
}
export default ClaimFileDownload;