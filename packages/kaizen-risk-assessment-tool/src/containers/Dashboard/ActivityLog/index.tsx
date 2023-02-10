import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { getActivityLogRequest, selectActivityLog } from './reducer';
import { Wrapper } from './styles';
import upperCaseFirstCharacter from '../../../utils/upperCaseFirstCharacter';
import {
  REQUEST_STATUS,
  SKELETON_LOADING_TYPE,
} from '../../../constants/common';
import history from '../../../utils/history';
import CLIENT_PATH from '../../../constants/clientPath';
import { isStandardUser } from '../../../utils/roles';
import { ACCOUNT_INFO } from '../../../constants/localStorage';
import SkeletonLoading from '../../../components/SkeletonLoading';

function ActivityLog() {
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const { data: activityLogList, getActivityLogStatus } =
    useSelector(selectActivityLog);
  const dispatch = useDispatch();
  const accountInfo = JSON.parse(localStorage.getItem(ACCOUNT_INFO));

  const columns = [
    { id: 'case_id_activityLog', label: 'Case ID' },
    { id: 'log_type_activityLog', label: 'Log Type' },
    {
      id: 'date',
      label: 'Date',
    },
    {
      id: 'done_by',
      label: 'Completed By',
    },
  ];

  const activityLogListByUserRole = React.useMemo(() => {
    if (isStandardUser()) {
      return activityLogList.filter(
        (activityLogItem) => activityLogItem?.user?.id === accountInfo.id
      );
    }
    return activityLogList;
  }, [accountInfo, activityLogList]);

  useEffect(() => {
    dispatch(getActivityLogRequest());
  }, []);

  useEffect(() => {
    setIsLoadingPage(getActivityLogStatus === REQUEST_STATUS.REQUESTING);
  }, [getActivityLogStatus]);

  return (
    <Wrapper>
      <Typography className="header_title">ACTIVITY LOG</Typography>
      <TableContainer style={{ maxHeight: 275 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow className="clientList_header">
              {columns?.map((column) => (
                <TableCell key={column.id} align={column?.align}>
                  <Typography className="table_text_header">
                    {column.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {!isLoadingPage ? (
            <TableBody>
              {activityLogListByUserRole?.length === 0 && !isLoadingPage && (
                <TableRow>
                  <TableCell
                    colSpan={100}
                    className="empty_data"
                    align="center"
                  >
                    <Typography>No records</Typography>
                  </TableCell>
                </TableRow>
              )}
              {activityLogListByUserRole?.map((row) => {
                return (
                  <TableRow key={row.id} className="clientList_row">
                    <TableCell className="clientList_column">
                      <Typography
                        className="case_id_text"
                        onClick={() => {
                          history.push({
                            pathname: `${CLIENT_PATH.RISK_RESULT}/${row.assessment?.id}`,
                          });
                        }}
                      >
                        {row.assessment?.case_id}
                      </Typography>
                    </TableCell>

                    <TableCell className="clientList_column">
                      <Typography className="table_text">
                        {upperCaseFirstCharacter(row.log_type)}
                      </Typography>
                    </TableCell>

                    <TableCell className="clientList_column">
                      <Typography className="table_text">
                        {moment
                          .unix(row.updated_at)
                          .format('DD/MM/YYYY, hh:mm a')
                          ?.toLocaleUpperCase()}
                      </Typography>
                    </TableCell>

                    <TableCell className="clientList_column">
                      <Typography className="table_text">
                        {row.user?.name}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          ) : (
            <SkeletonLoading
              loadingType={SKELETON_LOADING_TYPE.TABLE}
              rowPerPage={10}
              cellPerRow={4}
            />
          )}
        </Table>
      </TableContainer>
    </Wrapper>
  );
}

export default ActivityLog;
