import { RISK_SCORES, RISK_RATING } from '../constants/common';

const hookConvertRiskScoreToRating = (averageScore) => {
    if (averageScore === RISK_SCORES.LOWER_BOUND_LOW_RISK_SCORE) return RISK_RATING.NA;
    if (
      averageScore > RISK_SCORES.LOWER_BOUND_LOW_RISK_SCORE &&
      averageScore < RISK_SCORES.UPPER_BOUND_LOW_RISK_SCORE
    ) {
      return RISK_RATING.LOW;
    }
    if (
      averageScore >= RISK_SCORES.UPPER_BOUND_LOW_RISK_SCORE &&
      averageScore < RISK_SCORES.LOWER_BOUND_HIGH_RISK_SCORE
    ) {
      return RISK_RATING.MEDIUM;
    }
    if (averageScore >= RISK_SCORES.LOWER_BOUND_HIGH_RISK_SCORE) {
      return RISK_RATING.HIGH;
    }
    return null;
};

export default hookConvertRiskScoreToRating;
