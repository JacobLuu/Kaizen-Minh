import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useDispatch } from 'react-redux';
import { TextField, Box } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import { CHANGE_ASSESSMENT_CASE_ACTION } from '../../../constants/common';
import { downloadFileZip } from '../../../utils/hookDownloadFile';
import DialogContainer from './styles';
import {
  archiveCasesRequest,
  assignCasesRequest,
  unArchiveCasesRequest,
} from '../reducer';
import { REQUIRED_VALIDATION_RULES } from '../../../utils/formValidator';

export interface IConfirmDialog {
  action: string;
  open: boolean;
  handleClose: (boolean) => void;
  selectedCases: any[];
  usersList?: [
    {
      email: string;
      id: number;
      name: string;
      organization: {
        id: string;
        industry: string;
        name: string;
      };
      roles: [];
      status: string;
    }
  ];
}

export default function AssessmentDialog(props: IConfirmDialog) {
  const { action, open, handleClose, selectedCases, usersList } = props;
  const dispatch = useDispatch();
  const [assignedUser, setAssignedUser] = useState(null);

  const assignedUserList = usersList?.map((user) => ({
    id: user.id,
    name: user.name,
  }));
  const selectedCasesIdList = selectedCases.map((assessmentCase) => {
    return assessmentCase.case_id;
  });

  const ASSIGNMENT_DIALOG = {
    title: 'ASSIGNMENT',
    content: 'Are you sure you want to assign the selected cases?',
    submitButtonName: 'Assign',
  };

  const ARCHIVE_DIALOG = {
    title: 'ARCHIVE',
    content: 'Are you sure you want to archive the selected cases?',
    submitButtonName: 'Archive',
  };

  const UNARCHIVE_DIALOG = {
    title: 'UNARCHIVE',
    content: 'Are you sure you want to unarchive the selected cases?',
    submitButtonName: 'Unarchive',
  };

  const EXPORT_DIALOG = {
    title: 'EXPORT',
    content:
      'Are you sure you want to export the selected cased results into CSV?',
    submitButtonName: 'Export',
  };

  let DIALOG_CONTENT = {};
  if (action === CHANGE_ASSESSMENT_CASE_ACTION.ARCHIVE)
    DIALOG_CONTENT = ARCHIVE_DIALOG;
  if (action === CHANGE_ASSESSMENT_CASE_ACTION.UNARCHIVE)
    DIALOG_CONTENT = UNARCHIVE_DIALOG;
  if (action === CHANGE_ASSESSMENT_CASE_ACTION.ASSIGNMENT)
    DIALOG_CONTENT = ASSIGNMENT_DIALOG;
  if (action === CHANGE_ASSESSMENT_CASE_ACTION.EXPORT)
    DIALOG_CONTENT = EXPORT_DIALOG;

  const send = () => {
    if (action === CHANGE_ASSESSMENT_CASE_ACTION.ARCHIVE)
      dispatch(
        archiveCasesRequest({
          ids: selectedCasesIdList,
        })
      );
    if (action === CHANGE_ASSESSMENT_CASE_ACTION.UNARCHIVE)
      dispatch(
        unArchiveCasesRequest({
          ids: selectedCasesIdList,
        })
      );
    if (action === CHANGE_ASSESSMENT_CASE_ACTION.ASSIGNMENT)
      dispatch(
        assignCasesRequest({
          ids: selectedCasesIdList,
          user_id: assignedUser,
        })
      );
    if (action === CHANGE_ASSESSMENT_CASE_ACTION.EXPORT)
      downloadFileZip({ ids: selectedCasesIdList });

    handleClose(false);
  };

  const defaultValuesObject =
    action === CHANGE_ASSESSMENT_CASE_ACTION.ASSIGNMENT
      ? {
          ids: selectedCasesIdList,
          user_id: '',
        }
      : {
          ids: selectedCasesIdList,
        };
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: defaultValuesObject,
    mode: 'onChange',
  });

  useEffect(() => {
    return () => {
      reset();
    };
  }, [open]);

  return (
    <DialogContainer
      open={open}
      onClose={() => handleClose(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle className="title">{DIALOG_CONTENT?.title}</DialogTitle>
      <DialogContent className="content">
        <DialogContentText>
          {DIALOG_CONTENT?.content}
          <div className="dialog-content-list">
            {selectedCases?.map((assessmentCase) => (
              <div className="case-wrapper" key={assessmentCase.case_id}>
                <div className="case-id">({assessmentCase.case_id})</div>
                <div className="case-name">{assessmentCase.name || '-'} </div>
              </div>
            ))}
          </div>
          {action === CHANGE_ASSESSMENT_CASE_ACTION.ASSIGNMENT && (
            <div className="select-assignee-title">
              <p className="select-assignee-text">
                Selected cases will be assigned to:
              </p>
            </div>
          )}
        </DialogContentText>
        <form onSubmit={handleSubmit(send)}>
          {action === CHANGE_ASSESSMENT_CASE_ACTION.ASSIGNMENT && (
            <Box className="select-wrapper">
              <Controller
                control={control}
                name="user_id"
                rules={REQUIRED_VALIDATION_RULES}
                render={({ field }) => (
                  <Box className="field-container">
                    <Autocomplete
                      onChange={(event, item) => {
                        field.onChange(item?.id);
                        setAssignedUser(item?.id);
                        setValue('ids', selectedCasesIdList);
                      }}
                      value={field.value}
                      options={assignedUserList}
                      getOptionLabel={(option) => option.name}
                      getOptionSelected={(option) => option.id}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          placeholder="Select team member"
                          error={!!errors.user_id}
                          helperText={
                            errors.user_id &&
                            'This field is required, please fill in'
                          }
                        />
                      )}
                    />
                  </Box>
                )}
              />
            </Box>
          )}
          <Box className="action">
            <Button
              onClick={() => handleClose(false)}
              variant="outlined"
              color="primary"
            >
              Cancel
            </Button>
            <Button type="submit" color="primary" variant="contained" autoFocus>
              {DIALOG_CONTENT?.submitButtonName}
            </Button>
          </Box>
        </form>
      </DialogContent>
    </DialogContainer>
  );
}
