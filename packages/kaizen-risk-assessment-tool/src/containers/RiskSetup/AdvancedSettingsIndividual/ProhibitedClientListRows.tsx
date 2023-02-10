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
import {
  MAX_DATE,
  MIN_DATE,
  LIMIT_TEXT_SHOW_TOOLTIP,
} from '../../../constants/common';
import Tooltip from '../../../components/Tooltip';
import {
  editIndividualProhibitedClientsRequest,
  deleteIndividualProhibitedClientsRequest,
} from './reducer';
import { KAIZEN_GREY, KAIZEN_RED } from '../../../themes/colors';

const ProhibitedClientListRows = ({
  row,
  setDefaultPage,
  countriesOfBirth,
  setDefaultValueSelectCountriesOfBirthDisable,
  offset,
  rowsPerPage,
}: any) => {
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
    full_name: Yup.string()
      .trim()
      .required(validation.required_field)
      .max(255, validation.field_max_length),
    country_id: Yup.number().required(validation.required_field),
    date_of_birth: Yup.date()
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
      full_name: '',
      country_id: 0,
      date_of_birth: null,
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
      full_name: data?.full_name,
      country_id: data?.country_id,
      date_of_birth: moment(data.date_of_birth).unix(),
    };
    dispatch(
      editIndividualProhibitedClientsRequest({
        data: prohibitedClientListForm,
        id: row?.id,
        limit: rowsPerPage,
        offset,
      })
    );
    setOpenDialogEditProhibitedClientList(false);
  };

  const handleDeleteIndividual = () => {
    dispatch(
      deleteIndividualProhibitedClientsRequest({
        id: row?.id,
      })
    );
    setOpenDialogDeleteProhibitedClientList(false);
  };

  const handleOpenDialogEditProhibitedClientList = () => {
    setAnchorEl(null);
    form.reset({
      full_name: row?.full_name,
      country_id: row?.country?.id,
      date_of_birth: moment?.unix(row?.date_of_birth),
    });
    setOpenDialogEditProhibitedClientList(true);
  };

  const handleOpenDialogDeleteProhibitedClientList = () => {
    setAnchorEl(null);
    form.reset({
      full_name: row?.full_name,
      country_id: row?.country?.id,
      date_of_birth: moment?.unix(row?.date_of_birth),
    });
    setOpenDialogDeleteProhibitedClientList(true);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} className="clientList_row">
        <TableCell className="clientList_column">
          {row?.full_name.length > LIMIT_TEXT_SHOW_TOOLTIP ? (
            <Tooltip title={row?.full_name}>
              <Typography className="table_text">{row?.full_name}</Typography>
            </Tooltip>
          ) : (
            <Typography className="table_text">{row?.full_name}</Typography>
          )}
        </TableCell>

        <TableCell className="clientList_column">
          {row?.country?.name.length > LIMIT_TEXT_SHOW_TOOLTIP ? (
            <Tooltip title={row?.country?.name}>
              <Typography className="table_text">
                {row?.country?.name}
              </Typography>
            </Tooltip>
          ) : (
            <Typography className="table_text">{row?.country?.name}</Typography>
          )}
        </TableCell>

        <TableCell className="clientList_column">
          <Typography className="table_text">
            {moment.unix(row?.date_of_birth).format('DD/MM/YYYY')}
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
          Edit Individual
        </MenuItem>
        <MenuItem
          key="2"
          value={2}
          onClick={handleOpenDialogDeleteProhibitedClientList}
          style={{ color: KAIZEN_RED }}
        >
          Delete Individual
        </MenuItem>
      </Menu>

      <DialogProhibitedClientList
        title="EDIT INDIVIDUAL"
        description="All users will be alerted when performing the Risk Assessment when the same individual full name/ identification number appears."
        handleCloseDialog={handleCloseDialog}
        isOpenDialog={isOpenDialogEditProhibitedClientList}
        ifFormDirty={form.formState.isDirty}
        form={form}
        handleSubmit={handleSubmitProhibitedClientListForm}
        countriesOfBirth={countriesOfBirth}
        setDefaultValueSelectCountriesOfBirthDisable={
          setDefaultValueSelectCountriesOfBirthDisable
        }
      />

      <DialogProhibitedClientList
        title="DELETE INDIVIDUAL"
        description="Are you sure you want to delete the following individual from Prohibited Client list?"
        handleCloseDialog={handleCloseDialog}
        isOpenDialog={isOpenDialogDeleteProhibitedClientList}
        ifFormDirty
        isDialogDelete
        form={form}
        handleSubmit={() => {
          handleDeleteIndividual();
          setDefaultPage(1);
        }}
        countriesOfBirth={countriesOfBirth}
        setDefaultValueSelectCountriesOfBirthDisable={
          setDefaultValueSelectCountriesOfBirthDisable
        }
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
