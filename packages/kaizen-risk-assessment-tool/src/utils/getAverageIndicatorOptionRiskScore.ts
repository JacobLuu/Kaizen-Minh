import _ from 'lodash';

export const getAverageIndicatorOptionRiskScore = (options) => {
  let total = 0;

  const indicatorData = options.map((option) => {
    const indicator_options = option?.indicator_options?.filter(
      (e) => e.indicator_option_risk_score > 0
    );
    if (indicator_options?.length > 0) {
      const optionRiskScore =
        indicator_options?.reduce((sum, item) => {
          return sum + item?.indicator_option_risk_score;
        }, 0) / indicator_options?.length;
      total += optionRiskScore;
      return {
        ...option,
        indicator_options,
      };
    }
    return null;
  });

  const optionsClean = _.compact(indicatorData);

  return total / optionsClean.length;
};

export const getAverageIndicatorOptions = (options) => {
  return (
    options.reduce((sum, item) => {
      return sum + item?.risk_score;
    }, 0) / options?.length
  );
};
