import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import LoadingOverlay from 'react-loading-overlay';
import { useLocation } from 'react-router';
import Button from '@material-ui/core/Button';
import validation from '../../translations/validation';
import Images from '../../assets/images';
import InputFieldPassword from '../../components/InputFieldPassword';
import { REQUEST_STATUS, TOKEN_TYPE } from '../../constants/common';
import {
  resetPasswordRequest,
  selectResetPasswordSlice,
  resetStatus,
  clearAPIMessage,
  postVerifyTokenRequest,
} from './reducer';
import {
  getCachedUrl,
  isHavingToken,
  removeCachedUrl,
} from '../../utils/localStorage';
import { Wrapper, Logo, Container, BackLogin } from './styles';
import CLIENT_PATH from '../../constants/clientPath';
import history from '../../utils/history';
import utils from '../../utils';

export interface IResetPassword {
  password: string;
  repeatPassword: string;
}

function ResetPasswordPage() {
  const schema = Yup.object().shape({
    password: Yup.string()
      .required(validation.required_field)
      .matches(
        validation.valid_password_rule,
        validation.field_password_format
      ),
    repeatPassword: Yup.string()
      .required(validation.required_field)
      .oneOf([Yup.ref('password'), null], validation.invalid_password),
  });

  const form = useForm<IResetPassword>({
    mode: 'onChange',
    defaultValues: {
      password: '',
      repeatPassword: '',
    },
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(false);

  const { resetPasswordStatus, resetPasswordMessage, postVerifyTokenStatus } =
    useSelector(selectResetPasswordSlice);

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

  const location = useLocation();
  const token = utils.getParameterByName('token', location.search);

  const handleSubmit = (data) => {
    dispatch(resetPasswordRequest({ password: data.password, token }));
  };

  React.useEffect(() => {
    checkAndNavigate();
    if (resetPasswordStatus === REQUEST_STATUS.REQUESTING) {
      setLoading(true);
    } else {
      setLoading(false);
    }
    if (resetPasswordStatus === REQUEST_STATUS.SUCCESS) {
      history.push(CLIENT_PATH.LOGIN);
      dispatch(resetStatus());
    }
  }, [resetPasswordStatus]);

  React.useEffect(() => {
    checkAndNavigate();
    if (postVerifyTokenStatus === REQUEST_STATUS.REQUESTING) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [postVerifyTokenStatus]);

  React.useEffect(() => {
    if (!token) {
      history.push(CLIENT_PATH.LOGIN);
    }
    dispatch(
      postVerifyTokenRequest({ token, token_type: TOKEN_TYPE.FORGOT_PASSWORD })
    );
    dispatch(clearAPIMessage());
    checkAndNavigate();
  }, []);
  const { isValid } = form.formState;
  return (
    <Wrapper>
      <LoadingOverlay active={loading} spinner>
        <Container>
          <form noValidate onSubmit={form.handleSubmit(handleSubmit)}>
            <Logo>
              <img
                src={Images.img_logo}
                style={{ margin: 'auto' }}
                alt="logo"
                width="200"
              />
            </Logo>
            <Typography className="title">New Password</Typography>
            <Typography className="subtitle">
              Please enter a new password. Your password must be alphanumeric
              and consist of at least 1 capital letter, a special character (@,
              $, !, &, etc) and be greater than 8 characters.
            </Typography>
            <div className="form">
              <div className="group-input">
                <InputFieldPassword
                  name="password"
                  label="Password"
                  form={form}
                  onChange={() => {
                    dispatch(clearAPIMessage());
                  }}
                />

                <InputFieldPassword
                  margin="0 0 20px 0"
                  name="repeatPassword"
                  label="Repeat Password"
                  form={form}
                  onChange={() => {
                    dispatch(clearAPIMessage());
                  }}
                />
              </div>

              <div className="message_error">{resetPasswordMessage}</div>

              <BackLogin to="/login">Back to Login</BackLogin>

              <Button color="primary" variant="contained" type="submit" disabled={!isValid}>
                Save
              </Button>
            </div>
          </form>
        </Container>
      </LoadingOverlay>
    </Wrapper>
  );
}

export default React.memo(ResetPasswordPage);
