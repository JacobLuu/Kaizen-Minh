import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Link } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import InputField from '../../components/InputField';
import { REQUEST_STATUS } from '../../constants/common';
import validation from '../../translations/validation';
import {
  forgotPasswordRequest,
  selectForgotPasswordSlice,
  clearAPIMessage,
} from './reducer';
import {
  getCachedUrl,
  isHavingToken,
  removeCachedUrl,
} from '../../utils/localStorage';
import { Form, Back } from './styles';
import CLIENT_PATH from '../../constants/clientPath';
import history from '../../utils/history';

interface IForgotPassword {
  email: string;
}

function ForgotPasswordPage() {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email(validation.invalid_email)
      .max(255, validation.invalid_email_length)
      .required(validation.email_required),
  });

  const form = useForm<IForgotPassword>({
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(false);

  const { forgotPasswordStatus, forgotPasswordMessage } = useSelector(
    selectForgotPasswordSlice
  );

  const checkAndNavigate = () => {
    if (isHavingToken()) {
      const cachedUrl = getCachedUrl();
      if (cachedUrl) {
        history.replace(cachedUrl);
        removeCachedUrl();
      } else {
        history.replace(CLIENT_PATH.ROOT);
      }
    }
  };

  const handleSubmit = (data) => {
    dispatch(
      forgotPasswordRequest({
        email: data.email.toLowerCase(),
      })
    );
  };

  React.useEffect(() => {
    checkAndNavigate();
    if (forgotPasswordStatus === REQUEST_STATUS.REQUESTING) {
      setLoading(true);
    } else {
      setLoading(false);
    }
    if (forgotPasswordStatus === REQUEST_STATUS.SUCCESS) {
      form.setValue('email', '');
    }
  }, [forgotPasswordStatus]);

  React.useEffect(() => {
    checkAndNavigate();
    dispatch(clearAPIMessage());
  }, []);

  return (
    <Form noValidate onSubmit={form.handleSubmit(handleSubmit)}>
      <LoadingOverlay active={loading} spinner>
        <Typography className="title">
          <Link to={CLIENT_PATH.LOGIN}>
            <Back />
          </Link>
          Forgot Password
        </Typography>
        <Typography className="subtitle">
          Please enter your company email address below and we will send you a
          link to reset your password
        </Typography>

        <div className="form">
          <div className="group-input">
            <InputField
              type="email"
              name="email"
              label="Email Address"
              form={form}
              onChange={() => {
                dispatch(clearAPIMessage());
              }}
            />
          </div>
          <FormHelperText error>{forgotPasswordMessage}</FormHelperText>

          <Button type="submit" color="primary" variant="contained">
            Done
          </Button>
        </div>
      </LoadingOverlay>
    </Form>
  );
}

export default React.memo(ForgotPasswordPage);
