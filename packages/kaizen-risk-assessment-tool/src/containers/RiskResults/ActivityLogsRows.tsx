import React from 'react';
import { Typography, TableCell, TableRow } from '@material-ui/core';
import moment from 'moment';

const ActivityLogsRows = ({ row }: any) => {
  return (
    <TableRow hover className="activity_log_row">
      <TableCell className="activity_log_column">
        <Typography className="table_text">
          {moment.unix(row.updated_at).format('DD/MM/YYYY, h:mm A')}
        </Typography>
      </TableCell>

      <TableCell className="activity_log_column">
        <Typography className="table_text">{row?.log_type}</Typography>
      </TableCell>

      <TableCell className="activity_log_column">
        <Typography className="table_text">{row?.user?.name}</Typography>
      </TableCell>
    </TableRow>
  );
};

export default ActivityLogsRows;
