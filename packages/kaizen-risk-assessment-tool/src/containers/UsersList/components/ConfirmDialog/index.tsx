import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useDispatch, useSelector } from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';
import { changeUserStatusRequest, selectUsersList } from '../../reducer';

import DialogContainer from './styles';
import {
  REQUEST_STATUS,
  USER_STATUS_ACTION_URL,
  CHANGE_USER_STATUS_ACTION,
} from '../../../../constants/common';
import { KAIZEN_BLUE_LINK, KAIZEN_RED } from '../../../../themes/colors';

export interface IConfirmDialog {
  action: string;
  open: boolean;
  handleClose: (boolean) => void;
  email: string;
}

export default function AlertDialog({
  action,
  open,
  handleClose,
  email,
}: IConfirmDialog) {
  const [isLoadingDialog, setLoadingDialog] = useState(false);
  const dispatch = useDispatch();
  const { involvedAssessments, getInvolvedAssessmentsStatus } =
    useSelector(selectUsersList);

  useEffect(() => {
    setLoadingDialog(
      getInvolvedAssessmentsStatus === REQUEST_STATUS.REQUESTING
    );
  }, [getInvolvedAssessmentsStatus]);

  const DEACTIVATE_DIALOG = {
    title: 'DEACTIVATE USER',
    content: `Are you sure you want to deactivate this account?
    By doing this, ${email} can no longer access the system.`,
    submitButtonName: 'Deactivate',
    color: KAIZEN_RED,
  };

  const REACTIVATE_DIALOG = {
    title: 'REACTIVATE USER',
    content: `Are you sure you want to reactivate this account?
    By doing this, ${email} can access the system.`,
    submitButtonName: 'Reactivate',
    color: '#44c662',
  };

  const RESEND_DIALOG = {
    title: 'RESEND INVITATION',
    content: `Are you sure you want to resend invitation to ${email}?`,
    submitButtonName: 'Resend',
    color: KAIZEN_BLUE_LINK,
  };

  const DEACTIVATE_INVITATION_DIALOG = {
    title: 'INVALIDATE INVITATION',
    content: `Are you sure you want to invalidate this invitation?
    By doing this, ${email} can no longer setup account.`,
    submitButtonName: 'Invalidate',
    color: KAIZEN_BLUE_LINK,
  };

  let DIALOG_CONTENT = {};
  if (action === CHANGE_USER_STATUS_ACTION.DEACTIVATE_USER)
    DIALOG_CONTENT = DEACTIVATE_DIALOG;
  if (action === CHANGE_USER_STATUS_ACTION.REACTIVE_USER)
    DIALOG_CONTENT = REACTIVATE_DIALOG;
  if (action === CHANGE_USER_STATUS_ACTION.DEACTIVATE_INVITATION)
    DIALOG_CONTENT = DEACTIVATE_INVITATION_DIALOG;
  if (action === CHANGE_USER_STATUS_ACTION.RESEND_INVITATION)
    DIALOG_CONTENT = RESEND_DIALOG;

  const handleSubmit = () => {
    if (action === CHANGE_USER_STATUS_ACTION.DEACTIVATE_USER) {
      dispatch(changeUserStatusRequest(USER_STATUS_ACTION_URL.DEACTIVATE_URL));
    }
    if (action === CHANGE_USER_STATUS_ACTION.REACTIVE_USER) {
      dispatch(changeUserStatusRequest(USER_STATUS_ACTION_URL.ACTIVATE_URL));
    }
    if (action === CHANGE_USER_STATUS_ACTION.RESEND_INVITATION) {
      dispatch(changeUserStatusRequest(USER_STATUS_ACTION_URL.RESEND_URL));
    }
    if (action === CHANGE_USER_STATUS_ACTION.DEACTIVATE_INVITATION) {
      dispatch(
        changeUserStatusRequest(
          USER_STATUS_ACTION_URL.DEACTIVATE_INVITATION_URL
        )
      );
    }
    handleClose(false);
  };
  return (
    <DialogContainer
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <LoadingOverlay active={isLoadingDialog} spinner>
        <div className="dialog-content">
          <div className='dialog-title'>{DIALOG_CONTENT?.title}</div>
          <div>
            {action === CHANGE_USER_STATUS_ACTION.DEACTIVATE_USER &&
            involvedAssessments.length > 0 ? (
              <>
                <DialogContentText>
                  {email} is still working on these following cases:
                </DialogContentText>
                <div className="dialog-content-list">
                  {involvedAssessments?.map((assessmentCase) => (
                    <div className="case-wrapper" key={assessmentCase.case_id}>
                      <div className="case-id">({assessmentCase.case_id})</div>
                      <div className="case-name">
                        {assessmentCase.client_name || '-'}{' '}
                      </div>
                    </div>
                  ))}
                </div>
                <DialogContentText>
                  Once deactivated, the following cases will be archived and
                  remain unachievable until {email} is reactivated.
                  <p style={{ paddingTop: '20px' }}>
                    Are you sure you want to deactivate this account?
                  </p>
                </DialogContentText>
              </>
            ) : (
              <DialogContentText>{DIALOG_CONTENT?.content}</DialogContentText>
            )}
          </div>
          <DialogActions>
            <Button onClick={handleClose} variant="outlined" color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              style={{ background: DIALOG_CONTENT?.color }}
              variant="contained"
              autoFocus
            >
              {DIALOG_CONTENT?.submitButtonName}
            </Button>
          </DialogActions>
        </div>
      </LoadingOverlay>
    </DialogContainer>
  );
}
