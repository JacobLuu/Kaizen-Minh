import { ASSESSMENTS_SETTINGS } from '../constants/localStorage';

import { ASSESSMENT_STATUS } from '../constants/common';

const hookCheckAssessmentIndicatorsDuplicate = (data: any) => {
  let assessmentIndicatorsUnDuplicated;

  if (data.status === ASSESSMENT_STATUS.IN_PROGRESS) {
    // logic check assessment indicators data duplicate
    const primarySetting = JSON.parse(
      localStorage.getItem(ASSESSMENTS_SETTINGS)
    )?.indicator_settings?.[data.target_type]?.primary;
    const secondarySetting = JSON.parse(
      localStorage.getItem(ASSESSMENTS_SETTINGS)
    )?.indicator_settings?.[data.target_type]?.secondary;
    const indicatorSettings = primarySetting.concat(secondarySetting);

    let indicators = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < data.assessment_indicators.length; i++) {
      const item = data.assessment_indicators[i];
      const checkedIndicator = indicatorSettings.find(
        (e) => e.id === item.indicator_id
      );

      if (checkedIndicator) {
        indicators.push(item);
      }
    }
    assessmentIndicatorsUnDuplicated = indicators;
  } else {
    assessmentIndicatorsUnDuplicated = data.assessment_indicators;
  }
  return assessmentIndicatorsUnDuplicated;
};
export default hookCheckAssessmentIndicatorsDuplicate;
