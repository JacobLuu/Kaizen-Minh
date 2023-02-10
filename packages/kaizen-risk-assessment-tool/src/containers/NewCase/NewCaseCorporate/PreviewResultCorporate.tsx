import React from 'react';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import { useSelector } from 'react-redux';
import RiskRatingRecommendation from '../../../components/RiskRatingRecommendation';
import DetailAssessmentItem from '../../../components/DetailAssessmentItem';
import { selectNewCaseCorporateStore } from './reducer';
import ResultsProgress from '../../../components/ResultsProgress';
import hookConvertRiskScoreToRating from '../../../utils/hookConvertRiskScoreToRating';
import Tooltip from '../../../components/Tooltip';

import { KAIZEN_RED, KAIZEN_BLUE } from '../../../themes/colors';

import convertTimestamp from '../../../utils/convertTimestamp';
import { PreviewPage, TextWarning } from '../styles';

const PreviewResultCorporate = ({ isProhibitedClient, onClose }: any) => {
  const {
    keyRiskIndicators,
    previewResultData,
    corporateRecommendationSetting,
    corporationFieldName,
  } = useSelector(selectNewCaseCorporateStore);

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
            {previewResultData?.risk_rating && (
              <span className="risk_title_left">
                Risk Rating:
                <p
                  className={`risk_value risk_value_${previewResultData?.risk_rating}`}
                >
                  {previewResultData?.risk_rating}
                </p>
              </span>
            )}

            {previewResultData?.risk_score && (
              <span className="risk_title_left">
                Risk Score:
                <p
                  className={`risk_value risk_value_${hookConvertRiskScoreToRating(
                    previewResultData?.risk_score
                  )}`}
                >
                  {previewResultData?.risk_score}
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
          <Tooltip title={previewResultData?.company_name}>
            <p
              className="risk_title_right"
              style={
                isProhibitedClient
                  ? { color: KAIZEN_RED }
                  : { color: KAIZEN_BLUE }
              }
            >
              {previewResultData?.company_name}
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

      {previewResultData?.risk_score && (
        <ResultsProgress
          dataResult={{ riskScore: previewResultData?.risk_score }}
        />
      )}

      <RiskRatingRecommendation
        riskRating={previewResultData?.risk_rating}
        recommendationSetting={corporateRecommendationSetting}
      />

      <div className="results_risk_assessment">
        <p className="kaizen_blue_text--fw600 results_details_title">Details</p>

        <div className="results_details">
          <DetailAssessmentItem
            label={corporationFieldName.isCompanyIncorporated}
            content={previewResultData?.is_company_incorporated ? 'Yes' : 'No'}
          />

          <DetailAssessmentItem
            label={corporationFieldName.corporationName}
            content={previewResultData?.company_name}
          />

          <DetailAssessmentItem
            label={corporationFieldName.corporationNumber}
            content={previewResultData?.company_number}
          />

          <DetailAssessmentItem
            label={corporationFieldName.countryOfIncorporation}
            content={previewResultData?.incorporation_country_ids?.name}
          />

          <DetailAssessmentItem
            label={corporationFieldName.dateOfIncorporation}
            content={
              previewResultData?.incorporation_date &&
              moment(previewResultData?.incorporation_date).format('L')
            }
          />

          {previewResultData?.bvd_number && (
            <DetailAssessmentItem
              label={corporationFieldName.bvdNumber}
              content={previewResultData?.bvd_number}
            />
          )}

          {previewResultData?.operation_country_ids?.length > 0 && (
            <DetailAssessmentItem
              label={corporationFieldName.countryOfOperation}
              content={previewResultData?.operation_country_ids
                ?.map((item) => item.name)
                .join(', ')}
            />
          )}

          {previewResultData?.corporate_status && (
            <DetailAssessmentItem
              label={corporationFieldName.corporateStatus}
              content={previewResultData?.corporate_status.replace('_', ' ')}
            />
          )}

          {previewResultData?.internal_id && (
            <DetailAssessmentItem
              label={corporationFieldName.internalId}
              content={previewResultData?.internal_id}
            />
          )}

          {previewResultData?.is_listed && (
            <DetailAssessmentItem
              label={corporationFieldName.listed}
              content={previewResultData?.is_listed ? 'Yes' : 'No'}
            />
          )}

          {previewResultData?.incorporation_date && (
            <DetailAssessmentItem
              label={corporationFieldName.companyAge}
              content={
                previewResultData?.incorporation_date &&
                convertTimestamp(
                  moment(previewResultData?.incorporation_date).unix()
                )
              }
            />
          )}

          {previewResultData?.regulatory_id && (
            <DetailAssessmentItem
              label={corporationFieldName.regulatoryId}
              content={previewResultData?.regulatory_id}
            />
          )}

          {previewResultData?.legal_type && (
            <DetailAssessmentItem
              label={corporationFieldName.legalType}
              content={previewResultData?.legal_type.replace('_', ' ')}
            />
          )}

          {previewResultData?.client_type && (
            <DetailAssessmentItem
              label={corporationFieldName.clientType}
              content={previewResultData?.client_type}
            />
          )}
        </div>
      </div>

      {keyRiskIndicators.length > 0 && (
        <div className="results_indicators">
          <p className="results_indicators_title">Key Risk Indicators</p>
          <div>
            {keyRiskIndicators?.map((item) => (
              <div key={item.id} className="results_key_risk">
                <Tooltip title={item?.indicator_name}>
                  <Typography className="results_key_risk_name">
                    {item.indicator_name}
                  </Typography>
                </Tooltip>
                <div className="results_key_risk_option">
                  {item?.indicator_selected_option?.indicatorOptions ? (
                    <Tooltip key={item.id} title={getIndicatorOptions(item)}>
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

export default PreviewResultCorporate;
