import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import FormHelperText from '@material-ui/core/FormHelperText';
import LoadingOverlay from 'react-loading-overlay';
import InputField from '../../components/InputField';
import { signupRequest, selectSignupSlice, clearAPIMessage } from './reducer';
import { REQUEST_STATUS } from '../../constants/common';
import Button from '../../components/Button';
import validation from '../../translations/validation';
import {
  getCachedUrl,
  isHavingToken,
  removeCachedUrl
} from '../../utils/localStorage';
import { Content, Form, GroupInput } from './styles';
import CLIENT_PATH from '../../constants/clientPath';
import history from '../../utils/history';

interface ISignupInputs {
  email: string;
}

function SignupPage() {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email(validation.invalid_email)
      .max(255, validation.invalid_email_length)
      .required(validation.required_field)
  });

  const form = useForm<ISignupInputs>({
    defaultValues: {
      email: ''
    },
    resolver: yupResolver(schema)
  });

  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(false);

  const { signupStatus, signupMessage } = useSelector(selectSignupSlice);

  const checkAndNavigate = () => {
    if (isHavingToken()) {
      const cachedUrl = getCachedUrl();
      if (cachedUrl) {
        history.replace(cachedUrl);
        removeCachedUrl();
      } else {
        history.replace(CLIENT_PATH.ROOT);
      }
      window.location.reload();
    }
  };

  const handleSubmit = (data) => {
    dispatch(signupRequest(data));
  };

  React.useEffect(() => {
    checkAndNavigate();

    if (signupStatus === REQUEST_STATUS.REQUESTING) {
      setLoading(true);
    } else {
      setLoading(false);
    }

    if (signupStatus === REQUEST_STATUS.SUCCESS) {
      form.setValue('email', '');
    }
  }, [signupStatus]);

  React.useEffect(() => {
    dispatch(clearAPIMessage());
    checkAndNavigate();
  }, []);

  return (
    <form noValidate onSubmit={form.handleSubmit(handleSubmit)}>
      <LoadingOverlay active={loading} spinner>
        <Content>
          Please enter the email address you&apos;ll be using for your account below
          and we will send you a password setting link.
        </Content>
        <Form>
          <GroupInput>
            <InputField
              margin="0 0 20px 0"
              type="email"
              name="email"
              label="Company Email Address"
              form={form}
              onChange={() => {
                dispatch(clearAPIMessage());
              }}
            />
          </GroupInput>

          <FormHelperText className="message_error" error>
            {signupMessage}
          </FormHelperText>

          <Button type="submit" text="Submit" margin="20px 0 0 0" />
        </Form>
      </LoadingOverlay>
    </form>
  );
}

export default React.memo(SignupPage);
