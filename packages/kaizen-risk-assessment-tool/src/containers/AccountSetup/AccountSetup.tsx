import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CloseIcon from '@material-ui/icons/Close';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Prompt, useLocation } from 'react-router';
import LoadingOverlay from 'react-loading-overlay';
import Checkbox from '@material-ui/core/Checkbox';
import { Box } from '@material-ui/core';
import {
  registerRequest,
  selectAccountSetupSlice,
  clearAPIMessage,
  registerResetStatus,
  verifyInvitationRequest,
} from './reducer';
import InputField from '../../components/InputField';
import InputFieldPassword from '../../components/InputFieldPassword';
import InputCheckbox from '../../components/InputCheckbox';
import { REQUEST_STATUS, TOKEN_TYPE } from '../../constants/common';
import TermsOfServiceContent from './TermsOfService';
import validation from '../../translations/validation';
import {
  getCachedUrl,
  isHavingToken,
  removeCachedUrl,
} from '../../utils/localStorage';
import { Form, ModalSignUp, ModalButton } from './styles';
import path from '../../constants/clientPath';
import history from '../../utils/history';
import utils from '../../utils';

export interface IAccountSetupInputs {
  name: string;
  companyName: string;
  password: string;
  confirmPassword: string;
  isEmailSubscription: boolean;
  hasAgreedWithTermsOfService: boolean;
}

