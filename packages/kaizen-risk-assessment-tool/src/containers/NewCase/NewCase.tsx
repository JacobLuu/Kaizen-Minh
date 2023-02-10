/* eslint-disable */
import React, { useMemo, useEffect, useState } from 'react';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';
import classNames from 'classnames';
import moment from 'moment';
import { Prompt, useLocation } from 'react-router';
import { useBeforeunload } from 'react-beforeunload';
import Dialog from '../../components/Dialog';
import { setLocationPrompt } from '../../utils/locationPrompt';
import { getUsersRequested } from '../UsersList/reducer';
import { INDIVIDUAL_INPUT_NAME, CORPORATE_INPUT_NAME } from './formInputNames';
import CLIENT_PATH from '../../constants/clientPath';
import history from '../../utils/history';
import { accountInfo } from '../../utils/localStorage';

import Step1EntityType from './Step1EntityType';
import Step2CompanyStatusCorporate from './NewCaseCorporate/Step2CompanyStatusCorporate';
import Step3DetailsCorporate from './NewCaseCorporate/Step3DetailsCorporate';
import Step4KeyRisksIndicatorCorporate from './NewCaseCorporate/Step4KeyRisksIndicatorCorporate';
import Step5AggregateRiskRatingCorporate from './NewCaseCorporate/Step5AggregateRiskRatingCorporate';

import Step2CompanyStatusIndividual from './NewCaseIndividual/Step2CompanyStatusIndividual';
import Step3DetailsIndividual from './NewCaseIndividual/Step3DetailsIndividual';
import Step4KeyRisksIndicatorIndividual from './NewCaseIndividual/Step4KeyRisksIndicatorIndividual';
import Step5AggregateRiskRatingIndividual from './NewCaseIndividual/Step5AggregateRiskRatingIndividual';

import mapCorporateFormDataToAPI from './NewCaseCorporate/mapFormToAPI';
import mapIndividualFormDataToAPI from './NewCaseIndividual/mapFormToAPI';
import validation from '../../translations/validation';
import useValidationResolver from '../../utils/hookValidationResolver';
import {
  INDUSTRY,
  MAX_DATE,
  MIN_DATE,
  ASSESSMENT_CATEGORY,
  REQUEST_STATUS,
  ASSESSMENT_STATUS,
  NOT_APPLICABLE,
  INDICATOR_INDIVIDUAL_PC_PROHIBITED_CLIENT_ID,
  INDICATOR_CORPORATE_PC_PROHIBITED_CLIENT_ID,
} from '../../constants/common';

import TOAST_MESSAGE from '../../constants/toastMessage';
import { EventEmitter, Events } from '../../utils/events';

import {
  selectNewCaseStore,
  getDataAssessmentsSettingsRequest,
  getDataAssessmentsCaseRequest,
  getDataNewCaseSettingsRequest,
  postNewCaseDataRequest,
  updateNewCaseDataRequest,
  clearNewCaseData,
} from './reducer';

import {
  clearCorporateData,
  selectNewCaseCorporateStore,
  setCorporatePreviewResultData,
  setCorporateProhibitedClientFlag,
  removeCorporateProhibitedClientFlag,
} from './NewCaseCorporate/reducer';

import {
  selectNewCaseIndividualStore,
  clearIndividualData,
  setIndividualPreviewResultData,
  setIndividualProhibitedClientFlag,
  removeIndividualProhibitedClientFlag,
} from './NewCaseIndividual/reducer';

import {
  Wrapper,
  StepperConnector,
  StepIconStyles,
  ConfirmSaveDraftDialog,
} from './styles';

import { DUAL_NATIONALITY_LIMIT } from './NewCaseIndividual/Step3DetailsIndividual';

const STEPS = {
  STEP1: 1,
  STEP2: 2,
  STEP3: 3,
  STEP4: 4,
  STEP5: 5,
};

function invalidInput(input) {
  return input === null || input === undefined;
}

function getSteps() {
  return [
    {
      step: STEPS.STEP1,
      label: 'Entity Type',
    },
    {
      step: STEPS.STEP2,
      label: 'Status',
    },
    {
      step: STEPS.STEP3,
      label: 'Details',
    },
    {
      step: STEPS.STEP4,
      label: 'Key Risk Indicators',
    },
    {
      step: STEPS.STEP5,
      label: 'Aggregate Risk Rating',
    },
  ];
}

function stepIcon(props: any) {
  const classes = StepIconStyles();
  const { active, completed, icon } = props;

  return (
    <Box
      className={classNames(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <Box className={classes.completed}>{icon}</Box>
      ) : (
        <Box className={classes.circle}>{icon}</Box>
      )}
    </Box>
  );
}

