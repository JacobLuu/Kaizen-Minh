import React,  { useState } from 'react';
import {
  TableCell,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
  Typography
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { KAIZEN_RED } from '../../themes/colors';
import EditUserDialog from './components/EditUserDialog/EditUserDialog';
import UpdateInvitation from './components/UpdateInvitation/UpdateInvitation';
import ConfirmDialog from './components/ConfirmDialog';
import { USER_STATUS, CHANGE_USER_STATUS_ACTION } from '../../constants/common';
import { setUserId, getInvolvedAssessmentsRequested } from './reducer';

import {
  ActiveBox,
  InActiveBox,
  Invitationbox,
  RevokedBox
} from './styles';
import { isAdmin, isSuperAdmin } from '../../utils/roles';

export interface RowProps {
  id: number;
  name: string;
  email: string;
  organization: {
    id: number;
    industry: string;
    name: string;
  };
  role: [];
  rolesList: string[];
  status: string;
}


function UsersListRow({ name, email, organization, role, status, rolesList, id }:RowProps) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElInactive, setAnchorElInactive] = useState(null);
  const [anchorElUpdate, setAnchorElUpdate] = useState(null);
  const [anchorElRevoked, setAnchorElRevoked] = useState(null);
  const isOpenActive = Boolean(anchorEl);
  const isOpenInactive = Boolean(anchorElInactive);
  const isOpenUpdate = Boolean(anchorElUpdate);
  const isOpenRevoked = Boolean(anchorElRevoked);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenUpdateInvitation, setIsOpenUpdateInvitation] = useState(false);

  const [isOpenUpdateUserStatus, setIsOpenUpdateUserStatus] = useState(false);
  const [currentUpdateUserStatusAction, setCurrentUpdateUserStatusAction] = useState(null);

  const ACTIVE_MENU = {
    EDIT_USER : 1,
    DEACTIVATE_USER: 2
  }

  const INACTIVE_MENU = {
    REACTIVATE_USER: 1
  }

  const PENDING_MENU = {
    UPDATE_INVITATION: 1,
    DEACTIVATE_INVITATION: 2,
    RESEND: 3
  }

  const REVOKED_MENU = {
    RESEND: 1,
  };

  const handleOpenEdit = () => {
    setIsOpenEdit(true);
    dispatch(setUserId(id));
  };

  const handleOpenUpdateInvitation = () => {
    setIsOpenUpdateInvitation(true);
    dispatch(setUserId(id));
  };

  const handleOpenAction = (event) => {
    if (status === USER_STATUS.ACTIVE) {
      setAnchorEl(event.currentTarget);
    }
    if (status === USER_STATUS.INACTIVE) {
      setAnchorElInactive(event.currentTarget);
    }
    if (status === USER_STATUS.PENDING) {
      setAnchorElUpdate(event.currentTarget);
    }
    if (status === USER_STATUS.REVOKED) {
      setAnchorElRevoked(event.currentTarget);
    }
  };

  const handleOpenDeactiveUserAction = () => {
    dispatch(setUserId(id));
    dispatch(getInvolvedAssessmentsRequested(id));
    setIsOpenUpdateUserStatus(true);
    setCurrentUpdateUserStatusAction(CHANGE_USER_STATUS_ACTION.DEACTIVATE_USER);
  };

  const handleOpenReactiveUserAction = () => {
    dispatch(setUserId(id));
    setIsOpenUpdateUserStatus(true);
    setCurrentUpdateUserStatusAction(CHANGE_USER_STATUS_ACTION.REACTIVE_USER)
  };

  const handleOpenResendAction = () => {
    dispatch(setUserId(id));
    setIsOpenUpdateUserStatus(true);
    setCurrentUpdateUserStatusAction(CHANGE_USER_STATUS_ACTION.RESEND_INVITATION)
  };

  const handleOpeneDeactiveInvitationAction = () => {
    dispatch(setUserId(id));
    setIsOpenUpdateUserStatus(true);
    setCurrentUpdateUserStatusAction(CHANGE_USER_STATUS_ACTION.DEACTIVATE_INVITATION)
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorElInactive(null);
    setAnchorElUpdate(null);
    setAnchorElRevoked(null);
    setIsOpenEdit(false);
    setIsOpenUpdateInvitation(false);
    setIsOpenUpdateUserStatus(false);
  };
  return (
    <>
      <TableRow hover tabIndex={-1} className="clientList_row">
        <TableCell className="clientList_column">
          <Typography className="table_text">{name}</Typography>
        </TableCell>

        <TableCell className="clientList_column">
          <Typography className="table_text">{email}</Typography>
        </TableCell>

        <TableCell className="clientList_column">
          <Typography className="table_text">{organization?.name}</Typography>
        </TableCell>

        <TableCell className="clientList_column">
        <Typography style={{ textTransform: 'capitalize' }}>{role[0]}</Typography>
        </TableCell>

        <TableCell align="center">
          {status === USER_STATUS.ACTIVE && <ActiveBox>Active</ActiveBox>}
          {status === USER_STATUS.INACTIVE && <InActiveBox>Inactive</InActiveBox>}
          {status === USER_STATUS.PENDING && (<Invitationbox>Invitation Sent</Invitationbox>)}
          {status === USER_STATUS.REVOKED && <RevokedBox>Revoked</RevokedBox>}
        </TableCell>

        {(isAdmin() || isSuperAdmin()) && (<TableCell align="center">
          <div>
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={(event) => handleOpenAction(event)}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              open={isOpenActive}
              anchorEl={anchorEl}
              id="active-menu"
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <MenuItem onClick={handleOpenEdit}
                key={ACTIVE_MENU.EDIT_USER}
                value={ACTIVE_MENU.EDIT_USER}>
                Edit User
              </MenuItem>
              <MenuItem onClick={handleOpenDeactiveUserAction}
                key={ACTIVE_MENU.DEACTIVATE_USER}
                value={ACTIVE_MENU.DEACTIVATE_USER}>
                <span style={{ color: KAIZEN_RED }}>
                  Deactivate User
                </span>
              </MenuItem>
            </Menu>
            <Menu
              anchorEl={anchorElInactive}
              open={isOpenInactive}
              id="inactive-menu"
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <MenuItem
                key={INACTIVE_MENU.REACTIVATE_USER}
                value={INACTIVE_MENU.REACTIVATE_USER}
                onClick={handleOpenReactiveUserAction}>
                <span style={{ color: '#44c662' }}>
                  Reactivate User
                </span>
              </MenuItem>
            </Menu>
            <Menu
              anchorEl={anchorElUpdate}
              open={isOpenUpdate}
              id="update-menu"
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <MenuItem
                key={PENDING_MENU.UPDATE_INVITATION}
                value={PENDING_MENU.UPDATE_INVITATION}
                onClick={handleOpenUpdateInvitation}>
              <span>
                  Update Invitation
                </span>
              </MenuItem>
              <MenuItem
                key={PENDING_MENU.DEACTIVATE_INVITATION}
                value={PENDING_MENU.DEACTIVATE_INVITATION}
                onClick={handleOpeneDeactiveInvitationAction}>
                <span style={{ color: 'red' }}>
                  Deactivate Invitation
                </span>
              </MenuItem>
              <MenuItem
                key={PENDING_MENU.RESEND}
                value={PENDING_MENU.RESEND}
                onClick={handleOpenResendAction}>
                <span>
                  Resend Invitation
                </span>
              </MenuItem>
            </Menu>
            <Menu
              anchorEl={anchorElRevoked}
              open={isOpenRevoked}
              id="revoked-menu"
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <MenuItem
                key={REVOKED_MENU.RESEND}
                value={REVOKED_MENU.RESEND}
                onClick={handleOpenResendAction}>
                <span>
                  Resend Invitation
                </span>
              </MenuItem>
            </Menu>
          </div>
        </TableCell>)}
      </TableRow>
      <EditUserDialog
        isOpenEdit={isOpenEdit}
        handleClose={handleClose}
        email={email}
        organization={organization}
        rolesList={rolesList}
      />

      <UpdateInvitation
        isOpenEdit={isOpenUpdateInvitation}
        handleClose={handleClose}
        email={email}
        organization={organization}
        rolesList={rolesList}
      />
      <ConfirmDialog
        action={currentUpdateUserStatusAction}
        open={isOpenUpdateUserStatus}
        handleClose={handleClose}
        email={email}
      />
    </>
  );
}

export default UsersListRow;