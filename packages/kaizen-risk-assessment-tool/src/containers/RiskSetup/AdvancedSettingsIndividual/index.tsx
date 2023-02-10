import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import KeyboardBackspaceRoundedIcon from '@material-ui/icons/KeyboardBackspaceRounded';
import { useForm } from 'react-hook-form';
import { Prompt } from 'react-router';
import { Link } from 'react-router-dom';
import { useBeforeunload } from 'react-beforeunload';
import { useSelector, useDispatch } from 'react-redux';
import LabelCustomization from '../AdvancedSettings/LabelCustomization';
import RecommendationsCustomization from '../AdvancedSettings/RecommendationsCustomization';
import { setLocationPrompt } from '../../../utils/locationPrompt';
import ProhibitedClientList from './ProhibitedClientList';
import history from '../../../utils/history';
import CLIENT_PATH from '../../../constants/clientPath';
import {
  selectRiskSetupSlice,
  getRiskAssessmentSetupRequest,
} from '../reducer';
import { Container, SettingTabs, SettingTab, NavTabs, NavTab } from '../styles';

import { KAIZEN_BLUE_LINK } from '../../../themes/colors';
import validation from '../../../translations/validation';
import { REQUEST_STATUS } from '../../../constants/common';

const tabSettings = [
  { title: 'Label Customisation', value: 0 },
  { title: 'Recommendations Customisation', value: 1 },
  { title: 'Prohibited Client List', value: 2 },
];
interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

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
const AdvancedSettingsIndividual = () => {
  const [isTabAdvancedSettingsIndividual, setTabAdvancedSettingsIndividual] =
    React.useState(0);

  const dispatch = useDispatch();
  const {
    individualLabelSetting,
    individualRecommendationSetting,
    updateRiskSetupStatus,
  } = useSelector(selectRiskSetupSlice);

  const labelCustomizationIndividualForm = useForm({
    defaultValues: {
      individual_label_setting: {
        full_legal_name: '',
        country_of_birth: '',
        date_of_birth: '',
        known_as_name: '',
        country_of_residence: '',
        tile_role: '',
        individual_sector: '',
        nationality: '',
        legal_type: '',
      },
    },
  });

  useEffect(() => {
    labelCustomizationIndividualForm.reset({
      individual_label_setting: {
        full_legal_name:  individualLabelSetting.full_legal_name,
        country_of_birth:  individualLabelSetting.country_of_birth,
        date_of_birth:  individualLabelSetting.date_of_birth,
        known_as_name:  individualLabelSetting.known_as_name,
        country_of_residence:  individualLabelSetting.country_of_residence,
        tile_role:  individualLabelSetting.tile_role,
        individual_sector:  individualLabelSetting.individual_sector,
        nationality:  individualLabelSetting.nationality,
        legal_type:  individualLabelSetting.legal_type,
      },
    });
  }, [individualLabelSetting]);

  const recommendationsCustomizationIndividualForm = useForm({
    defaultValues: {
      individual_recommendation_setting: {
        high_risk_recommendation: '',
        medium_risk_recommendation: '',
        low_risk_recommendation: '',
      },
    },
  });

  useEffect(() => {
    recommendationsCustomizationIndividualForm.reset({
      individual_recommendation_setting: {
        high_risk_recommendation:
          individualRecommendationSetting.high_risk_recommendation,
        medium_risk_recommendation:
          individualRecommendationSetting.medium_risk_recommendation,
        low_risk_recommendation:
          individualRecommendationSetting.low_risk_recommendation,
      },
    });
  }, [individualRecommendationSetting]);

  const labelCustomizationIndividualFormStatus =
    !labelCustomizationIndividualForm.formState.isSubmitSuccessful &&
    labelCustomizationIndividualForm.formState.isDirty;

  const recommendationsCustomizationIndividualFormStatus =
    !recommendationsCustomizationIndividualForm.formState.isSubmitSuccessful &&
    recommendationsCustomizationIndividualForm.formState.isDirty;

  const handleChangeTabsIndividual = (e, newValue) => {
    if (
      labelCustomizationIndividualFormStatus ||
      recommendationsCustomizationIndividualFormStatus
    ) {
      const allowTransition = window.confirm(
        'You haven\'t finished setting up your Risk Assessment yet. Do you want to leave without finishing?'
      );
      if (allowTransition === true) {
        setTabAdvancedSettingsIndividual(newValue);
        dispatch(getRiskAssessmentSetupRequest());
      }
      return;
    }
    setTabAdvancedSettingsIndividual(newValue);
  };

  useBeforeunload((event) => {
    if (
      labelCustomizationIndividualFormStatus ||
      recommendationsCustomizationIndividualFormStatus
    ) {
      event.preventDefault();
    }
  });

  const restoreIndividualFormDefault = () => {
    const allowTransition = window.confirm(validation.invalid_restore_default);
    if (allowTransition) {
      labelCustomizationIndividualForm.reset({
        individual_label_setting: {
          full_legal_name: '',
          country_of_birth: '',
          date_of_birth: '',
          known_as_name: '',
          country_of_residence: '',
          tile_role: '',
          individual_sector: '',
          nationality: '',
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
        <NavTabs value={1}>
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
          value={isTabAdvancedSettingsIndividual}
          variant="scrollable"
          scrollButtons="auto"
          onChange={handleChangeTabsIndividual}
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
        <TabPanel value={isTabAdvancedSettingsIndividual} index={0}>
          <Box>
            <LabelCustomization
              restoreIndividualFormDefault={restoreIndividualFormDefault}
              form={labelCustomizationIndividualForm}
            />
          </Box>
        </TabPanel>
        <TabPanel value={isTabAdvancedSettingsIndividual} index={1}>
          <Box>
            <RecommendationsCustomization
              form={recommendationsCustomizationIndividualForm}
            />
          </Box>
        </TabPanel>
        <TabPanel value={isTabAdvancedSettingsIndividual} index={2}>
          <Box>
            <ProhibitedClientList />
          </Box>
        </TabPanel>
      </Container>
      <Prompt
        when={
          labelCustomizationIndividualFormStatus ||
          recommendationsCustomizationIndividualFormStatus
        }
        message={(location) => {
          setLocationPrompt(location.pathname);
          return 'You haven\'t finished setting up your Risk Assessment yet. Do you want to leave without finishing?';
        }}
      />
    </>
  );
};

export default AdvancedSettingsIndividual;
