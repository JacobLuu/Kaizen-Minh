import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { selectRiskSetupSlice } from './reducer';
import GeneralSettings from './GeneralSettings';
import KeyRiskIndicators from './KeyRiskIndicators';
import { ASSESSMENT_CATEGORY, ASSESSMENT_TARGET_TYPE } from '../../constants/common'

function Individual({ form: individualForm }: any) {
  const { generalIndividualSettings, individualSecondary, individualPrimary } =
    useSelector(selectRiskSetupSlice);

  return (
    <div>
      <GeneralSettings
        client={ASSESSMENT_CATEGORY.INDIVIDUAL}
        fields={generalIndividualSettings}
        form={individualForm}
      />
      <Typography className="wrapper_sub_title">Key Risk Indicators</Typography>
      <KeyRiskIndicators
        typeIndicator='individual_indicator_setting'
        typeField={ASSESSMENT_TARGET_TYPE.PRIMARY}
        client={ASSESSMENT_CATEGORY.INDIVIDUAL}
        label="Primary Fields"
        disableCheckbox
        fields={individualPrimary}
        form={individualForm}
      />
      <KeyRiskIndicators
        typeIndicator='individual_indicator_setting'
        typeField={ASSESSMENT_TARGET_TYPE.SECONDARY}
        client={ASSESSMENT_CATEGORY.INDIVIDUAL}
        label="Secondary Fields"
        fields={individualSecondary}
        form={individualForm}
      />
    </div>
  );
}

export default Individual;
