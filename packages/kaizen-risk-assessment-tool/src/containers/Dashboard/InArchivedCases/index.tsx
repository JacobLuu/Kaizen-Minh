import React, { useState, useEffect, useRef } from 'react';
import {
  InputAdornment,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  Button,
  Checkbox,
  TextField,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import MomentUtils from '@date-io/moment';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch, useSelector } from 'react-redux';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from 'moment';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import AssessmentDialog from '../AsssessmentsDialog';
import {
  KAIZEN_BLUE_LINK,
  KAIZEN_TEXT_RATING_HIGH,
} from '../../../themes/colors';
import {
  getHistoryDataRequest,
  selectDashboardStore,
  setCurrentActionPayload,
  clearAll,
} from '../reducer';
import {
  MAX_DATE,
  MIN_DATE,
  CHANGE_ASSESSMENT_CASE_ACTION,
  ASSESSMENT_STATUS,
  REQUEST_STATUS,
  SKELETON_LOADING_TYPE,
} from '../../../constants/common';
import history from '../../../utils/history';
import { isStandardUser } from '../../../utils/roles';
import upperCaseFirstCharacter from '../../../utils/upperCaseFirstCharacter';
import showingRecordsPagination from '../../../utils/showingRecordsPagination';
import {
  TableContent,
  Text,
  TablePagination,
  InProgressContainer,
} from './styles';
import { HtmlTooltip, Toolbar } from '../styles';
import CLIENT_PATH from '../../../constants/clientPath';
import handleClickCheckbox from '../../../utils/selectCheckedItemList';
import { setErrorMessages } from '../../Global/reducer';
import TOAST_MESSAGE from '../../../constants/toastMessage';
import SkeletonLoading from '../../../components/SkeletonLoading';

const today = moment();
const initialDate = null;

