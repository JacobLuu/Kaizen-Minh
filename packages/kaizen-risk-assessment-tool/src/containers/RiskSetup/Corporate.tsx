import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { selectRiskSetupSlice } from './reducer';
import { ASSESSMENT_CATEGORY, ASSESSMENT_TARGET_TYPE } from '../../constants/common'
import GeneralSettings from './GeneralSettings';
import KeyRiskIndicators from './KeyRiskIndicators';

function Corporate({ form: corporateForm }: any) {
  const { corporatePrimary, corporateSecondary } =
    useSelector(selectRiskSetupSlice);

  return (
    <div>
      <GeneralSettings
        client={ASSESSMENT_CATEGORY.CORPORATE}
        form={corporateForm}
      />
      <Typography className="wrapper_sub_title">Key Risk Indicators</Typography>
      <KeyRiskIndicators
        typeIndicator='corporate_indicator_setting'
        typeField={ASSESSMENT_TARGET_TYPE.PRIMARY}
        client={ASSESSMENT_CATEGORY.CORPORATE}
        label="Primary Fields"
        disableCheckbox
        fields={corporatePrimary}
        form={corporateForm}
      />
      <KeyRiskIndicators
        typeIndicator='corporate_indicator_setting'
        typeField={ASSESSMENT_TARGET_TYPE.SECONDARY}
        client={ASSESSMENT_CATEGORY.CORPORATE}
        label="Secondary Fields"
        fields={corporateSecondary}
        form={corporateForm}
      />
    </div>
  );
}

export default Corporate;