function AccountSetupPage() {
  const schema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required(validation.required_field)
      .max(255, validation.field_first_name_max_length),
    password: Yup.string()
      .required(validation.required_field)
      .matches(
        validation.valid_password_rule,
        validation.field_password_rules,
      ),
    confirmPassword: Yup.string()
      .required(validation.required_field)
      .oneOf([Yup.ref('password'), null], validation.invalid_password),
    companyName: Yup.string(),
    hasAgreedWithTermsOfService: Yup.boolean().required(
      validation.invalid_terms_of_service
    ),
  });

  const dispatch = useDispatch();

  const {
    registerStatus,
    invitationStatus,
    registerMessage,
    organizationName,
  } = useSelector(selectAccountSetupSlice);
  const [isOpenTermsOfService, setIsOpenTermsOfService] = useState(false);
  const [isTermsOfServiceStatus, setIsTermsOfServiceStatus] = useState(true);
  const [hasCheckedTermsOfService, setHasCheckedTermsOfService] =
    useState(false);
  const [loading, setLoadingPage] = useState(false);

  const form = useForm<IAccountSetupInputs>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      password: '',
      confirmPassword: '',
      companyName: '',
      isEmailSubscription: false,
    },
    resolver: yupResolver(schema),
  });

  form.setValue('companyName', organizationName);

  const onScroll = (e) => {
    if (e.target.scrollTop > 100) {
      return setIsTermsOfServiceStatus(false);
    }
    return null;
  };

  const handleOpen = () => {
    setIsOpenTermsOfService(true);
  };

  const handleClose = () => {
    setIsOpenTermsOfService(false);
  };

  const agreeTermsOfService = () => {
    form.setValue('hasAgreedWithTermsOfService', true);
    setHasCheckedTermsOfService(true);
    form.clearErrors('hasAgreedWithTermsOfService');
    handleClose();
  };

  const location = useLocation();

  const checkAndNavigate = () => {
    if (isHavingToken()) {
      const cachedUrl = getCachedUrl();
      if (cachedUrl) {
        history.replace(cachedUrl);
        removeCachedUrl();
      } else {
        history.replace(path.ROOT);
      }
    }
  };

  const token = utils.getParameterByName('token', location.search);

  const handleSubmit = (data) => {
    const requestData = {
      name: data.name,
      password: data.confirmPassword,
      is_email_subscription: data.isEmailSubscription,
      has_agreed_with_terms_of_service: data.hasAgreedWithTermsOfService,
    };
    dispatch(registerRequest({ ...requestData, token }));
  };

  useEffect(() => {
    setLoadingPage(registerStatus === REQUEST_STATUS.REQUESTING);
    if (registerStatus === REQUEST_STATUS.SUCCESS) {
      history.replace(path.LOGIN);
      dispatch(registerResetStatus());
    }
  }, [registerStatus]);

  useEffect(() => {
    setLoadingPage(invitationStatus === REQUEST_STATUS.REQUESTING);
  }, [invitationStatus]);

  useEffect(() => {
    dispatch(
      verifyInvitationRequest({ token, token_type: TOKEN_TYPE.INVITATION })
    );
    checkAndNavigate();
  }, []);

  return (
    <Form
      noValidate
      onSubmit={form.handleSubmit(handleSubmit)}
      autoComplete="off"
    >
      <Typography className="title">Account Set Up</Typography>
      <LoadingOverlay active={loading} spinner>
        <div className="form">
          <div className="group_input">
            <InputField
              type="text"
              name="name"
              placeholder="Please enter your name"
              form={form}
              onChange={() => {
                dispatch(clearAPIMessage());
              }}
            />

            <InputField
              type="text"
              name="companyName"
              placeholder="Company Name"
              disabled
              form={form}
            />

            <InputFieldPassword
              name="password"
              label="Password"
              autoComplete="new-password"
              form={form}
              onChange={() => {
                dispatch(clearAPIMessage());
              }}
            />

            <InputFieldPassword
              name="confirmPassword"
              label="Confirm Password"
              autoComplete="new-password"
              form={form}
              onChange={() => {
                dispatch(clearAPIMessage());
              }}
            />
          </div>

          <div className="message_error">{registerMessage}</div>
          <div className="group_checkbox">
            <InputCheckbox
              form={form}
              name="isEmailSubscription"
              label={
                <div className="checkboxLabel">
                  I agree to receive B2B marketing communications from Kaizen.
                </div>
              }
            />

            <div className="box_terms_of_service">
              <Box className="check_box_terms_of_service" onClick={handleOpen}>
                <Checkbox
                  disabled
                  disableRipple
                  color="primary"
                  checked={hasCheckedTermsOfService}
                  name="hasAgreedWithTermsOfService"
                  {...form.register('hasAgreedWithTermsOfService', {
                    required: 'error message',
                  })}
                />
              </Box>
              <div className="checkboxLabel">
                Please click here to read and agree to our{' '}
                <span
                  role="presentation"
                  className="text_strong"
                  onClick={handleOpen}
                >
                  Terms of Service
                </span>{' '}
                (under the{' '}
                <a
                  className="link_gdpr"
                  target="_blank"
                  href="https://gdpr-info.eu/"
                  rel="noreferrer"
                >
                  GDPR
                </a>
                ) before creating an account
              </div>
            </div>
            <FormHelperText className="message_error" error>
              {form.formState.errors.hasAgreedWithTermsOfService?.message}
            </FormHelperText>
          </div>
          <Button color="primary" variant="contained" type="submit">
            Submit
          </Button>
        </div>
      </LoadingOverlay>
      <Prompt
        when={!form.formState.isSubmitSuccessful && form.formState.isDirty}
        message="You haven't finished creating your account yet. Do you want to leave without finishing?"
      />

      <ModalSignUp
        maxWidth="md"
        open={isOpenTermsOfService}
        onClose={handleClose}
      >
        <CloseIcon className="button_close" onClick={handleClose} />
        <div className="terms_of_service">
          <div className="header">
            <Typography className="header_title">Terms of Service</Typography>
          </div>
          <div onScroll={onScroll} className="modal_content">
            <TermsOfServiceContent />
          </div>
          <Typography className="sub_text">
            You must scroll down to read and agree to the above Terms of Service
            to use this service. By cancelling you will not gain access to the
            service
          </Typography>
          <div className="footer">
            <ModalButton
              color="primary"
              variant="contained"
              disabled={isTermsOfServiceStatus}
              onClick={agreeTermsOfService}
            >
              I agree
            </ModalButton>
          </div>
        </div>
      </ModalSignUp>
    </Form>
  );
}

export default React.memo(AccountSetupPage);
