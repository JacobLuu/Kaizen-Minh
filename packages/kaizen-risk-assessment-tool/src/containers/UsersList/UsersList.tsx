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
  Select,
  Box,
  TextField,
  Button,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Pagination from '@material-ui/lab/Pagination';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectOrganizationsList,
  getOrganizationsRequested,
} from '../UsersManagement/Organizations/reducer';
import { selectUsersList, getUsersRequested } from './reducer';
import AddUserDialog from './components/AddUserDialog/AddUserDialog';
import UsersListRow from './UsersListRow';
import { isAdmin, isSuperAdmin } from '../../utils/roles';
import showingRecordsPagination from '../../utils/showingRecordsPagination';
import {
  ROLES,
  REQUEST_STATUS,
  SKELETON_LOADING_TYPE,
} from '../../constants/common';
import SkeletonLoading from '../../components/SkeletonLoading';

import { TableContent, TablePagination } from './styles';

function UsersList() {
  const dispatch = useDispatch();
  const usersData = useSelector(selectUsersList);
  const usersList = usersData?.list;
  const organizationsData = useSelector(selectOrganizationsList);
  const DEFAULT_OFFSET = 0;
  const DEFAULT_PAGE = 1;
  const [isLoading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [offset, setOffset] = useState(DEFAULT_OFFSET);
  const [limit, setLimit] = useState(10);
  const [selectedOrganization, setSelectedOrganization] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [searchedCharacters, setSearchedCharacters] = useState('');
  const [isOpenAddUserDialog, setIsOpenAddUserDialog] = useState(false);
  const DEFAULT_ROWS_PER_PAGE_OPTIONS = [10, 20, 50, 100];

  const organizationsList = organizationsData?.list
    .map((org) => ({
      id: org.id,
      orgName: org.name,
    }))
    .filter(
      (org, index, self) =>
        index === self.findIndex((t) => t.id === org.id && t.name === org.name)
    );

  const rolesList = [ROLES.ADMIN, ROLES.MANAGER, ROLES.USER];

  const handleChangePage = (page) => {
    setCurrentPage(page);
    setOffset((page - 1) * limit);
  };

  const getNumbersOfPages = React.useMemo(() => {
    const totalRecords = usersData?.totalCount;
    return totalRecords % limit === 0
      ? totalRecords / limit
      : Math.floor(totalRecords / limit) + 1;
  }, [usersData?.totalCount, limit]);

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
  const columns = [
    { id: 'user_name', label: 'User Name' },
    { id: 'email', label: 'Email Address' },
    {
      id: 'organization',
      label: 'Organisation',
    },
    {
      id: 'role',
      label: 'Role',
    },
    {
      id: 'status',
      label: 'Status',
      align: 'center',
    },
  ];

  const handleOpenAddUserDialog = () => {
    setIsOpenAddUserDialog(true);
  };

  const handleCloseAddUserDialog = () => {
    setIsOpenAddUserDialog(false);
  };

  const getUsersData = () => {
    dispatch(
      getUsersRequested({
        limit,
        offset,
        selectedRole,
        searchedCharacters,
        selectedOrganization,
      })
    );
  };

  useEffect(() => {
    getUsersData();
  }, [
    offset,
    limit,
    selectedOrganization,
    selectedRole,
    searchedCharacters,
    usersData?.isUpdateUserSuccess,
  ]);

  useEffect(() => {
    if (isSuperAdmin()) {
      // LIMIT = 1000 -> temporary for this phase
      dispatch(
        getOrganizationsRequested({
          limit: 1000,
          offset: 0,
          selectedIndustry: '',
          searchedCharacters: '',
        })
      );
    }
  }, []);

  useEffect(() => {
    setLoading(usersData?.getUsersStatus === REQUEST_STATUS.REQUESTING);
  }, [usersData?.getUsersStatus]);

  return (
    <>
      <TableContent>
        <Box className="table-content-container">
          <Box className="table-content-wrapper">
            <Box className="filter-item">
              <TextField
                variant="outlined"
                placeholder="Search User"
                style={{ width: 225 }}
                onChange={handleChangeSearch}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon style={{ color: 'rgba(0,0,0,0.35)' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            {isSuperAdmin() && (
              <Box className="filter-item">
                <Autocomplete
                  options={organizationsList}
                  style={{ width: 225 }}
                  getOptionLabel={(option) => option.orgName}
                  getOptionSelected={(option) => option.id}
                  onChange={(event, option) => {
                    setOffset(DEFAULT_OFFSET);
                    setCurrentPage(DEFAULT_PAGE);
                    setSelectedOrganization(option?.id);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Organisation"
                      variant="outlined"
                    />
                  )}
                />
              </Box>
            )}
            <Box className="filter-item">
              <Autocomplete
                options={rolesList}
                style={{ width: 225 }}
                getOptionLabel={(option) =>
                  option.charAt(0).toUpperCase() + option.slice(1)
                }
                getOptionSelected={(option) => option}
                onInputChange={(event, newValue) => {
                  setOffset(DEFAULT_OFFSET);
                  setCurrentPage(DEFAULT_PAGE);
                  setSelectedRole(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Role"
                    variant="outlined"
                  />
                )}
              />
            </Box>
          </Box>
          {(isAdmin() || isSuperAdmin()) && (
            <Box className="add-user-button">
              <Box className="functional-group">
                <Button
                  color="primary"
                  style={{ textTransform: 'capitalize' }}
                  variant="contained"
                  onClick={handleOpenAddUserDialog}
                >
                  Add User
                </Button>
              </Box>
            </Box>
          )}
        </Box>
        <TableContainer>
          <Table>
            <colgroup>
              <col style={{ width: '15%' }} />
              <col style={{ width: '25%' }} />
              <col style={{ width: '15%' }} />
              {isAdmin() || isSuperAdmin() ? (
                <>
                  <col style={{ width: '15%' }} />
                  <col style={{ width: '15%' }} />
                  <col style={{ width: '05%' }} />
                </>
              ) : (
                <>
                  <col style={{ width: '15%' }} />
                  <col style={{ width: '15%' }} />
                </>
              )}
            </colgroup>
            <TableHead>
              <TableRow className="clientList_header">
                {columns?.map((column) => (
                  <TableCell key={column.id} align={column?.align}>
                    <Typography className="table_text_header">
                      {column.label}
                    </Typography>
                  </TableCell>
                ))}
                {(isAdmin() || isSuperAdmin()) && (
                  <TableCell>
                    <Typography className="table_text_header">
                      Action
                    </Typography>
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            {!isLoading ? (
              <TableBody>
                {usersList?.length === 0 && !isLoading && (
                  <TableRow>
                    <TableCell colSpan={10} className="empty_data">
                      <Typography>No records</Typography>
                    </TableCell>
                  </TableRow>
                )}
                {usersList.map((row) => (
                  <UsersListRow
                    key={row.id}
                    id={row.id}
                    name={row.name}
                    email={row.email}
                    organization={row.organization}
                    role={row.roles}
                    rolesList={rolesList}
                    status={row.status}
                  />
                ))}
              </TableBody>
            ) : (
              <SkeletonLoading
                loadingType={SKELETON_LOADING_TYPE.TABLE}
                rowPerPage={10}
                cellPerRow={6}
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
                usersData.totalCount,
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
        <AddUserDialog
          isOpen={isOpenAddUserDialog}
          roles={rolesList}
          organizations={organizationsList}
          handleClose={handleCloseAddUserDialog}
        />
      </TableContent>
    </>
  );
}

export default UsersList;
