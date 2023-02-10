import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import FormHelperText from '@material-ui/core/FormHelperText';
import LoadingOverlay from 'react-loading-overlay';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputField from '../../components/InputField';
import InputFieldPassword from '../../components/InputFieldPassword';
import { REQUEST_STATUS } from '../../constants/common';
import validation from '../../translations/validation';
import { loginRequest, selectLoginSlice, clearAPIMessage } from './reducer';
import { isHavingToken, removeCachedUrl } from '../../utils/localStorage';
import { Form } from './styles';
import CLIENT_PATH from '../../constants/clientPath';
import history from '../../utils/history';

interface ILoginInputs {
  email: string;
  password: string;
}

function LoginPage() {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email(validation.invalid_email)
      .required(validation.email_required)
      .max(255, validation.invalid_email_length),
    password: Yup.string().required(validation.password_required),
  });

  const [loading, setLoading] = React.useState(false);

  const form = useForm<ILoginInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const { loginStatus, loginMessage } = useSelector(selectLoginSlice);
  const fields = form.watch();

  const checkAndNavigate = () => {
    if (isHavingToken()) {
      removeCachedUrl();
      history.replace(CLIENT_PATH.ROOT);
      window.location.reload();
    }
  };

  const handleSubmit = (data) => {
    dispatch(loginRequest(data));
  };

  React.useEffect(() => {
    if (loginStatus === REQUEST_STATUS.SUCCESS) {
      checkAndNavigate();
    }
    setLoading(loginStatus === REQUEST_STATUS.REQUESTING);
  }, [loginStatus]);

  React.useEffect(() => {
    dispatch(clearAPIMessage());
    checkAndNavigate();
  }, []);

  const isSubmitButtonDisabled = !(fields.email && fields.password);

  return (
    <Form noValidate onSubmit={form.handleSubmit(handleSubmit)}>
      <LoadingOverlay active={loading} spinner>
        <Typography className="title">Login</Typography>
        <div style={{ padding: '60px 0 40px 0' }}>
          <Typography className="subtitle">Welcome back!</Typography>
          <Typography className="subtitle">
            Please enter your credentials.
          </Typography>
        </div>

        <div className="form">
          <div className="group_input">
            <InputField
              type="email"
              name="email"
              label="Email Address"
              form={form}
              onChange={() => {
                dispatch(clearAPIMessage());
              }}
            />

            <InputFieldPassword
              margin="0 0 20px 0"
              type="password"
              name="password"
              label="Password"
              form={form}
              onChange={() => {
                dispatch(clearAPIMessage());
              }}
            />
          </div>
          <FormHelperText className="message_error" error>
            {loginMessage}
          </FormHelperText>

          <Link className="forgot_password" to="/forgot-password">
            Forgot Password
          </Link>

          <Button
            disabled={isSubmitButtonDisabled}
            className="submit_button"
            type="submit"
            color="primary"
            variant="contained"
          >
            submit
          </Button>
        </div>
      </LoadingOverlay>
    </Form>
  );
}

LoadingOverlay.propTypes = undefined;

export default React.memo(LoginPage);
