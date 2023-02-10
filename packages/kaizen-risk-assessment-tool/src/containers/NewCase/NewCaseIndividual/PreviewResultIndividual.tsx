import React from 'react';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import { useSelector } from 'react-redux';
import { selectNewCaseIndividualStore } from './reducer';
import DetailAssessmentItem from '../../../components/DetailAssessmentItem';
import ResultsProgress from '../../../components/ResultsProgress';
import RiskRatingRecommendation from '../../../components/RiskRatingRecommendation';
import hookConvertRiskScoreToRating from '../../../utils/hookConvertRiskScoreToRating';
import Tooltip from '../../../components/Tooltip';

import { KAIZEN_RED, KAIZEN_BLUE } from '../../../themes/colors';

import { PreviewPage, TextWarning } from '../styles';

const PreviewResultIndividual = ({ isProhibitedClient, onClose }: any) => {
  const {
    keyRiskIndicators,
    previewResultData,
    countriesOfBirth,
    individualFieldName,
    individualRecommendationSetting,
  } = useSelector(selectNewCaseIndividualStore);

  const getIndicatorOptions = (data: any) => {
    return data?.indicator_selected_option?.indicatorOptions
      .map((item) => {
        return item?.short_description || item?.name;
      })
      .join(', ');
  };

  return (
    <PreviewPage>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="result_title_box">
          <p className="results_title">Risk Assessment Results</p>
          <div>
            {previewResultData.risk_rating && (
              <span className="risk_title_left">
                Risk Rating:
                <p
                  className={`risk_value risk_value_${previewResultData.risk_rating}`}
                >
                  {previewResultData.risk_rating}
                </p>
              </span>
            )}

            {previewResultData.risk_score && (
              <span className="risk_title_left">
                Risk Score:
                <p
                  className={`risk_value risk_value_${hookConvertRiskScoreToRating(
                    previewResultData.risk_score
                  )}`}
                >
                  {previewResultData.risk_score}
                </p>
              </span>
            )}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            flexDirection: 'column',
          }}
        >
          <Tooltip title={previewResultData?.legal_name}>
            <p
              className="risk_title_right"
              style={
                isProhibitedClient
                  ? { color: KAIZEN_RED }
                  : { color: KAIZEN_BLUE }
              }
            >
              {previewResultData?.legal_name}
            </p>
          </Tooltip>
          {isProhibitedClient && (
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <ReportProblemOutlinedIcon className="risk_warning" />
              <p className="risk_warning">Prohibited Client</p>
            </span>
          )}
        </div>
      </div>

      {previewResultData.risk_score && (
        <ResultsProgress
          dataResult={{ riskScore: previewResultData.risk_score }}
        />
      )}

      <RiskRatingRecommendation
        riskRating={previewResultData.risk_rating}
        recommendationSetting={individualRecommendationSetting}
      />

      <div className="results_risk_assessment">
        <p className="kaizen_blue_text--fw600 results_details_title">Details</p>

        <div className="results_details">
          {previewResultData?.legal_name && (
            <DetailAssessmentItem
              label={individualFieldName?.individualName}
              content={previewResultData?.legal_name}
            />
          )}

          {previewResultData?.known_as_name && (
            <DetailAssessmentItem
              label={individualFieldName?.knownAsName}
              content={previewResultData?.known_as_name}
            />
          )}

          {previewResultData?.title && (
            <DetailAssessmentItem
              label={individualFieldName?.tileRole}
              content={previewResultData?.title}
            />
          )}

          {previewResultData?.sector_ids && (
            <DetailAssessmentItem
              label={individualFieldName?.individualSector}
              content={previewResultData?.sector_ids?.short_description}
            />
          )}

          {previewResultData?.dual_nationality_country_ids.length > 0 && (
            <DetailAssessmentItem
              label={individualFieldName?.dualNationality}
              content={
                previewResultData?.dual_nationality_country_ids && (
                  <p className="results_details_content_box_value">
                    {previewResultData?.dual_nationality_country_ids
                      ?.map((item) => item?.name)
                      .join(', ')}
                  </p>
                )
              }
            />
          )}

          {previewResultData?.date_of_birth && (
            <DetailAssessmentItem
              label={individualFieldName?.dateOfBirth}
              content={moment(previewResultData?.date_of_birth).format('L')}
            />
          )}

          {previewResultData?.residence_country_ids && (
            <DetailAssessmentItem
              label={individualFieldName?.countryOfResidence}
              content={previewResultData?.residence_country_ids?.name}
            />
          )}

          {previewResultData?.birth_country_id && (
            <DetailAssessmentItem
              label={individualFieldName?.countryOfBirth}
              content={countriesOfBirth?.map((item) => {
                if (
                  item.id === parseInt(previewResultData?.birth_country_id, 10)
                ) {
                  return item.name;
                }
                return null;
              })}
            />
          )}

          {previewResultData?.legal_type && (
            <DetailAssessmentItem
              label={individualFieldName?.typeOfLegalAdvice}
              content={previewResultData?.legal_type.replace('_', ' ')}
            />
          )}
        </div>
      </div>

      {keyRiskIndicators.length > 0 && (
        <div className="results_indicators">
          <p className="results_indicators_title">Key Risk Indicators</p>
          <div>
            {keyRiskIndicators?.map((item) => (
              // TODO: wait for api
              <div key={item?.indicator_id} className="results_key_risk">
                <Tooltip title={item?.indicator_name}>
                  <Typography className="results_key_risk_name">
                    {item?.indicator_name}
                  </Typography>
                </Tooltip>
                <div className="results_key_risk_option">
                  {item?.indicator_selected_option?.indicatorOptions ? (
                    <Tooltip title={getIndicatorOptions(item)}>
                      {getIndicatorOptions(item)}
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title={item?.indicator_selected_option?.short_description}
                    >
                      {item?.indicator_selected_option?.short_description}
                    </Tooltip>
                  )}
                </div>
                <div
                  className={`results_${item?.indicator_option_risk_rating
                    ?.split('/')
                    .join('')}`.toLowerCase()}
                >
                  {item?.indicator_option_risk_rating}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <TextWarning>
        <Typography className="preview_result_text_warning">
          PLEASE REVIEW THE RISK ASSESSMENT CAREFULLY
        </Typography>
        <Typography className="preview_result_text_warning">
          ONCE A SCORE HAS BEEN GENERATED, YOU WILL NOT BE ABLE TO EDIT YOUR
          RECORD.
        </Typography>
      </TextWarning>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button color="primary" variant="outlined" onClick={onClose}>
          Close
        </Button>
      </div>
    </PreviewPage>
  );
};

export default PreviewResultIndividual;
