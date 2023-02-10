import React from 'react';
import Typography from '@material-ui/core/Typography';
import { RISK_RATING, RISK_SCORES } from '../../constants/common';
import { Results } from './styles';

const CalculateRickScore = ({
  averageScore,
  isAssessmentRatingHigh,
  form,
}: any) => {
  const riskScoreRating = React.useMemo(() => {
    if (isAssessmentRatingHigh) {
      form.setValue('risk_rating', RISK_RATING.HIGH);
      return (
        <>
          <Typography className="wrapper_result_title">
            Risk Rating:
            <span className="wrapper_result_high">HIGH</span>
          </Typography>
          <Typography className="wrapper_result_title">
            Risk Score:
            <span className="wrapper_result_high">{averageScore}</span>
          </Typography>
        </>
      );
    }
    if (averageScore === RISK_SCORES.LOWER_BOUND_LOW_RISK_SCORE) return null;
    if (
      averageScore > RISK_SCORES.LOWER_BOUND_LOW_RISK_SCORE &&
      averageScore < RISK_SCORES.UPPER_BOUND_LOW_RISK_SCORE
    ) {
      form.setValue('risk_rating', RISK_RATING.LOW);
      return (
        <>
          <Typography className="wrapper_result_title">
            Risk Rating:
            <span className="wrapper_result_low">LOW</span>
          </Typography>

          <Typography className="wrapper_result_title">
            Risk Score:
            <span className="wrapper_result_low">{averageScore}</span>
          </Typography>
        </>
      );
    }
    if (
      averageScore >= RISK_SCORES.UPPER_BOUND_LOW_RISK_SCORE &&
      averageScore < RISK_SCORES.LOWER_BOUND_HIGH_RISK_SCORE
    ) {
      form.setValue('risk_rating', RISK_RATING.MEDIUM);
      return (
        <>
          <Typography className="wrapper_result_title">
            Risk Rating:
            <span className="wrapper_result_medium">MEDIUM</span>
          </Typography>
          <Typography className="wrapper_result_title">
            Risk Score:
            <span className="wrapper_result_medium">{averageScore}</span>
          </Typography>
        </>
      );
    }
    if (averageScore >= RISK_SCORES.LOWER_BOUND_HIGH_RISK_SCORE) {
      form.setValue('risk_rating', RISK_RATING.HIGH);
      return (
        <>
          <Typography className="wrapper_result_title">
            Risk Rating:
            <span className="wrapper_result_high">HIGH</span>
          </Typography>

          <Typography className="wrapper_result_title">
            Risk Score:
            <span className="wrapper_result_high">{averageScore}</span>
          </Typography>
        </>
      );
    }
    return null;
  }, [averageScore, isAssessmentRatingHigh]);

  return (
    <div>
      {riskScoreRating ? <Results>{riskScoreRating}</Results> : <div />}
    </div>
  );
};

export default CalculateRickScore;
