import React, { useMemo, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import moment from 'moment';
import axios from 'axios';
import DocumentDetail from '../Document/DocumentDetails';

export default function FileDownloadTable(props) {
  const { data } = props;
  data?.map(d => {
    d.uploader_name = d.uploader_name ?? 'Unknown';
    d.status = d.status ?? 'Not processed';
    d.created_at = moment(d.created_at, 'YYYY-MM-DDTHH:mm:ssZ').format('DD/MM/YYYY HH:mm');
  });

  const [fileSelected, setFileSelected] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState(null);

  const editDocument = (id) => {
    setSelectedFileId(id);
    setFileSelected(true);
  }

  const downloadFile = async (id) => {
    id && await axios.get(`https://26b8cf35526e.ngrok.io/documents/presignedUrl/${id}`, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': 'attachment',
      }
    }).then((request) => {
      if (request.data != null) {
        window.location.href = request.data;
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  const columns = useMemo(
    () => [
      { headerName: 'File name', field: 'name', width: 150 },
      { headerName: 'File type', field: 'type', width: 150, },
      { headerName: 'Uploader', field: 'uploader_name', width: 150, },
      { headerName: 'Upload date', field: 'created_at', width: 200, },
      { headerName: 'Status', field: 'status', width: 150, },
      {
        headerName: 'Edit', field: 'edit', width: 150, renderCell: (params) => (
          <strong>
            <Button
              variant="contained"
              color="primary-info"
              size="small"
              style={{ marginLeft: 16 }}
              onClick={() => { editDocument(params.row.id) }}
            >
              Edit
            </Button>
          </strong>
        ),
      },
      {
        headerName: 'Download', field: 'download', width: 150, renderCell: (params) => (
          <strong>
            <Button
              variant="contained"
              color="primary-info"
              size="small"
              style={{ marginLeft: 16 }}
              onClick={async () => { await downloadFile(params.row.id) }}
            >
              Download
            </Button>
          </strong>
        ),
      }
    ], []);
  return (
    <div style={{ height: 530, width: '100%' }}>
      {
        !fileSelected ?
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={8}
            isRowSelectable={false}
            checkboxSelection
          /> :
          <DocumentDetail
            setFileSelected={setFileSelected}
            setSelectedFileId={setSelectedFileId}
            selectedFileId={selectedFileId}
          />
      }
    </div>
  );
}