function InArchivedCases() {
  const ROW_PER_PAGE_DEFAULT = 10;
  const ROWS_PER_PAGE_OPTIONS_DEFAULT = [10, 20, 50, 100];
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ROW_PER_PAGE_DEFAULT);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [checkboxSelected, setCheckboxSelected] = useState([]);
  const columns = [
    { id: 'case_id', label: 'Case ID' },
    { id: 'client_name', label: 'Client Name' },
    { id: 'client_type', label: 'Client Type' },
    { id: 'entity_name', label: 'Entity Type' },
    { id: 'status', label: 'Status', align: 'center' },
    { id: 'archived_by', label: 'Archived By' },
    { id: 'archived_at', label: 'Archived At' },
  ];
  const [selectedDateFrom, setSelectedDateFrom] = useState<Date | null>(
    initialDate
  );
  const [selectedDateTo, setSelectedDateTo] = useState<Date | null>(
    initialDate
  );

  const {
    getDataHistory,
    getDataHistoryList,
    isUpdateCaseStatus,
    historyUpdateStatus,
  } = useSelector(selectDashboardStore);
  const dispatch = useDispatch();

  const callApiDashboard = (payload) => {
    dispatch(getHistoryDataRequest(payload));
  };

  const APIObject = useRef({
    offset,
    search: searchValue,
    limit: rowsPerPage,
    order: 'updated_at',
    is_archived: 'true',
  });

  const setDefaultPage = () => {
    setPage(1);
  };

  const handleSearch = (e) => {
    const { value } = e.target;

    APIObject.current = {
      ...APIObject.current,
      offset: 0,
      search: value,
    };
    setDefaultPage();
    callApiDashboard(APIObject.current);
    setSearchValue(value);
  };

  const handleChangePage = (event: unknown, number) => {
    let offsetForAPI = 0;

    setPage(number);

    if (number === 1) {
      setOffset(0);
      offsetForAPI = 0;
    } else {
      const offsetNumber = (number - 1) * rowsPerPage;
      setOffset(offsetNumber);
      offsetForAPI = offsetNumber;
    }

    APIObject.current = {
      ...APIObject.current,
      offset: offsetForAPI,
    };

    callApiDashboard(APIObject.current);
  };

  const handleChangeRowsPerPage = (event) => {
    const { value } = event.target;

    APIObject.current = {
      ...APIObject.current,
      offset: 0,
      limit: value,
    };
    setDefaultPage();
    callApiDashboard(APIObject.current);
    setRowsPerPage(parseInt(value, 10));
    setOffset(0);
  };

  const handleChangeDateFrom = (date: Date | null) => {
    const dataTime = date?.minutes(0).seconds(0);
    setSelectedDateFrom(date);

    if (
      dataTime?.isValid() &&
      dataTime <= (selectedDateTo !== null ? selectedDateTo : MAX_DATE) &&
      dataTime >= MIN_DATE
    ) {
      APIObject.current = {
        ...APIObject.current,
        offset: 0,
        date_from: moment(dataTime).unix(),
      };
      callApiDashboard(APIObject.current);
    }

    if (date === null) {
      APIObject.current = {
        ...APIObject.current,
        offset: 0,
        date_to: selectedDateTo
          ? moment(selectedDateTo).unix()
          : moment(MAX_DATE).unix(),
        date_from: moment(MIN_DATE).unix(),
      };
      callApiDashboard(APIObject.current);
    }
    setDefaultPage();
  };

  const handleChangeDateTo = (date: Date | null) => {
    const dataTime = date?.minutes(0).seconds(0);
    setSelectedDateTo(date);

    if (
      dataTime?.isValid() &&
      dataTime <= MAX_DATE &&
      dataTime >= (selectedDateFrom !== null ? selectedDateFrom : MIN_DATE)
    ) {
      APIObject.current = {
        ...APIObject.current,
        offset: 0,
        date_to: moment(dataTime).unix(),
      };
      callApiDashboard(APIObject.current);
    }

    if (date === null) {
      APIObject.current = {
        ...APIObject.current,
        offset: 0,
        date_to: moment(MAX_DATE).unix(),
        date_from: selectedDateFrom
          ? moment(selectedDateFrom).unix()
          : moment(MIN_DATE).unix(),
      };
      callApiDashboard(APIObject.current);
    }
    setDefaultPage();
  };

  const handleOpenUnArchiveAction = () => {
    if (checkboxSelected.length > 0) {
      dispatch(
        setCurrentActionPayload(CHANGE_ASSESSMENT_CASE_ACTION.UNARCHIVE)
      );
      setCurrentAction(CHANGE_ASSESSMENT_CASE_ACTION.UNARCHIVE);
      setIsOpenDialog(true);
    } else {
      dispatch(setErrorMessages([TOAST_MESSAGE.CASE_ACTION_MESSAGES.WARNING]));
    }
  };

  useEffect(() => {
    callApiDashboard(APIObject.current);

    setCheckboxSelected([]);
    return () => {
      dispatch(clearAll());
    };
  }, [isUpdateCaseStatus]);

  useEffect(() => {
    setIsLoadingPage(historyUpdateStatus === REQUEST_STATUS.REQUESTING);
  }, [historyUpdateStatus]);

  return (
    <InProgressContainer>
      <div className="header-section">
        <div className="filter-section">
          <div className="search-filter">
            <TextField
              style={{ width: '260px' }}
              variant="outlined"
              onChange={handleSearch}
              placeholder="Search by Client name, case ID"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon style={{ color: 'rgba(0,0,0,0.35)' }} />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="date-filter-container">
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <div className="date-filter-inner">
                <div className="group_date_picker">
                  <Typography>From:</Typography>
                  <KeyboardDatePicker
                    inputVariant="outlined"
                    autoOk
                    disableFuture
                    margin="normal"
                    format="DD/MM/YYYY"
                    maxDate={
                      selectedDateTo !== null ? selectedDateTo : MAX_DATE
                    }
                    placeholder="DD/MM/YYYY"
                    value={selectedDateFrom}
                    onChange={handleChangeDateFrom}
                    InputAdornmentProps={{ position: 'end' }}
                  />
                </div>

                <div className="group_date_picker">
                  <Typography>To:</Typography>
                  <KeyboardDatePicker
                    inputVariant="outlined"
                    autoOk
                    disableFuture
                    margin="normal"
                    format="DD/MM/yyyy"
                    placeholder="DD/MM/YYYY"
                    maxDate={today}
                    minDate={
                      selectedDateFrom !== null ? selectedDateFrom : MIN_DATE
                    }
                    value={selectedDateTo}
                    onChange={handleChangeDateTo}
                    InputAdornmentProps={{ position: 'end' }}
                  />
                </div>
              </div>
            </MuiPickersUtilsProvider>
          </div>
        </div>
        {!isStandardUser() && (
          <div className="button-section">
            <Toolbar>
              {!isStandardUser() && (
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={handleOpenUnArchiveAction}
                >
                  Unarchive
                </Button>
              )}
            </Toolbar>
          </div>
        )}
      </div>

      <TableContent>
        <TableContainer>
          <Table>
            <colgroup>
              <col style={{ width: '60px' }} />
              <col style={{ width: '120px' }} />
              <col style={{ width: '120px' }} />
              <col style={{ width: '200px' }} />
              <col style={{ width: '100px' }} />
              <col style={{ width: '150px' }} />
              <col style={{ width: '150px' }} />
              <col style={{ width: '150px' }} />
            </colgroup>
            <TableHead>
              <TableRow>
                <TableCell />
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
                {getDataHistoryList.length <= 0 && !isLoadingPage && (
                  <TableRow>
                    <TableCell colSpan={10} className="empty_data">
                      <Typography>No records</Typography>
                    </TableCell>
                  </TableRow>
                )}
                {getDataHistoryList.map((row) => (
                  <TableRow key={row.case_id}>
                    <TableCell className="wrapper_case_id">
                      {row.is_can_unarchive && (
                        <Checkbox
                          style={{
                            color: KAIZEN_BLUE_LINK,
                            width: 30,
                            height: 30,
                          }}
                          checked={checkboxSelected.some(
                            (data) => data.case_id === row.case_id
                          )}
                          color="primary"
                          onClick={(event) =>
                            handleClickCheckbox(
                              event,
                              row.case_id,
                              row.client_name,
                              checkboxSelected,
                              setCheckboxSelected
                            )
                          }
                          key={row.case_id || '-'}
                        />
                      )}
                    </TableCell>

                    <TableCell className="wrapper_case_id">
                      <div className="case_ID">
                        <div
                          style={{
                            color: KAIZEN_BLUE_LINK,
                            cursor: 'pointer',
                            width: '55px',
                          }}
                        >
                          <Typography
                            onClick={() => {
                              history.push({
                                pathname: `${CLIENT_PATH.RISK_RESULT}/${row.id}`,
                              });
                            }}
                          >
                            {row.case_id}
                          </Typography>
                        </div>
                        <div style={{ color: KAIZEN_TEXT_RATING_HIGH }}>
                          {row.is_prohibited === true && (
                            <HtmlTooltip
                              arrow
                              placement="right"
                              title="Prohibited Client"
                            >
                              <ReportProblemOutlinedIcon
                                style={{ color: KAIZEN_TEXT_RATING_HIGH }}
                                fontSize="small"
                              />
                            </HtmlTooltip>
                          )}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="wrapper_row_text">
                      <Text>{row.client_name || '-'}</Text>
                    </TableCell>

                    <TableCell className="wrapper_row_text">
                      <Text>{row.client_type || '-'}</Text>
                    </TableCell>

                    <TableCell className="wrapper_row_text">
                      <Text>
                        {upperCaseFirstCharacter(row.target_type) || '-'}
                      </Text>
                    </TableCell>

                    <TableCell>
                      <div
                        className={
                          row.is_can_unarchive ? 'status' : 'status_disable'
                        }
                      >
                        {row.status === ASSESSMENT_STATUS.IN_PROGRESS
                          ? 'In Progress'
                          : row.status === ASSESSMENT_STATUS.PENDING_REVIEW
                          ? 'Pending Review'
                          : 'Completed'}
                      </div>
                    </TableCell>

                    <TableCell className="wrapper_row_text">
                      <Text>{row.archived_user?.name || '-'}</Text>
                    </TableCell>

                    <TableCell className="wrapper_row_text">
                      <Text>{moment.unix(row.archived_at).format('L')}</Text>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <SkeletonLoading
                loadingType={SKELETON_LOADING_TYPE.TABLE}
                rowPerPage={10}
                cellPerRow={8}
              />
            )}
          </Table>
        </TableContainer>

        <TablePagination>
          <div className="rows_per_page">
            <Select
              native
              variant="outlined"
              onChange={handleChangeRowsPerPage}
            >
              {ROWS_PER_PAGE_OPTIONS_DEFAULT.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
            <Typography>
              {showingRecordsPagination(
                getDataHistory.totalCount,
                page,
                rowsPerPage
              )}
            </Typography>
          </div>

          <Pagination
            page={page}
            count={Math.ceil(getDataHistory.totalCount / rowsPerPage)}
            shape="rounded"
            onChange={handleChangePage}
          />
        </TablePagination>
      </TableContent>
      <AssessmentDialog
        action={currentAction}
        open={isOpenDialog}
        handleClose={setIsOpenDialog}
        selectedCases={checkboxSelected}
      />
    </InProgressContainer>
  );
}

export default InArchivedCases;
