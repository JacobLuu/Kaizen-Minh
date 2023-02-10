import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import { useBeforeunload } from 'react-beforeunload';
import { Prompt } from 'react-router';
import { Link } from 'react-router-dom';

import LoadingOverlay from 'react-loading-overlay';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import {
  selectRiskSetupSlice,
  getRiskAssessmentSetupRequest,
  saveRiskAssessmentSetupRequest,
} from './reducer';
import { setLocationPrompt } from '../../utils/locationPrompt';
import ContentLayout from '../ContentLayout';
import Corporate from './Corporate';
import Individual from './Individual';
import CLIENT_PATH from '../../constants/clientPath';
import { Wrapper, NavTabs, NavTab } from './styles';
import { REQUEST_STATUS } from '../../constants/common';
import validation from '../../translations/validation';

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

const tabTitle = [
  { title: 'Corporate', value: 0 },
  { title: 'Individual', value: 1 },
];

const resetDefaultValueSecondary = (data) => {
  return data.map((item) => {
    return {
      id: item.id,
      is_enabled: true,
    };
  });
};

function RiskSetup() {
  const [isLoading, setLoading] = useState(false);
  const [isTabValue, setTabValue] = useState(0);

  const {
    riskSetupStatus,
    updateRiskSetupStatus,
    corporateLabelSetting,
    corporateRecommendationSetting,
    corporateSecondary,
    generalCorporateSettings,
    defaultValuesCorporatePrimary,
    defaultValuesCorporateSecondary,
    generalDefaultCorporateSettings,
    /* INDIVIDUAL */
    individualSecondary,
    individualLabelSetting,
    individualRecommendationSetting,
    generalIndividualSettings,
    statusUpdateRiskTemplate,
    defaultValuesIndividualPrimary,
    defaultValuesIndividualSecondary,
    generalDefaultIndividualSettings,
  } = useSelector(selectRiskSetupSlice);

  const dispatch = useDispatch();

  const corporateForm = useForm({
    defaultValues: {
      corporate_general_setting: {
        is_include_bvd_number: generalCorporateSettings.is_include_bvd_number,
        is_require_manager_review:
          generalCorporateSettings.is_require_manager_review,
        is_show_risk_ratings: generalCorporateSettings.is_show_risk_ratings,
      },
      corporate_indicator_setting: {
        primary: defaultValuesCorporatePrimary,
        secondary: defaultValuesCorporateSecondary,
      },
    },
  });

  useEffect(() => {
    corporateForm.reset({
      corporate_general_setting: {
        is_include_bvd_number: generalCorporateSettings.is_include_bvd_number,
        is_require_manager_review:
          generalCorporateSettings.is_require_manager_review,
        is_show_risk_ratings: generalCorporateSettings.is_show_risk_ratings,
      },
      corporate_indicator_setting: {
        primary: defaultValuesCorporatePrimary,
        secondary: defaultValuesCorporateSecondary,
      },
    });
  }, [corporateSecondary, defaultValuesCorporateSecondary]);

  const individualForm = useForm({
    defaultValues: {
      individual_general_setting: {
        is_require_manager_review:
          generalIndividualSettings.is_require_manager_review,
        is_show_risk_ratings: generalIndividualSettings.is_show_risk_ratings,
      },
      individual_indicator_setting: {
        primary: defaultValuesIndividualPrimary,
        secondary: defaultValuesIndividualSecondary,
      },
    },
  });

  useEffect(() => {
    individualForm.reset({
      individual_general_setting: {
        is_require_manager_review:
          generalIndividualSettings.is_require_manager_review,
        is_show_risk_ratings: generalIndividualSettings.is_show_risk_ratings,
      },
      individual_indicator_setting: {
        primary: defaultValuesIndividualPrimary,
        secondary: defaultValuesIndividualSecondary,
      },
    });
  }, [individualSecondary, defaultValuesIndividualSecondary]);

  const isBlockedNavigate =
    !(updateRiskSetupStatus === REQUEST_STATUS.SUCCESS) &&
    (corporateForm.formState.isDirty || individualForm.formState.isDirty);

  const TabPanel = (props: TabPanelProps) => {
    const { children, value, index } = props;

    return <div>{value === index && <div>{children}</div>}</div>;
  };

  const handleSubmitForm = () => {
    const corporateData = corporateForm.getValues();
    const individualData = individualForm.getValues();

    const mapData = {
      ...corporateData,
      ...individualData,
      corporate_label_setting: { ...corporateLabelSetting },
      corporate_recommendation_setting: { ...corporateRecommendationSetting },
      individual_label_setting: { ...individualLabelSetting },
      individual_recommendation_setting: { ...individualRecommendationSetting },
    };
    dispatch(saveRiskAssessmentSetupRequest(mapData));
  };

  const handleChangeTabs = (e, newValue) => {
    setTabValue(newValue);
  };

  const restoreCorporateFormDefault = () => {
    const allowTransition = window.confirm(validation.invalid_restore_default);
    if (allowTransition) {
      corporateForm.reset({
        corporate_general_setting: {
          is_include_bvd_number:
            generalDefaultCorporateSettings.is_include_bvd_number,
          is_show_risk_ratings:
            generalDefaultCorporateSettings.is_show_risk_ratings,
          is_require_manager_review:
            generalDefaultCorporateSettings.is_require_manager_review,
        },
        corporate_indicator_setting: {
          primary: defaultValuesCorporatePrimary,
          secondary: resetDefaultValueSecondary(
            defaultValuesCorporateSecondary
          ),
        },
      });
    }
  };

  const restoreIndividualFormDefault = () => {
    const allowTransition = window.confirm(validation.invalid_restore_default);
    if (allowTransition) {
      individualForm.reset({
        individual_general_setting: {
          is_show_risk_ratings:
            generalDefaultIndividualSettings.is_show_risk_ratings,
          is_require_manager_review:
            generalDefaultIndividualSettings.is_require_manager_review,
        },
        individual_indicator_setting: {
          primary: defaultValuesIndividualPrimary,
          secondary: resetDefaultValueSecondary(
            defaultValuesIndividualSecondary
          ),
        },
      });
    }
  };

  useBeforeunload((event) => {
    if (isBlockedNavigate) {
      event.preventDefault();
    }
  });

  useEffect(() => {
    setLoading(riskSetupStatus === REQUEST_STATUS.REQUESTING);
  }, [riskSetupStatus]);

  useEffect(() => {
    setLoading(statusUpdateRiskTemplate === REQUEST_STATUS.REQUESTING);
    if (statusUpdateRiskTemplate === REQUEST_STATUS.SUCCESS) {
      dispatch(getRiskAssessmentSetupRequest());
    }
  }, [statusUpdateRiskTemplate]);

  useEffect(() => {
    dispatch(getRiskAssessmentSetupRequest());
  }, []);

  return (
    <ContentLayout
      // isDirty={
      //   corporateForm.formState.isDirty || individualForm.formState.isDirty
      // }
      scrollToTop={riskSetupStatus === REQUEST_STATUS.SUCCESS}
    >
      <LoadingOverlay active={isLoading} spinner>
        <Wrapper>
          <Typography className="wrapper_title">
            RISK ASSESSMENT SETUP
          </Typography>
          <Typography className="wrapper_detail">
            Please take time to customise the Risk Assessment to your desired
            settings
          </Typography>
          <NavTabs value={isTabValue} onChange={handleChangeTabs}>
            {tabTitle.map((items) => (
              <NavTab
                textColor="primary"
                disableRipple
                focusRipple
                disableFocusRipple={false}
                key={items.value}
                label={items.title}
                selected
              />
            ))}
          </NavTabs>
          <TabPanel value={isTabValue} index={0}>
            <Corporate form={corporateForm} />
            <Box className="wrapper_button_group">
              <Box>
                <Typography
                  style={{ marginBottom: '20px' }}
                  className="wrapper_link"
                  onClick={restoreCorporateFormDefault}
                >
                  Restore to Default Recommendations
                </Typography>
                <Typography
                  component={Link}
                  className="wrapper_link"
                  to={CLIENT_PATH.RISK_SETUP_SETTINGS_CORPORATE}
                >
                  <SettingsOutlinedIcon style={{ marginRight: '5px' }} />
                  Advanced Settings
                </Typography>
              </Box>
              <Button
                disabled={
                  statusUpdateRiskTemplate === REQUEST_STATUS.REQUESTING
                }
                color="primary"
                variant="contained"
                onClick={handleSubmitForm}
              >
                Save
              </Button>
            </Box>
          </TabPanel>

          <TabPanel value={isTabValue} index={1}>
            <Individual form={individualForm} />
            <Box className="wrapper_button_group">
              <Box>
                <Typography
                  style={{ marginBottom: '20px' }}
                  className="wrapper_link"
                  onClick={restoreIndividualFormDefault}
                >
                  Restore to Default Recommendations
                </Typography>
                <Typography
                  component={Link}
                  className="wrapper_link"
                  to={CLIENT_PATH.RISK_SETUP_SETTINGS_INDIVIDUAL}
                >
                  <SettingsOutlinedIcon style={{ marginRight: '5px' }} />
                  Advanced Settings
                </Typography>
              </Box>
              <Button
                disabled={
                  statusUpdateRiskTemplate === REQUEST_STATUS.REQUESTING
                }
                color="primary"
                variant="contained"
                onClick={handleSubmitForm}
              >
                Save
              </Button>
            </Box>
          </TabPanel>
        </Wrapper>
      </LoadingOverlay>
      <Prompt
        when={isBlockedNavigate}
        message={(location) => {
          setLocationPrompt(location.pathname);
          return 'You haven\'t finished setting up your Risk Assessment yet. Do you want to leave without finishing?';
        }}
      />
    </ContentLayout>
  );
}

export default RiskSetup;