function NewCase() {
  const [currentStep, setCurrentStep] = useState(STEPS.STEP1);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isOpenPreviewResult, setIsOpenPreviewResult] = React.useState(false);
  const [isOpenDialogWarning, setIsOpenDialogWarning] = React.useState(false);
  const [isLoadingSetting, setIsLoadingSetting] = React.useState(false);
  const [isSaveDraftDialogOpen, setIsSaveDraftDialogOpen] =
    React.useState(false);
  const steps = getSteps();
  const dispatch = useDispatch();
  const location = useLocation();
  const pathName = `${location.pathname.split('/')[2]}`;
  const { indicatorAssessmentsCaseStatus } = useSelector(selectNewCaseStore);

  const {
    averageScore: corporateAverageScore,
    assessmentIndicators: corporateAssessmentIndicators,
    indicatorSettingsCorporatePrimary,
    indicatorSettingsCorporateSecondary,
    corporateAssessmentCaseData,
    corporateGeneralSettings,
  } = useSelector(selectNewCaseCorporateStore);

  const corporateProhibitedClientSelected = useMemo(() => {
    return indicatorSettingsCorporateSecondary.findIndex(
      (item) => item.id === INDICATOR_CORPORATE_PC_PROHIBITED_CLIENT_ID
    );
  }, [indicatorSettingsCorporateSecondary]);

  const isRejectAccessCorporateAssessment =
    corporateAssessmentCaseData.status === ASSESSMENT_STATUS.COMPLETED ||
    corporateAssessmentCaseData.status === ASSESSMENT_STATUS.ARCHIVED ||
    corporateAssessmentCaseData.status === ASSESSMENT_STATUS.ABORTED;

  const {
    averageScore: individualAverageScore,
    assessmentIndicators: individualAssessmentIndicators,
    indicatorSettingsIndividualPrimary,
    indicatorSettingsIndividualSecondary,
    individualAssessmentsCaseData,
    individualGeneralSettings,
  } = useSelector(selectNewCaseIndividualStore);

  const individualProhibitedClientSelected = useMemo(() => {
    return indicatorSettingsIndividualSecondary.findIndex(
      (item) => item.id === INDICATOR_INDIVIDUAL_PC_PROHIBITED_CLIENT_ID
    );
  }, [indicatorSettingsIndividualSecondary]);

  const isRejectAccessIndividualAssessment =
    individualAssessmentsCaseData.status === ASSESSMENT_STATUS.COMPLETED ||
    individualAssessmentsCaseData.status === ASSESSMENT_STATUS.ARCHIVED ||
    individualAssessmentsCaseData.status === ASSESSMENT_STATUS.ABORTED;

  const step1SchemaObj = Yup.object().shape({
    target_type: Yup.string()
      .required(validation.required_field)
      .max(255, validation.field_max_length),
  });

  const step2CorporateSchemaObj = Yup.object().shape({
    is_company_incorporated: Yup.boolean().required(validation.required_field),
    assigned_user_id: Yup.object()
      .required(validation.required_field)
      .nullable(),
    company_name: Yup.string()
      .required(validation.required_field)
      .max(255, validation.field_max_length)
      .trim(),
    company_number: Yup.string().when('is_company_incorporated', {
      is: false,
      then: Yup.string().trim().notRequired(),
      otherwise: Yup.string().trim().required(validation.required_field),
    }),
    incorporation_date: Yup.date()
      .required(validation.required_field)
      .nullable()
      .typeError(validation.invalid_date_format)
      .transform((_value, rawValue) => {
        const correctDate = moment(rawValue, ['dd-mm-yyyy']).toDate();
        return rawValue ? correctDate : null;
      })
      .max(MAX_DATE, validation.invalid_date_format)
      .min(moment(MIN_DATE).toDate(), validation.invalid_date_format),
  });

  const step3CorporateSchemaObj = Yup.object().shape({
    client_type_id: Yup.number().required(validation.required_field),
    corporate_status: Yup.string().required(validation.required_field),
    incorporation_country_ids: Yup.object()
      .required(validation.required_field)
      .nullable(),
    operation_country_ids: Yup.array()
      .min(1, validation.required_field)
      .required(validation.required_field),
    corporate_bvd_number_status: Yup.boolean(),
    bvd_number: Yup.string().when(
      CORPORATE_INPUT_NAME.CORPORATE_BVD_NUMBER_STATUS,
      {
        is: true,
        then: Yup.string()
          .trim()
          .required(validation.required_field)
          .nullable(),
        otherwise: Yup.string().trim().notRequired().nullable(),
      }
    ),
    internal_id: Yup.string().nullable(),
    regulatory_id: Yup.string().nullable(),
    corporate_industry_status: Yup.boolean(),
    legal_type: Yup.string().when(
      CORPORATE_INPUT_NAME.CORPORATE_INDUSTRY_STATUS,
      {
        is: true,
        then: Yup.string().required(validation.required_field),
        otherwise: Yup.string().notRequired(),
      }
    ),
    is_listed: Yup.boolean(),
  });

  const step4CorporateSchemaObj = useMemo(() => {
    const schemaObj = {};

    indicatorSettingsCorporatePrimary.forEach(({ id, is_multiple_select }) => {
      if (is_multiple_select) {
        schemaObj[id] = Yup.array().test(
          'customRequire',
          '',
          (value) => value && value.length > 0
        );
      } else {
        schemaObj[id] = Yup.number().test(
          'customRequire',
          '',
          (value) => value && value.toString().length >= 0
        );
      }
    });

    indicatorSettingsCorporateSecondary.forEach(
      ({ id, is_multiple_select }) => {
        if (is_multiple_select) {
          schemaObj[id] = Yup.array().test(
            'customRequire',
            '',
            (value) => value && value.length > 0
          );
        } else {
          schemaObj[id] = Yup.number().test(
            'customRequire',
            '',
            (value) => value && value.toString().length >= 0
          );
        }
      }
    );
    return Yup.object().shape(schemaObj);
  }, [indicatorSettingsCorporatePrimary, indicatorSettingsCorporateSecondary]);

  const step5CorporateSchemaObj = Yup.object().shape({
    is_update_case: Yup.boolean().notRequired(),
    reviewer_user_id: Yup.object()
      .required(validation.reviewer_user_field)
      .nullable(),
    reason_for_change: Yup.string().when('is_update_case', {
      is: true,
      then: Yup.string().trim().notRequired(),
      otherwise: Yup.string().trim().required(validation.required_field),
    }),
  });

  const step2IndividualSchemaObj = Yup.object().shape({
    legal_name: Yup.string()
      .trim()
      .required(validation.required_field)
      .max(255, validation.field_max_length),
    birth_country_id: Yup.number().required(validation.required_field),
    date_of_birth: Yup.date()
      .required(validation.required_field)
      .nullable()
      .typeError(validation.invalid_date_format)
      .transform((_value, rawValue) => {
        const correctDate = moment(rawValue, ['dd-mm-yyyy']).toDate();
        return rawValue ? correctDate : null;
      })
      .max(MAX_DATE, validation.invalid_date_format)
      .min(moment(MIN_DATE).toDate(), validation.invalid_date_format),
    assigned_user_id: Yup.object()
      .required(validation.required_field)
      .nullable(),
  });

  const step3IndividualSchemaObj = Yup.object().shape({
    known_as_name: Yup.string()
      .trim()
      .required(validation.required_field)
      .nullable(),
    residence_country_ids: Yup.object()
      .required(validation.required_field)
      .nullable(),
    title: Yup.string().trim().required(validation.required_field).nullable(),
    sector_ids: Yup.object().required(validation.required_field).nullable(),
    dual_nationality_status: Yup.boolean(),
    dual_nationality_country_ids: Yup.array().when(
      INDIVIDUAL_INPUT_NAME.DUAL_NATIONALITY_STATUS,
      {
        is: false,
        then: Yup.array()
          .min(1, validation.required_field)
          .required(validation.required_field),
        otherwise: Yup.array()
          .min(2, validation.nationalities_limit_length)
          .required(validation.required_field),
      }
    ),
    individual_industry_status: Yup.boolean(),
    legal_type: Yup.string().when(
      INDIVIDUAL_INPUT_NAME.INDIVIDUAL_INDUSTRY_STATUS,
      {
        is: true,
        then: Yup.string().required(validation.required_field),
        otherwise: Yup.string().notRequired(),
      }
    ),
  });

  const step4IndividualSchemaObj = useMemo(() => {
    const schemaObj = {};

    indicatorSettingsIndividualPrimary.forEach(({ id, is_multiple_select }) => {
      if (is_multiple_select) {
        schemaObj[id] = Yup.array().required('');
      } else {
        schemaObj[id] = Yup.number().required('');
      }
    });

    indicatorSettingsIndividualSecondary.forEach(
      ({ id, is_multiple_select }) => {
        if (is_multiple_select) {
          schemaObj[id] = Yup.array().required('');
        } else {
          schemaObj[id] = Yup.number().required('');
        }
      }
    );
    return Yup.object().shape(schemaObj);
  }, [
    indicatorSettingsIndividualPrimary,
    indicatorSettingsIndividualSecondary,
  ]);

  const step5IndividualSchemaObj = Yup.object().shape({
    is_update_case: Yup.boolean().notRequired(),
    reviewer_user_id: Yup.object()
      .required(validation.reviewer_user_field)
      .nullable(),
    reason_for_change: Yup.string().when('is_update_case', {
      is: true,
      then: Yup.string().trim().notRequired(),
      otherwise: Yup.string().trim().required(validation.required_field),
    }),
  });

  const step1Form = useForm({
    mode: 'onChange',
    defaultValues: {
      target_type: '',
    },
    resolver: useValidationResolver(step1SchemaObj),
  });

  const step2CorporateForm = useForm({
    defaultValues: {
      company_name: '',
      company_number: '',
      incorporation_date: null,
      is_company_incorporated: true,
      assigned_user_id: null,
    },
    resolver: useValidationResolver(step2CorporateSchemaObj),
  });

  const step3CorporateForm = useForm({
    defaultValues: {
      client_type_id: undefined,
      corporate_status: '',
      incorporation_country_ids: [],
      operation_country_ids: [],
      bvd_number: '',
      internal_id: '',
      regulatory_id: '',
      legal_type: '',
      is_listed: true,
    },
    resolver: useValidationResolver(step3CorporateSchemaObj),
  });

  const step4CorporateForm = useForm({
    resolver: useValidationResolver(step4CorporateSchemaObj),
  });

  const step5CorporateForm = useForm({
    resolver: useValidationResolver(step5CorporateSchemaObj),
  });

  const step2IndividualForm = useForm({
    defaultValues: {
      legal_name: '',
      birth_country_id: undefined,
      date_of_birth: null,
    },
    resolver: useValidationResolver(step2IndividualSchemaObj),
  });

  const step3IndividualForm = useForm({
    defaultValues: {
      known_as_name: '',
      residence_country_ids: undefined,
      title: '',
      sector_ids: '',
      dual_nationality_status: undefined,
      dual_nationality_country_ids: [],
      legal_type: '',
    },
    resolver: useValidationResolver(step3IndividualSchemaObj),
  });

  const step4IndividualForm = useForm({
    resolver: useValidationResolver(step4IndividualSchemaObj),
  });

  const step5IndividualForm = useForm({
    resolver: useValidationResolver(step5IndividualSchemaObj),
  });

  const handleNextStep = () => {
    setCurrentStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBackStep = () => {
    setCurrentStep((prevActiveStep) => prevActiveStep - 1);
  };

  const {
    isDirty: isDirtyStep2Corporate,
    isSubmitSuccessful: isSubmitSuccessfulStep2Corporate,
  } = step2CorporateForm.formState;
  const { isDirty: isDirtyStep3Corporate } = step3CorporateForm.formState;
  const { isDirty: isDirtyStep4Corporate } = step4CorporateForm.formState;
  const {
    isDirty: isDirtyStep5Corporate,
    isSubmitSuccessful: isSubmitSuccessfulStep5Corporate,
  } = step5CorporateForm.formState;

  const {
    isDirty: isDirtyStep2Individual,
    isSubmitSuccessful: isSubmitSuccessfulStep2Individual,
  } = step2IndividualForm.formState;
  const { isDirty: isDirtyStep3Individual } = step3IndividualForm.formState;
  const { isDirty: isDirtyStep4Individual } = step4IndividualForm.formState;
  const {
    isDirty: isDirtyStep5Individual,
    isSubmitSuccessful: isSubmitSuccessfulStep5Individual,
  } = step5IndividualForm.formState;

  const handleOpenSaveDraftDialog = () => {
    setIsSaveDraftDialogOpen(true);
  };

  const handleCloseSaveDraftDialog = () => {
    setIsSaveDraftDialogOpen(false);
  };

  const onConfirmSaveDraft = () => {
    const assessmentCategoryType = step1Form.getValues('target_type');
    if (assessmentCategoryType === ASSESSMENT_CATEGORY.INDIVIDUAL) {
      handleSaveDraftIndividual();
    }
    if (assessmentCategoryType === ASSESSMENT_CATEGORY.CORPORATE) {
      handleSaveDraftCorporate();
    }
    handleCloseSaveDraftDialog();
  };

  useBeforeunload((event) => {
    if (
      ((!isSubmitSuccessfulStep5Corporate &&
        !isSubmitSuccessfulStep2Corporate &&
        (isDirtyStep2Corporate ||
          isDirtyStep3Corporate ||
          isDirtyStep4Corporate ||
          isDirtyStep5Corporate)) ||
        (!isSubmitSuccessfulStep5Individual &&
          !isSubmitSuccessfulStep2Individual &&
          (isDirtyStep2Individual ||
            isDirtyStep3Individual ||
            isDirtyStep4Individual ||
            isDirtyStep5Individual))) &&
      !isOpenDialogWarning
    ) {
      event.preventDefault();
    }
  });

  useEffect(() => {
    step1Form.reset({
      target_type: corporateAssessmentCaseData?.target_type,
    });
    step2CorporateForm.reset({
      assigned_user_id:
        corporateAssessmentCaseData?.assigned_user || accountInfo,
      is_company_incorporated:
        corporateAssessmentCaseData?.corporate_assessment
          ?.is_company_incorporated || true,
      company_name:
        corporateAssessmentCaseData?.corporate_assessment?.company_name,
      company_number:
        corporateAssessmentCaseData?.corporate_assessment?.company_number,
      incorporation_date: corporateAssessmentCaseData?.corporate_assessment
        ?.incorporation_date
        ? moment.unix(
            corporateAssessmentCaseData?.corporate_assessment
              ?.incorporation_date
          )
        : null,
    });

    step3CorporateForm.reset({
      client_type_id:
        corporateAssessmentCaseData?.corporate_assessment?.client_type?.id,
      corporate_status:
        corporateAssessmentCaseData?.corporate_assessment?.corporate_status
          ?.value,
      incorporation_country_ids:
        corporateAssessmentCaseData?.corporate_assessment
          ?.incorporation_country?.[0],
      operation_country_ids:
        corporateAssessmentCaseData?.corporate_assessment?.operation_country,
      corporate_bvd_number_status:
        corporateAssessmentCaseData?.corporate_assessment?.bvd_number !==
          NOT_APPLICABLE ||
        !corporateAssessmentCaseData?.corporate_assessment?.bvd_number,
      bvd_number: corporateAssessmentCaseData?.corporate_assessment?.bvd_number,
      internal_id:
        corporateAssessmentCaseData?.corporate_assessment?.internal_id || '',
      regulatory_id:
        corporateAssessmentCaseData?.corporate_assessment?.regulatory_id || '',
      corporate_industry_status:
        accountInfo?.organization?.industry === INDUSTRY.LAW,
      legal_type:
        corporateAssessmentCaseData?.corporate_assessment?.legal_type?.value,
      is_listed: corporateAssessmentCaseData?.corporate_assessment?.is_listed,
    });

    step4CorporateForm.reset();

    if (corporateProhibitedClientSelected >= 0) {
      corporateAssessmentCaseData?.is_prohibited &&
        dispatch(
          setCorporateProhibitedClientFlag({
            isProhibitedClientFlag: corporateAssessmentCaseData?.is_prohibited,
          })
        );
    } else {
      dispatch(removeCorporateProhibitedClientFlag());
    }
  }, [accountInfo, corporateAssessmentCaseData]);

  useEffect(() => {
    step1Form.reset({
      target_type: individualAssessmentsCaseData?.target_type,
    });
    step2IndividualForm.reset({
      assigned_user_id:
        individualAssessmentsCaseData?.assigned_user || accountInfo,
      legal_name:
        individualAssessmentsCaseData?.individual_assessment?.legal_name,
      birth_country_id:
        individualAssessmentsCaseData?.individual_assessment?.birth_country?.id,
      date_of_birth: individualAssessmentsCaseData?.individual_assessment
        ?.date_of_birth
        ? moment.unix(
            individualAssessmentsCaseData?.individual_assessment?.date_of_birth
          )
        : null,
    });

    step3IndividualForm.reset({
      known_as_name:
        individualAssessmentsCaseData?.individual_assessment?.known_as_name,
      residence_country_ids:
        individualAssessmentsCaseData?.individual_assessment
          ?.residence_country?.[0],
      title: individualAssessmentsCaseData?.individual_assessment?.title,
      sector_ids:
        individualAssessmentsCaseData?.individual_assessment?.sectors?.[0],
      dual_nationality_status:
        individualAssessmentsCaseData?.individual_assessment
          ?.dual_nationality_country.length >= DUAL_NATIONALITY_LIMIT,
      dual_nationality_country_ids:
        individualAssessmentsCaseData?.individual_assessment
          ?.dual_nationality_country || [],
      individual_industry_status:
        accountInfo?.organization?.industry === INDUSTRY.LAW,
      legal_type:
        individualAssessmentsCaseData?.individual_assessment?.legal_type?.value,
    });

    step4IndividualForm.reset();

    if (individualProhibitedClientSelected >= 0) {
      individualAssessmentsCaseData?.is_prohibited &&
        dispatch(
          setIndividualProhibitedClientFlag({
            isProhibitedClientFlag:
              individualAssessmentsCaseData?.is_prohibited,
          })
        );
    } else {
      dispatch(removeIndividualProhibitedClientFlag());
    }
  }, [accountInfo, individualAssessmentsCaseData]);

  const handleSubmitFormCorporate = () => {
    const formStep1 = step1Form.getValues();
    const formStep2 = step2CorporateForm.getValues();
    const formStep3 = step3CorporateForm.getValues();
    const formStep5 = step5CorporateForm.getValues();

    const dataObject = Object.assign(
      formStep1,
      formStep2,
      formStep3,
      formStep5
    );

    const formCorporateData = mapCorporateFormDataToAPI(dataObject);

    const dataObjectToSend = {
      ...formCorporateData,
      risk_score: corporateAverageScore,
      status: ASSESSMENT_STATUS.PENDING_REVIEW,
      assessment_indicators: corporateAssessmentIndicators,
      target_type: ASSESSMENT_CATEGORY.CORPORATE,
    };

    dispatch(
      postNewCaseDataRequest({
        data: dataObjectToSend,
        toastMessage: TOAST_MESSAGE.SUBMIT_RISK_ASSIGNMENT.SUCCESS,
        redirectUrl: ASSESSMENT_STATUS.PENDING_REVIEW,
      })
    );
  };

  const handleUpdateFormCorporatePendingReview = () => {
    const formStep3 = step3CorporateForm.getValues();
    const formStep5 = step5CorporateForm.getValues();

    const dataObject = Object.assign(formStep3, formStep5);

    const formCorporateData = mapCorporateFormDataToAPI(dataObject);

    const dataObjectToSend = {
      ...formCorporateData,
      risk_score: corporateAverageScore,
      status: ASSESSMENT_STATUS.PENDING_REVIEW,
      assessment_indicators: corporateAssessmentIndicators,
    };

    dispatch(
      updateNewCaseDataRequest({
        id: pathName,
        data: dataObjectToSend,
        toastMessage: TOAST_MESSAGE.SUBMIT_RISK_ASSIGNMENT.SUCCESS,
      })
    );
  };

  const handleUpdateFormCorporateInProgress = () => {
    const formStep2 = step2CorporateForm.getValues();
    const formStep3 = step3CorporateForm.getValues();
    const formStep5 = step5CorporateForm.getValues();

    const dataObject = Object.assign(formStep2, formStep3, formStep5);

    const formCorporateData = mapCorporateFormDataToAPI(dataObject);

    const dataObjectToSend = {
      ...formCorporateData,
      risk_score: corporateAverageScore,
      status: ASSESSMENT_STATUS.PENDING_REVIEW,
      assessment_indicators: corporateAssessmentIndicators,
    };

    dispatch(
      updateNewCaseDataRequest({
        id: pathName,
        isBackToDashboard:
          corporateAssessmentCaseData.status === ASSESSMENT_STATUS.IN_PROGRESS,
        data: dataObjectToSend,
        toastMessage: TOAST_MESSAGE.SUBMIT_RISK_ASSIGNMENT.SUCCESS,
        redirectUrl: ASSESSMENT_STATUS.PENDING_REVIEW,
      })
    );
  };

  const handleSubmitFormCorporateAssignee = () => {
    const formStep1 = step1Form.getValues();
    const formStep2 = step2CorporateForm.getValues();

    const dataObject = Object.assign(formStep1, formStep2);

    const formCorporateData = mapCorporateFormDataToAPI(dataObject);

    const dataObjectToSend = {
      ...formCorporateData,
      status: ASSESSMENT_STATUS.IN_PROGRESS,
      target_type: ASSESSMENT_CATEGORY.CORPORATE,
    };

    dispatch(
      postNewCaseDataRequest({
        data: dataObjectToSend,
        isBackToDashboard: true,
        toastMessage: TOAST_MESSAGE.SUBMIT_RISK_ASSIGNMENT.SUCCESS,
        redirectUrl: ASSESSMENT_STATUS.IN_PROGRESS,
      })
    );
  };

  const handleUpdateFormCorporateAssignee = () => {
    const formStep1 = step1Form.getValues();
    const formStep2 = step2CorporateForm.getValues();

    const dataObject = Object.assign(formStep1, formStep2);

    const formCorporateData = mapCorporateFormDataToAPI(dataObject);

    const dataObjectToSend = {
      ...formCorporateData,
      status: ASSESSMENT_STATUS.IN_PROGRESS,
    };

    dispatch(
      updateNewCaseDataRequest({
        id: pathName,
        data: dataObjectToSend,
        isBackToDashboard: true,
        toastMessage: TOAST_MESSAGE.SUBMIT_RISK_ASSIGNMENT.SUCCESS,
        redirectUrl: ASSESSMENT_STATUS.IN_PROGRESS,
      })
    );
  };

  const handleSubmitFormIndividualAssignee = () => {
    const formStep1 = step1Form.getValues();
    const formStep2 = step2IndividualForm.getValues();

    const dataObject = Object.assign(formStep1, formStep2);

    const formIndividualData = mapIndividualFormDataToAPI(dataObject);

    const dataObjectToSend = {
      ...formIndividualData,
      status: ASSESSMENT_STATUS.IN_PROGRESS,
      target_type: ASSESSMENT_CATEGORY.INDIVIDUAL,
    };

    dispatch(
      postNewCaseDataRequest({
        data: dataObjectToSend,
        isBackToDashboard: true,
        toastMessage: TOAST_MESSAGE.SUBMIT_RISK_ASSIGNMENT.SUCCESS,
        redirectUrl: ASSESSMENT_STATUS.IN_PROGRESS,
      })
    );
  };

  const handleUpdateFormIndividualAssignee = () => {
    const formStep1 = step1Form.getValues();
    const formStep2 = step2IndividualForm.getValues();

    const dataObject = Object.assign(formStep1, formStep2);

    const formIndividualData = mapIndividualFormDataToAPI(dataObject);

    const dataObjectToSend = {
      ...formIndividualData,
      status: ASSESSMENT_STATUS.IN_PROGRESS,
    };

    dispatch(
      updateNewCaseDataRequest({
        id: pathName,
        data: dataObjectToSend,
        isBackToDashboard: true,
        toastMessage: TOAST_MESSAGE.SUBMIT_RISK_ASSIGNMENT.SUCCESS,
        redirectUrl: ASSESSMENT_STATUS.IN_PROGRESS,
      })
    );
  };

  const handleSubmitFormIndividual = () => {
    const formStep1 = step1Form.getValues();
    const formStep2 = step2IndividualForm.getValues();
    const formStep3 = step3IndividualForm.getValues();
    const formStep5 = step5IndividualForm.getValues();

    const dataObject = Object.assign(
      formStep1,
      formStep2,
      formStep3,
      formStep5
    );

    const formIndividualData = mapIndividualFormDataToAPI(dataObject);

    const dataObjectToSend = {
      ...formIndividualData,
      assigned_user_id: accountInfo.id,
      risk_score: individualAverageScore,
      status: ASSESSMENT_STATUS.PENDING_REVIEW,
      assessment_indicators: individualAssessmentIndicators,
      target_type: ASSESSMENT_CATEGORY.INDIVIDUAL,
    };

    dispatch(
      postNewCaseDataRequest({
        data: dataObjectToSend,
        toastMessage: TOAST_MESSAGE.SUBMIT_RISK_ASSIGNMENT.SUCCESS,
        redirectUrl: ASSESSMENT_STATUS.PENDING_REVIEW,
      })
    );
  };

  const handleUpdateFormIndividualInProgress = () => {
    const formStep2 = step2IndividualForm.getValues();
    const formStep3 = step3IndividualForm.getValues();
    const formStep5 = step5IndividualForm.getValues();

    const dataObject = Object.assign(formStep2, formStep3, formStep5);

    const formIndividualData = mapIndividualFormDataToAPI(dataObject);

    const dataObjectToSend = {
      ...formIndividualData,
      assigned_user_id: accountInfo.id,
      risk_score: individualAverageScore,
      status: ASSESSMENT_STATUS.PENDING_REVIEW,
      assessment_indicators: individualAssessmentIndicators,
    };

    dispatch(
      updateNewCaseDataRequest({
        id: pathName,
        data: dataObjectToSend,
        toastMessage: TOAST_MESSAGE.SUBMIT_RISK_ASSIGNMENT.SUCCESS,
        isBackToDashboard:
          individualAssessmentsCaseData.status ===
          ASSESSMENT_STATUS.IN_PROGRESS,
        redirectUrl: ASSESSMENT_STATUS.PENDING_REVIEW,
      })
    );
  };

  const handleUpdateFormIndividualPendingReview = () => {
    const formStep3 = step3IndividualForm.getValues();
    const formStep5 = step5IndividualForm.getValues();

    const dataObject = Object.assign(formStep3, formStep5);

    const formIndividualData = mapIndividualFormDataToAPI(dataObject);

    const dataObjectToSend = {
      ...formIndividualData,
      risk_score: individualAverageScore,
      status: ASSESSMENT_STATUS.PENDING_REVIEW,
      assessment_indicators: individualAssessmentIndicators,
    };

    dispatch(
      updateNewCaseDataRequest({
        id: pathName,
        data: dataObjectToSend,
        toastMessage: TOAST_MESSAGE.SUBMIT_RISK_ASSIGNMENT.SUCCESS,
      })
    );
  };

  const handleSaveDraftCorporate = () => {
    const formStep1 = step1Form.getValues();
    const formStep2 = step2CorporateForm.getValues();
    const formStep3 = step3CorporateForm.getValues();
    const formStep5 = step5CorporateForm.getValues();

    const dataObject = Object.assign(
      formStep1,
      formStep2,
      formStep3,
      formStep5
    );

    const formCorporateData = mapCorporateFormDataToAPI(dataObject);

    const dataObjectToSend = {
      ...formCorporateData,
      assigned_user_id: accountInfo.id,
      risk_score: corporateAverageScore,
      status: ASSESSMENT_STATUS.IN_PROGRESS,
      assessment_indicators: corporateAssessmentIndicators,
      target_type: !Object.keys(corporateAssessmentCaseData)?.length
        ? ASSESSMENT_CATEGORY.CORPORATE
        : null,
    };

    // Filter all empty values ( "", null, undefined, [] )
    for (const propName in dataObjectToSend) {
      for (const dataObjectCorporate in dataObjectToSend.corporate) {
        if (invalidInput(dataObjectToSend.corporate[dataObjectCorporate])) {
          delete dataObjectToSend.corporate[dataObjectCorporate];
        }
      }
      if (invalidInput(dataObjectToSend[propName])) {
        delete dataObjectToSend[propName];
      }
    }

    if (!Object.keys(corporateAssessmentCaseData)?.length) {
      dispatch(
        postNewCaseDataRequest({
          data: dataObjectToSend,
          toastMessage: TOAST_MESSAGE.SAVE_DRAFT.SUCCESS,
          redirectUrl: ASSESSMENT_STATUS.IN_PROGRESS,
        })
      );
    } else {
      dispatch(
        updateNewCaseDataRequest({
          id: pathName,
          isBackToDashboard: true,
          data: dataObjectToSend,
          toastMessage: TOAST_MESSAGE.SAVE_DRAFT.SUCCESS,
          redirectUrl: ASSESSMENT_STATUS.IN_PROGRESS,
        })
      );
    }
  };

  const handleSaveDraftIndividual = () => {
    const formStep1 = step1Form.getValues();
    const formStep2 = step2IndividualForm.getValues();
    const formStep3 = step3IndividualForm.getValues();
    const formStep5 = step5IndividualForm.getValues();

    const dataObject = Object.assign(
      formStep1,
      formStep2,
      formStep3,
      formStep5
    );

    const formIndividualData = mapIndividualFormDataToAPI(dataObject);

    const dataObjectToSend = {
      ...formIndividualData,
      assigned_user_id: accountInfo.id,
      risk_score: individualAverageScore,
      status: ASSESSMENT_STATUS.IN_PROGRESS,
      assessment_indicators: individualAssessmentIndicators,
      target_type: !Object.keys(individualAssessmentsCaseData)?.length
        ? ASSESSMENT_CATEGORY.INDIVIDUAL
        : null,
    };

    // Filter all empty values ( "", null, undefined, [] )
    for (const propName in dataObjectToSend) {
      for (const dataObjectCorporate in dataObjectToSend.individual) {
        if (invalidInput(dataObjectToSend.individual[dataObjectCorporate])) {
          delete dataObjectToSend.individual[dataObjectCorporate];
        }
      }
      if (invalidInput(dataObjectToSend[propName])) {
        delete dataObjectToSend[propName];
      }
    }

    if (!Object.keys(individualAssessmentsCaseData)?.length) {
      dispatch(
        postNewCaseDataRequest({
          data: dataObjectToSend,
          toastMessage: TOAST_MESSAGE.SAVE_DRAFT.SUCCESS,
          redirectUrl: ASSESSMENT_STATUS.IN_PROGRESS,
        })
      );
    } else {
      dispatch(
        updateNewCaseDataRequest({
          id: pathName,
          isBackToDashboard: true,
          data: dataObjectToSend,
          toastMessage: TOAST_MESSAGE.SAVE_DRAFT.SUCCESS,
          redirectUrl: ASSESSMENT_STATUS.IN_PROGRESS,
        })
      );
    }
  };

  const handleSaveAbortCorporate = () => {
    const formStep1 = step1Form.getValues();
    const formStep2 = step2CorporateForm.getValues();

    const dataObject = Object.assign(formStep1, formStep2);

    const formCorporateData = mapCorporateFormDataToAPI(dataObject);

    const dataObjectToSend = {
      ...formCorporateData,
      assigned_user_id: accountInfo.id,
      status: ASSESSMENT_STATUS.ABORTED,
      target_type: ASSESSMENT_CATEGORY.CORPORATE,
    };

    // Filter all empty values ( "", null, undefined, [] )
    for (const propName in dataObjectToSend) {
      for (const dataObjectCorporate in dataObjectToSend.corporate) {
        if (invalidInput(dataObjectToSend.corporate[dataObjectCorporate])) {
          delete dataObjectToSend.corporate[dataObjectCorporate];
        }
      }
      if (invalidInput(dataObjectToSend[propName])) {
        delete dataObjectToSend[propName];
      }
    }

    const cloneData = Object.assign({}, dataObjectToSend);
    const { target_type, ...dataObjectToUpdate } = cloneData;

    if (Object.keys(corporateAssessmentCaseData)?.length > 0) {
      dispatch(
        updateNewCaseDataRequest({
          id: pathName,
          isBackToDashboard: true,
          data: dataObjectToUpdate,
          toastMessage: TOAST_MESSAGE.SAVE_ABORTED.SUCCESS,
          redirectUrl: ASSESSMENT_STATUS.ABORTED,
        })
      );
    } else {
      dispatch(
        postNewCaseDataRequest({
          isBackToDashboard: true,
          data: dataObjectToSend,
          toastMessage: TOAST_MESSAGE.SAVE_ABORTED.SUCCESS,
          redirectUrl: ASSESSMENT_STATUS.ABORTED,
        })
      );
    }
  };

  const handleSaveAbortIndividual = () => {
    const formStep1 = step1Form.getValues();
    const formStep2 = step2IndividualForm.getValues();

    const dataObject = Object.assign(formStep1, formStep2);

    const formIndividualData = mapIndividualFormDataToAPI(dataObject);

    const dataObjectToSend = {
      ...formIndividualData,
      assigned_user_id: accountInfo.id,
      status: ASSESSMENT_STATUS.ABORTED,
      target_type: ASSESSMENT_CATEGORY.INDIVIDUAL,
    };

    // Filter all empty values ( "", null, undefined, [] )
    for (const propName in dataObjectToSend) {
      for (const dataObjectCorporate in dataObjectToSend.individual) {
        if (invalidInput(dataObjectToSend.individual[dataObjectCorporate])) {
          delete dataObjectToSend.individual[dataObjectCorporate];
        }
      }
      if (invalidInput(dataObjectToSend[propName])) {
        delete dataObjectToSend[propName];
      }
    }

    const cloneData = Object.assign({}, dataObjectToSend);
    const { target_type, ...dataObjectToUpdate } = cloneData;

    if (Object.keys(individualAssessmentsCaseData)?.length > 0) {
      dispatch(
        updateNewCaseDataRequest({
          id: pathName,
          isBackToDashboard: true,
          data: dataObjectToUpdate,
          toastMessage: TOAST_MESSAGE.SAVE_ABORTED.SUCCESS,
          redirectUrl: ASSESSMENT_STATUS.ABORTED,
        })
      );
    } else {
      dispatch(
        postNewCaseDataRequest({
          isBackToDashboard: true,
          data: dataObjectToSend,
          toastMessage: TOAST_MESSAGE.SAVE_ABORTED.SUCCESS,
          redirectUrl: ASSESSMENT_STATUS.ABORTED,
        })
      );
    }
  };

  const handleCorporatePreviewCase = () => {
    const formStep1 = step1Form.getValues();
    const formStep2 = step2CorporateForm.getValues();
    const formStep3 = step3CorporateForm.getValues();
    const formStep4 = step4CorporateForm.getValues();
    const formStep5 = step5CorporateForm.getValues();

    const dataObject = Object.assign(
      formStep1,
      formStep2,
      formStep3,
      formStep5
    );

    dispatch(
      setCorporatePreviewResultData({
        ...dataObject,
        assessment_indicators: formStep4,
        risk_score: corporateAverageScore,
      })
    );

    handleOpenPopupPreviewCase();
  };

  const handleIndividualPreviewCase = () => {
    const formStep1 = step1Form.getValues();
    const formStep2 = step2IndividualForm.getValues();
    const formStep3 = step3IndividualForm.getValues();
    const formStep4 = step4IndividualForm.getValues();
    const formStep5 = step5IndividualForm.getValues();

    const dataObject = Object.assign(
      formStep1,
      formStep2,
      formStep3,
      formStep5
    );

    dispatch(
      setIndividualPreviewResultData({
        ...dataObject,
        assessment_indicators: formStep4,
        risk_score: individualAverageScore,
      })
    );

    handleOpenPopupPreviewCase();
  };

  const handleOpenPopupPreviewCase = () => {
    setIsOpenPreviewResult(true);
  };

  const handleClosePopupPreviewCase = () => {
    setIsOpenPreviewResult(false);
  };

  const currentStepView = () => {
    if (step1Form.getValues('target_type') === ASSESSMENT_CATEGORY.CORPORATE) {
      switch (currentStep) {
        case STEPS.STEP1:
          return (
            <Step1EntityType
              assessmentCaseData={corporateAssessmentCaseData}
              handleNextStep={handleNextStep}
              form={step1Form}
            />
          );
        case STEPS.STEP2:
          return (
            <Step2CompanyStatusCorporate
              handleBackStep={handleBackStep}
              handleNextStep={handleNextStep}
              corporateAssessmentCaseData={corporateAssessmentCaseData}
              corporateGeneralSettings={corporateGeneralSettings}
              handleSubmitFormCorporateAssignee={
                handleSubmitFormCorporateAssignee
              }
              handleUpdateFormCorporateAssignee={
                handleUpdateFormCorporateAssignee
              }
              handleSaveAbortCorporate={handleSaveAbortCorporate}
              step5CorporateForm={step5CorporateForm}
              form={step2CorporateForm}
            />
          );

        case STEPS.STEP3:
          return (
            <Step3DetailsCorporate
              handleBackStep={handleBackStep}
              handleNextStep={handleNextStep}
              corporateAssessmentCaseData={corporateAssessmentCaseData}
              handleOpenSaveDraftDialog={handleOpenSaveDraftDialog}
              form={step3CorporateForm}
              formStep4={step4CorporateForm}
            />
          );
        case STEPS.STEP4:
          return (
            <Step4KeyRisksIndicatorCorporate
              handleBackStep={handleBackStep}
              handleNextStep={handleNextStep}
              corporateAssessmentCaseData={corporateAssessmentCaseData}
              handleOpenSaveDraftDialog={handleOpenSaveDraftDialog}
              form={step4CorporateForm}
              companyName={step2CorporateForm.getValues(
                CORPORATE_INPUT_NAME.COMPANY_NAME
              )}
            />
          );

        case STEPS.STEP5:
          return (
            <Step5AggregateRiskRatingCorporate
              handleBackStep={handleBackStep}
              handleSubmitFormCorporate={handleSubmitFormCorporate}
              handleUpdateFormCorporatePendingReview={
                handleUpdateFormCorporatePendingReview
              }
              handleUpdateFormCorporateInProgress={
                handleUpdateFormCorporateInProgress
              }
              form={step5CorporateForm}
              corporateAssessmentCaseData={corporateAssessmentCaseData}
              companyName={step2CorporateForm.getValues(
                CORPORATE_INPUT_NAME.COMPANY_NAME
              )}
              handleCorporatePreviewCase={handleCorporatePreviewCase}
              handleClosePopupPreviewCase={handleClosePopupPreviewCase}
              isOpenPreviewResult={isOpenPreviewResult}
            />
          );
        default:
          return (
            <Step1EntityType
              assessmentCaseData={corporateAssessmentCaseData}
              handleNextStep={handleNextStep}
              form={step1Form}
            />
          );
      }
    } else {
      switch (currentStep) {
        case STEPS.STEP1:
          return (
            <Step1EntityType
              assessmentCaseData={individualAssessmentsCaseData}
              handleNextStep={handleNextStep}
              form={step1Form}
            />
          );
        case STEPS.STEP2:
          return (
            <Step2CompanyStatusIndividual
              handleBackStep={handleBackStep}
              handleNextStep={handleNextStep}
              individualAssessmentsCaseData={individualAssessmentsCaseData}
              individualGeneralSettings={individualGeneralSettings}
              handleSubmitFormIndividualAssignee={
                handleSubmitFormIndividualAssignee
              }
              handleUpdateFormIndividualAssignee={
                handleUpdateFormIndividualAssignee
              }
              handleSaveAbortIndividual={handleSaveAbortIndividual}
              form={step2IndividualForm}
              step5IndividualForm={step5IndividualForm}
            />
          );

        case STEPS.STEP3:
          return (
            <Step3DetailsIndividual
              handleBackStep={handleBackStep}
              handleNextStep={handleNextStep}
              handleOpenSaveDraftDialog={handleOpenSaveDraftDialog}
              individualAssessmentsCaseData={individualAssessmentsCaseData}
              form={step3IndividualForm}
            />
          );
        case STEPS.STEP4:
          return (
            <Step4KeyRisksIndicatorIndividual
              handleBackStep={handleBackStep}
              handleNextStep={handleNextStep}
              handleOpenSaveDraftDialog={handleOpenSaveDraftDialog}
              individualAssessmentsCaseData={individualAssessmentsCaseData}
              legalName={step2IndividualForm.getValues(
                INDIVIDUAL_INPUT_NAME.FULL_LEGAL_NAME
              )}
              form={step4IndividualForm}
            />
          );

        case STEPS.STEP5:
          return (
            <Step5AggregateRiskRatingIndividual
              handleBackStep={handleBackStep}
              individualAssessmentsCaseData={individualAssessmentsCaseData}
              legalName={step2IndividualForm.getValues(
                INDIVIDUAL_INPUT_NAME.FULL_LEGAL_NAME
              )}
              handleSubmitFormIndividual={handleSubmitFormIndividual}
              handleUpdateFormIndividualPendingReview={
                handleUpdateFormIndividualPendingReview
              }
              handleUpdateFormIndividualInProgress={
                handleUpdateFormIndividualInProgress
              }
              handleIndividualPreviewCase={handleIndividualPreviewCase}
              handleClosePopupPreviewCase={handleClosePopupPreviewCase}
              isOpenPreviewResult={isOpenPreviewResult}
              form={step5IndividualForm}
            />
          );
        default:
          return (
            <Step1EntityType
              assessmentCaseData={individualAssessmentsCaseData}
              handleNextStep={handleNextStep}
              form={step1Form}
            />
          );
      }
    }
  };

  useEffect(() => {
    function updateSettingListener(isLoaded) {
      setIsLoadingSetting(isLoaded);
      if (!isOpenDialogWarning) {
        setIsOpenDialogWarning(true);
      }
    }
    EventEmitter.subscribe(Events.UPDATE_SETTING, updateSettingListener);
    return () => {
      EventEmitter.unsubscribe(Events.UPDATE_SETTING);
    };
  }, []);

  useEffect(() => {
    setIsLoadingPage(
      indicatorAssessmentsCaseStatus === REQUEST_STATUS.REQUESTING
    );
  }, [indicatorAssessmentsCaseStatus]);

  useEffect(() => {
    if (
      isRejectAccessCorporateAssessment ||
      isRejectAccessIndividualAssessment
    ) {
      return history.push(CLIENT_PATH.DASHBOARD);
    }
  }, [isRejectAccessCorporateAssessment, isRejectAccessIndividualAssessment]);

  useEffect(() => {
    if (pathName !== 'undefined') {
      dispatch(getDataAssessmentsCaseRequest({ id: pathName }));
    } else {
      dispatch(getDataAssessmentsSettingsRequest());
    }
    dispatch(getDataNewCaseSettingsRequest());
    setCurrentStep(1);

    dispatch(
      getUsersRequested({
        limit: 100,
        userStatus: 'active',
        selectedRole: '',
      })
    );

    return () => {
      dispatch(clearNewCaseData());
      dispatch(clearCorporateData());
      dispatch(clearIndividualData());
    };
  }, [pathName]);

  useEffect(() => {
    if (
      Object.keys(individualAssessmentsCaseData)?.length > 0 &&
      !(
        individualAssessmentsCaseData.reviewer_user_id === accountInfo.id ||
        individualAssessmentsCaseData.assigned_user_id === accountInfo.id
      )
    ) {
      history.push(CLIENT_PATH.DASHBOARD);
    }

    if (
      Object.keys(corporateAssessmentCaseData)?.length > 0 &&
      !(
        corporateAssessmentCaseData.reviewer_user_id === accountInfo.id ||
        corporateAssessmentCaseData.assigned_user_id === accountInfo.id
      )
    ) {
      history.push(CLIENT_PATH.DASHBOARD);
    }
  }, [corporateAssessmentCaseData, individualAssessmentsCaseData]);

  return (
    <>
      <LoadingOverlay active={isLoadingPage} spinner>
        <Wrapper>
          <Typography className="wrapper_title">NEW CASE</Typography>
          <Stepper
            activeStep={currentStep - 1}
            alternativeLabel
            connector={<StepperConnector />}
            className="wrapper_stepper"
          >
            {steps.map(({ label }) => (
              <Step key={label}>
                <StepLabel StepIconComponent={stepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box className="container">
            <Box>{currentStepView()}</Box>
          </Box>
        </Wrapper>
      </LoadingOverlay>
      <Prompt
        when={
          (!isSubmitSuccessfulStep5Corporate &&
            !isSubmitSuccessfulStep2Corporate &&
            (isDirtyStep2Corporate ||
              isDirtyStep3Corporate ||
              isDirtyStep4Corporate ||
              isDirtyStep5Corporate)) ||
          (!isSubmitSuccessfulStep5Individual &&
            !isSubmitSuccessfulStep2Individual &&
            (isDirtyStep2Individual ||
              isDirtyStep3Individual ||
              isDirtyStep4Individual ||
              isDirtyStep5Individual))
        }
        message={(location) => {
          setLocationPrompt(location.pathname);
          return "You haven't finished creating your New Risk Assessment yet. Do you want to leave without finishing?";
        }}
      />

      <Dialog maxWidth="sm" isOpenDialog={isOpenDialogWarning} title="Warning!">
        <div className="description">
          <p>
            Risk Assessment Settings has been changed. You will not be able to
            save or submit this assessment.
          </p>
          <p>
            Please reload this page and do the assessment again. Sorry for the
            inconvenience!
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {isLoadingSetting ? (
            <Button
              color="primary"
              variant="contained"
              style={{ marginRight: '20px' }}
            >
              <CircularProgress
                style={{ width: '20px', height: '20px', marginRight: '5px' }}
                color="secondary.light"
              />
              Loading Settings
            </Button>
          ) : (
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                window.location.reload();
              }}
              style={{ marginRight: '20px' }}
            >
              Reload page
            </Button>
          )}
        </div>
      </Dialog>
      <ConfirmSaveDraftDialog
        title="SAVE DRAFT"
        description="Save your Risk Assignment and comeback later to finish."
        isOpenDialog={isSaveDraftDialogOpen}
        maxWidth="sm"
        handleCloseDialog={handleCloseSaveDraftDialog}
      >
        <div style={{ float: 'right' }}>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => {
              handleCloseSaveDraftDialog();
            }}
            style={{ marginRight: '20px' }}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              onConfirmSaveDraft();
            }}
          >
            Save Draft
          </Button>
        </div>
      </ConfirmSaveDraftDialog>
    </>
  );
}

LoadingOverlay.propTypes = undefined;
export default React.memo(NewCase);
