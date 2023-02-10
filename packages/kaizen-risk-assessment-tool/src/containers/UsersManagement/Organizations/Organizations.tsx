import React, { useState, useEffect } from 'react';
import {
  InputAdornment,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Select,
  Box,
  TextField,
  Button,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Pagination from '@material-ui/lab/Pagination';
import SearchIcon from '@material-ui/icons/Search';
import { useSelector, useDispatch } from 'react-redux';
import AddOrganizationDialog from '../AddOrganizationDialog/AddOrganizationDialog';
import { selectOrganizationsList, getOrganizationsRequested } from './reducer';
import {
  INDUSTRY,
  REQUEST_STATUS,
  ORGANIZATION_LIMIT_TEXT_SHOW_TOOLTIP,
  SKELETON_LOADING_TYPE,
} from '../../../constants/common';
import showingRecordsPagination from '../../../utils/showingRecordsPagination';
import { TableContent, TablePagination, TableText } from './styles';
import SkeletonLoading from '../../../components/SkeletonLoading';

function Organizations() {
  const DEFAULT_ROWS_PER_PAGE_OPTIONS = [10, 20, 50, 100];
  const columns = [
    { id: 'organization_name', label: 'Organisation Name' },
    { id: 'industry', label: 'Industry' },
    {
      id: 'number_of_users',
      label: 'Number Of Users',
      align: 'center',
    },
  ];
  const DEFAULT_OFFSET = 0;
  const DEFAULT_PAGE = 1;
  const [isLoading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [isOpenORGDialog, setIsOpenORGDialog] = useState(false);
  const [offset, setOffset] = useState(DEFAULT_OFFSET);
  const [limit, setLimit] = useState(10);
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [searchedCharacters, setSearchedCharacters] = useState('');
  const dispatch = useDispatch();
  const organizationsData = useSelector(selectOrganizationsList);
  const organizationsList = organizationsData?.list;
  const industryList = [INDUSTRY.LAW, INDUSTRY.ACCOUNTING];

  const handleChangePage = (page) => {
    setCurrentPage(page);
    setOffset((page - 1) * limit);
  };

  const getNumbersOfPages = React.useMemo(() => {
    const totalRecords = organizationsData?.totalCount;
    return totalRecords % limit === 0
      ? totalRecords / limit
      : Math.floor(totalRecords / limit) + 1;
  }, [organizationsData?.totalCount, limit]);

  const handleChangeLimit = (e) => {
    setOffset(DEFAULT_OFFSET);
    setCurrentPage(DEFAULT_PAGE);
    setLimit(e.target.value);
  };

  const handleChangeSearch = (e) => {
    setOffset(DEFAULT_OFFSET);
    setCurrentPage(DEFAULT_PAGE);
    setSearchedCharacters(e.target.value);
  };

  const handleOpenOrganizationDialog = () => {
    setIsOpenORGDialog(true);
  };

  const handleCloseOrganizationDialog = () => {
    setIsOpenORGDialog(false);
  };

  const getOrganizationsData = () => {
    dispatch(
      getOrganizationsRequested({
        limit,
        offset,
        selectedIndustry,
        searchedCharacters,
      })
    );
  };

  useEffect(() => {
    getOrganizationsData();
  }, [
    offset,
    limit,
    selectedIndustry,
    searchedCharacters,
    organizationsData?.isUpdateOrganizationSuccess,
  ]);

  useEffect(() => {
    setLoading(
      organizationsData?.getOrganizationsStatus === REQUEST_STATUS.REQUESTING
    );
  }, [organizationsData?.getOrganizationsStatus]);

  return (
    <>
      <TableContent>
        <Box className="table-content-container">
          <Box className="table-content-wrapper">
            <div>
              <TextField
                variant="outlined"
                placeholder="Search Organisation"
                onChange={handleChangeSearch}
                style={{ width: 240, marginRight: '30px' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon style={{ color: 'rgba(0,0,0,0.35)' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div>
              <Autocomplete
                options={industryList}
                getOptionLabel={(option) =>
                  option.charAt(0).toUpperCase() + option.slice(1)
                }
                getOptionSelected={(option) => option}
                onInputChange={(event, newValue) => {
                  setOffset(DEFAULT_OFFSET);
                  setCurrentPage(DEFAULT_PAGE);
                  setSelectedIndustry(newValue);
                }}

                style={{ width: 240 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Industry"
                    variant="outlined"
                  />
                )}
              />
            </div>
          </Box>
          <div className="add-organization">
            <Box className="functional-group">
              <Button
                color="primary"
                style={{ textTransform: 'capitalize' }}
                variant="contained"
                onClick={handleOpenOrganizationDialog}
              >
                Add Organisation
              </Button>
            </Box>
          </div>
        </Box>
        <TableContainer>
          <Table>
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

            {!isLoading ? (
              <TableBody>
                {organizationsList?.length === 0 && !isLoading && (
                  <TableRow>
                    <TableCell colSpan={10} className="empty_data">
                      <Typography>No records</Typography>
                    </TableCell>
                  </TableRow>
                )}
                {organizationsList?.map((row) => {
                  return (
                    <TableRow key={row.id} className="clientList_row">
                      <TableCell>
                        {row?.name.length >
                        ORGANIZATION_LIMIT_TEXT_SHOW_TOOLTIP ? (
                          <Tooltip
                            title={
                              <Box style={{ whiteSpace: 'pre-wrap' }}>
                                {row?.name}
                              </Box>
                            }
                          >
                            <TableText>{`${row?.name.slice(
                              0,
                              ORGANIZATION_LIMIT_TEXT_SHOW_TOOLTIP
                            )}...`}</TableText>
                          </Tooltip>
                        ) : (
                          <TableText>{row.name}</TableText>
                        )}
                      </TableCell>

                      <TableCell>
                        <TableText>{row.industry}</TableText>
                      </TableCell>

                      <TableCell align="center">
                        <TableText>{row.usersNumber}</TableText>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            ) : (
              <SkeletonLoading
                loadingType={SKELETON_LOADING_TYPE.TABLE}
                rowPerPage={10}
                cellPerRow={3}
              />
            )}
          </Table>
        </TableContainer>

        <TablePagination>
          <div className="rows_per_page">
            <Select native variant="outlined" onChange={handleChangeLimit}>
              {DEFAULT_ROWS_PER_PAGE_OPTIONS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
            <Typography>
              {showingRecordsPagination(
                organizationsData.totalCount,
                currentPage,
                limit
              )}
            </Typography>
          </div>

          <Pagination
            color="primary"
            shape="rounded"
            count={getNumbersOfPages}
            page={currentPage}
            onChange={(e, page) => handleChangePage(page)}
          />
        </TablePagination>
        <AddOrganizationDialog
          isOpen={isOpenORGDialog}
          org={industryList}
          handleClose={handleCloseOrganizationDialog}
          getOrganizationsData={getOrganizationsData}
        />
      </TableContent>
    </>
  );
}

export default Organizations;
