import React, { useEffect } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  Button,
  Box,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { Prompt } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import validation from '../../../translations/validation';
import { ProhibitedClient, TablePagination } from '../styles.ts';
import DialogProhibitedClientList from './DialogProhibitedClientList';
import useValidationResolver from '../../../utils/hookValidationResolver';
import { MAX_DATE, MIN_DATE } from '../../../constants/common';
import { setLocationPrompt } from '../../../utils/locationPrompt';
import { convertTimeToStartOfDay } from '../../../utils/momentHelpers';
import ProhibitedClientListRows from './ProhibitedClientListRows';
import {
  selectCorporateProhibitedSlice,
  getCorporateProhibitedClientsRequest,
  addCorporateProhibitedClientsRequest,
} from './reducer';

interface ColumnsType {
  id?: string;
  label?: string;
  align?: string;
}

const DEFAULT_ROW_PER_PAGE = 10;
const DEFAULT_ROWS_PER_PAGE_OPTIONS = [10, 20, 50, 100];
const columns: Array<ColumnsType> = [
  { id: 'company_name', label: 'Company Name' },
  { id: 'company_number', label: 'Company Number' },
  {
    id: 'date_of_incorporation',
    label: 'Date of incorporation',
  },
  {
    id: 'action',
    label: 'Action',
    align: 'right',
  },
];

function ProhibitedClientList() {
  const [page, setPage] = React.useState(1);
  const [offset, setOffset] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROW_PER_PAGE);
  const [companySpecialStateStatus, setCompanySpecialStateStatus] =
    React.useState(false);
  const [isOpenDialog, setOpenDialog] = React.useState(false);

  const {
    corporateProhibitedClients,
    corporateProhibitedClientsTotalCount,
    isDeleteCorporateProhibitedClientsStatus,
    isAddCorporateProhibitedClientsStatus,
  } = useSelector(selectCorporateProhibitedSlice);

  const dispatch = useDispatch();

  const schemaObj = Yup.object().shape({
    company_name: Yup.string()
      .trim()
      .required(validation.required_field)
      .max(255, validation.field_max_length),
    company_number: Yup.string()
      .trim()
      .required(validation.required_field)
      .max(255, validation.field_max_length),
    date_of_incorporation: Yup.date()
      .required(validation.required_field)
      .nullable()
      .typeError(validation.invalid_date_format)
      .transform((value, rawValue) => {
        const correctDate = moment(rawValue, ['dd-mm-yyyy']).toDate();
        return rawValue ? correctDate : null;
      })
      .max(MAX_DATE, validation.invalid_date_format)
      .min(moment(MIN_DATE).toDate(), validation.invalid_date_format),
  });

  const form = useForm({
    defaultValues: {
      company_name: '',
      company_number: '',
      date_of_incorporation: null,
    },
    resolver: useValidationResolver(schemaObj),
  });

  const setDefaultPage = () => {
    setPage(1);
  };

  const handleChangePage = (event, number) => {
    setPage(number);

    if (number === 1) {
      setOffset(0);
    } else {
      const offsetNumber = (number - 1) * rowsPerPage;
      setOffset(offsetNumber);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setOffset(0);
    setDefaultPage();
  };

  const formStateStatus =
    !form.formState.isSubmitSuccessful && form.formState.isDirty;

  const handleCloseDialog = () => {
    if (formStateStatus) {
      const allowTransition = window.confirm(
        'You haven\'t finished setting up your Risk Assessment yet. Do you want to leave without finishing?'
      );
      if (allowTransition === true) {
        setCompanySpecialStateStatus(true);
        setOpenDialog(false);
        form.reset();
      }
    } else {
      setOpenDialog(false);
      form.reset();
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleSubmitProhibitedClientListForm = (data) => {
    const prohibitedClientListForm = {
      company_name: data?.company_name,
      company_number: data?.company_number,
      date_of_incorporation: convertTimeToStartOfDay(
        data?.date_of_incorporation
      ),
    };

    dispatch(addCorporateProhibitedClientsRequest(prohibitedClientListForm));
    setOpenDialog(false);
    form.reset();
  };

  useEffect(() => {
    dispatch(
      getCorporateProhibitedClientsRequest({
        limit: rowsPerPage,
        offset,
      })
    );
  }, [
    rowsPerPage,
    offset,
    isDeleteCorporateProhibitedClientsStatus,
    isAddCorporateProhibitedClientsStatus,
  ]);

  return (
    <ProhibitedClient>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: '10px',
        }}
      >
        <Typography className="clientList_title">
          There are currently 5 entries on your prohibited list:
        </Typography>
        <Button color="primary" variant="contained" onClick={handleOpenDialog}>
          Add Company
        </Button>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow className="clientList_header">
              {columns?.map((column) => (
                <TableCell align={column?.align} key={column.id}>
                  <Typography className="table_text_header">
                    {column.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {corporateProhibitedClients?.map((row) => {
              return (
                <ProhibitedClientListRows
                  setDefaultPage={handleChangePage}
                  key={row.id}
                  row={row}
                  offset={offset}
                  rowsPerPage={rowsPerPage}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination>
        <div className="rows_per_page">
          <Select native variant="outlined" onChange={handleChangeRowsPerPage}>
            {DEFAULT_ROWS_PER_PAGE_OPTIONS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
          <Typography>
            Showing{' '}
            {corporateProhibitedClientsTotalCount < 1
              ? 0
              : (page - 1) * rowsPerPage + 1}
            -
            {page * rowsPerPage < corporateProhibitedClientsTotalCount
              ? page * rowsPerPage
              : corporateProhibitedClientsTotalCount}{' '}
            of {corporateProhibitedClientsTotalCount} records
          </Typography>
        </div>

        <Pagination
          color="primary"
          page={page}
          count={Math.ceil(corporateProhibitedClientsTotalCount / rowsPerPage)}
          shape="rounded"
          onChange={handleChangePage}
        />
      </TablePagination>

      <DialogProhibitedClientList
        title="ADD COMPANY"
        description="Once a Company has been added to the Prohibited Client List, users will be alerted while performing a Risk Assessment if a potential match is detected."
        handleCloseDialog={handleCloseDialog}
        isOpenDialog={isOpenDialog}
        ifFormDirty={form.formState.isDirty}
        form={form}
        handleSubmit={handleSubmitProhibitedClientListForm}
      />

      <Prompt
        when={formStateStatus || companySpecialStateStatus}
        message={(location) => {
          setLocationPrompt(location.pathname);
          return 'You haven\'t finished setting up your Risk Assessment yet. Do you want to leave without finishing?';
        }}
      />
    </ProhibitedClient>
  );
}

export default ProhibitedClientList;
