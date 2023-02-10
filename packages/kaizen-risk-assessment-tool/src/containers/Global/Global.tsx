import React, { useEffect, memo } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import Toast from '../../components/Toast/index';
import { selectGlobalStore } from './reducer';
import { Wrapper } from './styles';

interface CustomCloseButtonProps {
  closeToast: () => void;
}

export const CustomCloseButton = ({ closeToast }: CustomCloseButtonProps) => {
  return (
    <HighlightOffRoundedIcon onClick={closeToast}/>
  )
}

function Global() {
  const { updateMessages, errorMessages, successMessages } = useSelector(selectGlobalStore);
  useEffect(() => {
    errorMessages.map((message) => (
      Toast.error(message)
    ));
  }, [errorMessages]);

  useEffect(() => {
    updateMessages.map((message) => (
      Toast.info(message)
    ));
  }, [updateMessages]);

  useEffect(() => {
    successMessages.map((message) => (
      Toast.success(message)
    ));
  }, [successMessages]);

  return (
    <>
      <Wrapper />
      <ToastContainer closeButton={CustomCloseButton}/>
    </>
  );
}

export default memo(Global);
