import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import moment from 'moment';
import React, { useMemo } from 'react';

export default function FileDownloadTable(props) {
  const { data, setFileSelected, setSelectedFileId } = props;
  data?.map(d => {
    d.uploader_name = d.uploader_name ?? 'Unknown';
    d.status = d.status ?? 'Not processed';
    d.created_at = moment(d.created_at, 'YYYY-MM-DDTHH:mm:ssZ').format('DD/MM/YYYY HH:mm');
  });

  const downloadFile = async (id) => {
    id && await axios.get(`http://node-express-env.eba-ubjpmur8.us-east-2.elasticbeanstalk.com/documents/presignedUrl/${id}`, {
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
              onClick={() => { setFileSelected(true); setSelectedFileId(params.row.id); }}
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
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={8}
        isRowSelectable={false}
        checkboxSelection
      />
    </div>
  );
}