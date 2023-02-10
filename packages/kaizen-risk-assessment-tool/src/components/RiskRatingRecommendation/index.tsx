import React from 'react';
import { RISK_RATING } from '../../constants/common';
import { Container, Recommendation } from './styles';

export default ({ riskRating, recommendationSetting }: any) => {
  const getRickRatingRecommendation = () => {
    if (
      riskRating === RISK_RATING.HIGH &&
      recommendationSetting?.high_risk_recommendation
    ) {
      return (
        <Recommendation>
          {recommendationSetting.high_risk_recommendation}
        </Recommendation>
      );
    }

    if (
      riskRating === RISK_RATING.MEDIUM &&
      recommendationSetting?.medium_risk_recommendation
    ) {
      return (
        <Recommendation>
          {recommendationSetting?.medium_risk_recommendation}
        </Recommendation>
      );
    }

    if (
      riskRating === RISK_RATING.LOW &&
      recommendationSetting?.low_risk_recommendation
    ) {
      return (
        <Recommendation>
          {recommendationSetting?.low_risk_recommendation}
        </Recommendation>
      );
    }
    return (
      <Recommendation>
        This client is classified as{' '}
        <span className={`text_${riskRating}`}>{riskRating}</span> risk. Subject
        to internal policies and procedures, our recommendations will include
        to:
        {riskRating === RISK_RATING.HIGH && (
          <ul>
            <li>Perform enhanced due diligence</li>
            <li>Review client profile every 1 year*</li>
            <li>Obtain senior management approval</li>
            <li>Gather certified KYC, ID&V, CDD documentation</li>
            <li>Corroborate information from secondary sources</li>
          </ul>
        )}
        {riskRating === RISK_RATING.MEDIUM && (
          <ul>
            <li>Perform standard due diligence</li>
            <li>Review client profile every 2 or 3 years*</li>
          </ul>
        )}
        {riskRating === RISK_RATING.LOW && (
          <ul>
            <li>
              Perform simplified due diligence (if regulated or listed in
              comparable jurisdiction)
            </li>
            <li>Perform standard due diligence</li>
            <li>Review client profile every 3 or 5 years*</li>
          </ul>
        )}
      </Recommendation>
    );
  };

  return <Container>{getRickRatingRecommendation()}</Container>;
};
