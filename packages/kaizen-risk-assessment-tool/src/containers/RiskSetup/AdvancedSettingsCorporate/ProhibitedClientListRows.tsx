import React, { useState } from 'react';
import * as Yup from 'yup';
import {
  Typography,
  TableCell,
  TableRow,
  Menu,
  MenuItem,
  IconButton,
} from '@material-ui/core';
import moment from 'moment';
import { Prompt } from 'react-router';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DialogProhibitedClientList from './DialogProhibitedClientList';
import useValidationResolver from '../../../utils/hookValidationResolver';
import { setLocationPrompt } from '../../../utils/locationPrompt';
import validation from '../../../translations/validation';
import { MAX_DATE, MIN_DATE, LIMIT_TEXT_SHOW_TOOLTIP } from '../../../constants/common';
import Tooltip from '../../../components/Tooltip';
import {
  editCorporateProhibitedClientsRequest,
  deleteCorporateProhibitedClientsRequest,
} from './reducer';
import { KAIZEN_GREY, KAIZEN_RED } from '../../../themes/colors';

const ProhibitedClientListRows = ({ row, setDefaultPage, rowsPerPage, offset }: any) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const isOpenActive = Boolean(anchorEl);
  const [
    isOpenDialogEditProhibitedClientList,
    setOpenDialogEditProhibitedClientList,
  ] = useState(false);

  const [
    isOpenDialogDeleteProhibitedClientList,
    setOpenDialogDeleteProhibitedClientList,
  ] = useState(false);
  const [companySpecialStateStatus, setCompanySpecialStateStatus] =
    useState(false);
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
        const correctDate = moment(rawValue, ['DD/MM/YYYY']).toDate();
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

  const formStateStatus =
    !form.formState.isSubmitSuccessful && form.formState.isDirty;

  const handleCloseAction = () => {
    setAnchorEl(null);
  };

  const handleOpenAction = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDialog = () => {
    if (formStateStatus) {
      const allowTransition = window.confirm(
        'You haven\'t finished setting up your Risk Assessment yet. Do you want to leave without finishing?'
      );
      if (allowTransition === true) {
        setCompanySpecialStateStatus(true);
        setOpenDialogEditProhibitedClientList(false);
        setOpenDialogDeleteProhibitedClientList(false);
        form.reset();
      }
    } else {
      setOpenDialogEditProhibitedClientList(false);
      setOpenDialogDeleteProhibitedClientList(false);
      form.reset();
    }
  };

  const handleSubmitProhibitedClientListForm = (data) => {
    const prohibitedClientListForm = {
      company_name: data?.company_name,
      company_number: data?.company_number,
      date_of_incorporation: moment(data?.date_of_incorporation).unix(),
    };
    dispatch(
      editCorporateProhibitedClientsRequest({
        data: prohibitedClientListForm,
        id: row.id,
        limit: rowsPerPage,
        offset,
      })
    );
    setOpenDialogEditProhibitedClientList(false);
  };

  const handleDeleteCompany = () => {
    dispatch(
      deleteCorporateProhibitedClientsRequest({
        id: row.id,
      })
    );
    setOpenDialogDeleteProhibitedClientList(false);
  };

  const handleOpenDialogEditProhibitedClientList = () => {
    setAnchorEl(null);
    form.reset({
      company_name: row?.company_name,
      company_number: row?.company_number,
      date_of_incorporation: moment
        .unix(row?.date_of_incorporation),
    });
    setOpenDialogEditProhibitedClientList(true);
  };

  const handleOpenDialogDeleteProhibitedClientList = () => {
    setAnchorEl(null);
    form.reset({
      company_name: row?.company_name,
      company_number: row?.company_number,
      date_of_incorporation: moment
        .unix(row?.date_of_incorporation),
    });
    setOpenDialogDeleteProhibitedClientList(true);
  };

  return (
    <>
      <TableRow hover className="clientList_row">
        <TableCell className="clientList_column">
          {row?.company_name.length > LIMIT_TEXT_SHOW_TOOLTIP ? (
            <Tooltip title={row?.company_name}>
              <Typography className="table_text">{row?.company_name}</Typography>
            </Tooltip>
          ) : (
            <Typography className="table_text">{row?.company_name}</Typography>
          )}
        </TableCell>

        <TableCell className="clientList_column">
          {row?.company_number.length > LIMIT_TEXT_SHOW_TOOLTIP ? (
            <Tooltip title={row?.company_number}>
              <Typography className="table_text">
                {row?.company_number}
              </Typography>
            </Tooltip>
          ) : (
            <Typography className="table_text">{row?.company_number}</Typography>
          )}
        </TableCell>

        <TableCell className="clientList_column">
          <Typography className="table_text">
            {moment.unix(row?.date_of_incorporation).format('DD/MM/YYYY')}
          </Typography>
        </TableCell>

        <TableCell className="clientList_column_action">
          <IconButton onClick={(event) => handleOpenAction(event)}>
            <MoreVertIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      <Menu
        anchorEl={anchorEl}
        open={isOpenActive}
        id="inactive-menu"
        onClose={handleCloseAction}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        getContentAnchorEl={null}
      >
        <MenuItem
          key="1"
          value={1}
          onClick={handleOpenDialogEditProhibitedClientList}
          style={{ color: KAIZEN_GREY }}
        >
          Edit Company
        </MenuItem>
        <MenuItem
          key="2"
          value={2}
          onClick={handleOpenDialogDeleteProhibitedClientList}
          style={{ color: KAIZEN_RED }}
        >
          Delete Company
        </MenuItem>
      </Menu>

      <DialogProhibitedClientList
        title="EDIT COMPANY"
        description="All users will be alerted when performing the Risk Assessment when the same company name/ company number appears."
        handleCloseDialog={handleCloseDialog}
        isOpenDialog={isOpenDialogEditProhibitedClientList}
        ifFormDirty={form.formState.isDirty}
        form={form}
        handleSubmit={handleSubmitProhibitedClientListForm}
      />

      <DialogProhibitedClientList
        title="DELETE COMPANY"
        description="Are you sure you want to delete the following company from Prohibited Client list?"
        handleCloseDialog={handleCloseDialog}
        isOpenDialog={isOpenDialogDeleteProhibitedClientList}
        ifFormDirty
        isDialogDelete
        form={form}
        handleSubmit={() => {
          handleDeleteCompany();
          setDefaultPage(1);
        }}
      />

      <Prompt
        when={formStateStatus || companySpecialStateStatus}
        message={(location) => {
          setLocationPrompt(location.pathname);
          return 'You haven\'t finished setting up your Risk Assessment yet. Do you want to leave without finishing?';
        }}
      />
    </>
  );
};

export default ProhibitedClientListRows;
