import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import { useForm } from 'react-hook-form';
import Typography from '@material-ui/core/Typography';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import KeyboardBackspaceRoundedIcon from '@material-ui/icons/KeyboardBackspaceRounded';
import { Link } from 'react-router-dom';
import { Prompt } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useBeforeunload } from 'react-beforeunload';
import LabelCustomization from '../AdvancedSettings/LabelCustomization';
import RecommendationsCustomization from '../AdvancedSettings/RecommendationsCustomization';
import ProhibitedClientList from './ProhibitedClientList';
import history from '../../../utils/history';
import CLIENT_PATH from '../../../constants/clientPath';
import validation from '../../../translations/validation';
import { setLocationPrompt } from '../../../utils/locationPrompt';
import {
  selectRiskSetupSlice,
  getRiskAssessmentSetupRequest,
} from '../reducer';
import { NavTabs, NavTab, Container, SettingTabs, SettingTab } from '../styles';
import { KAIZEN_BLUE_LINK } from '../../../themes/colors';
import { REQUEST_STATUS } from '../../../constants/common';

const tabSettings = [
  { title: 'Label Customisation', value: 0 },
  { title: 'Recommendations Customisation', value: 1 },
  { title: 'Prohibited Client List', value: 2 },
];

const tabTitle = [
  {
    title: 'Corporate',
    value: 0,
    path: CLIENT_PATH.RISK_SETUP_SETTINGS_CORPORATE,
  },
  {
    title: 'Individual',
    value: 1,
    path: CLIENT_PATH.RISK_SETUP_SETTINGS_INDIVIDUAL,
  },
];

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

const AdvancedSettingsCorporate = () => {
  const {
    corporateLabelSetting,
    corporateRecommendationSetting,
    updateRiskSetupStatus,
  } = useSelector(selectRiskSetupSlice);

  const [isTabAdvancedSettingsCorporate, setTabAdvancedSettingsCorporate] =
    useState(0);

  const labelCustomizationCorporateForm = useForm({
    defaultValues: {
      corporate_label_setting: {
        is_company_incorporated: '',
        corporate_name: '',
        corporate_number: '',
        date_of_incorporation: '',
        company_age: '',
        client_type: '',
        corporate_status: '',
        country_of_incorporation: '',
        country_of_operation: '',
        bvd_number: '',
        internal_id: '',
        regulatory_id: '',
        listed: '',
        legal_type: '',
      },
    },
  });

  const recommendationsCustomizationCorporateForm = useForm({
    defaultValues: {
      corporate_recommendation_setting: {
        high_risk_recommendation: '',
        medium_risk_recommendation: '',
        low_risk_recommendation: '',
      },
    },
  });

  useEffect(() => {
    labelCustomizationCorporateForm.reset({
      corporate_label_setting: {
        is_company_incorporated: corporateLabelSetting?.is_company_incorporated,
        corporate_name: corporateLabelSetting?.corporate_name,
        corporate_number: corporateLabelSetting?.corporate_number,
        date_of_incorporation: corporateLabelSetting?.date_of_incorporation,
        company_age: corporateLabelSetting?.company_age,
        client_type: corporateLabelSetting?.client_type,
        corporate_status: corporateLabelSetting?.corporate_status,
        country_of_incorporation:
          corporateLabelSetting?.country_of_incorporation,
        country_of_operation: corporateLabelSetting?.country_of_operation,
        bvd_number: corporateLabelSetting?.bvd_number,
        internal_id: corporateLabelSetting?.internal_id,
        regulatory_id: corporateLabelSetting?.regulatory_id,
        listed: corporateLabelSetting?.listed,
        legal_type: corporateLabelSetting?.legal_type,
      },
    });
  }, [corporateLabelSetting]);

  useEffect(() => {
    recommendationsCustomizationCorporateForm.reset({
      corporate_recommendation_setting: {
        high_risk_recommendation:
          corporateRecommendationSetting.high_risk_recommendation,
        medium_risk_recommendation:
          corporateRecommendationSetting.medium_risk_recommendation,
        low_risk_recommendation:
          corporateRecommendationSetting.low_risk_recommendation,
      },
    });
  }, [corporateRecommendationSetting]);

  const labelCustomizationCorporateFormStatus =
    !labelCustomizationCorporateForm.formState.isSubmitSuccessful &&
    labelCustomizationCorporateForm.formState.isDirty;

  const recommendationsCustomizationCorporateFormStatus =
    !recommendationsCustomizationCorporateForm.formState.isSubmitSuccessful &&
    recommendationsCustomizationCorporateForm.formState.isDirty;

  const dispatch = useDispatch();

  useBeforeunload((event) => {
    if (
      labelCustomizationCorporateFormStatus ||
      recommendationsCustomizationCorporateFormStatus
    ) {
      event.preventDefault();
    }
  });

  const handleChangeTabsCorporate = (e, newValue) => {
    if (
      labelCustomizationCorporateFormStatus ||
      recommendationsCustomizationCorporateFormStatus
    ) {
      const allowTransition = window.confirm(
        'You haven\'t finished setting up your Risk Assessment yet. Do you want to leave without finishing?'
      );
      if (allowTransition === true) {
        setTabAdvancedSettingsCorporate(newValue);
        dispatch(getRiskAssessmentSetupRequest());
      }
      return;
    }
    setTabAdvancedSettingsCorporate(newValue);
  };

  const restoreCorporateFormDefault = () => {
    const allowTransition = window.confirm(validation.invalid_restore_default);
    if (allowTransition) {
      labelCustomizationCorporateForm.reset({
        corporate_label_setting: {
          is_company_incorporated: '',
          corporate_name: '',
          corporate_number: '',
          date_of_incorporation: '',
          company_age: '',
          client_type: '',
          corporate_status: '',
          country_of_incorporation: '',
          country_of_operation: '',
          bvd_number: '',
          internal_id: '',
          regulatory_id: '',
          listed: '',
          legal_type: '',
        },
      });
    }
  };

  useEffect(() => {
    if (updateRiskSetupStatus === REQUEST_STATUS.SUCCESS) {
      dispatch(getRiskAssessmentSetupRequest());
    }
  }, [updateRiskSetupStatus]);

  useEffect(() => {
    dispatch(getRiskAssessmentSetupRequest());
  }, []);

  return (
    <>
      <Container>
        <Typography className="wrapper_title">RISK ASSESSMENT SETUP</Typography>
        <Typography className="wrapper_detail">
          Please take time to customise the Risk Assessment to your desired
          settings
        </Typography>
        <NavTabs value={0}>
          {tabTitle.map((items) => (
            <NavTab
              component={Link}
              textColor="primary"
              disableRipple
              focusRipple
              disableFocusRipple={false}
              key={items.value}
              label={items.title}
              selected
              to={items.path}
            />
          ))}
        </NavTabs>
        <Typography className="back_button">
          <KeyboardBackspaceRoundedIcon
            onClick={() => history.push(CLIENT_PATH.RISK_SETUP)}
            style={{ color: KAIZEN_BLUE_LINK, cursor: 'pointer' }}
          />
          <SettingsOutlinedIcon style={{ marginRight: '5px' }} />
          Advanced Settings
        </Typography>
        <SettingTabs
          value={isTabAdvancedSettingsCorporate}
          variant="scrollable"
          scrollButtons="auto"
          onChange={handleChangeTabsCorporate}
        >
          {tabSettings.map((items) => (
            <SettingTab
              textColor="primary"
              disableRipple
              focusRipple
              disableFocusRipple={false}
              key={items.value}
              label={items.title}
            />
          ))}
        </SettingTabs>
        <TabPanel value={isTabAdvancedSettingsCorporate} index={0}>
          <Box>
            <LabelCustomization
              isCorporate
              restoreCorporateFormDefault={restoreCorporateFormDefault}
              form={labelCustomizationCorporateForm}
            />
          </Box>
        </TabPanel>
        <TabPanel value={isTabAdvancedSettingsCorporate} index={1}>
          <Box>
            <RecommendationsCustomization
              isCorporate
              form={recommendationsCustomizationCorporateForm}
            />
          </Box>
        </TabPanel>
        <TabPanel value={isTabAdvancedSettingsCorporate} index={2}>
          <Box>
            <ProhibitedClientList />
          </Box>
        </TabPanel>
      </Container>
      <Prompt
        when={
          labelCustomizationCorporateFormStatus ||
          recommendationsCustomizationCorporateFormStatus
        }
        message={(location) => {
          setLocationPrompt(location.pathname);
          return 'You haven\'t finished setting up your Risk Assessment yet. Do you want to leave without finishing?';
        }}
      />
    </>
  );
};

export default AdvancedSettingsCorporate;
