import React from 'react';
import { RISK_SCORES_RANGE } from '../../constants/common';
import { Container } from './styles';

interface ResultsProgressProps {
  dataResult: {
    riskScore: number;
  };
}

const ResultsProgress = (props: ResultsProgressProps) => {
  const { dataResult } = props;
  return (
    <Container>
      <div className="results_progress_progressBar">
        <div className="results_progress_progressBar_fill_colors">
          <span
            className="results_progress_progressBar_fill_low"
            style={{
              width: `${
                (RISK_SCORES_RANGE.LOW_RANGE / RISK_SCORES_RANGE.TOTAL_SCORE) *
                100
              }%`,
            }}
          />
          <span
            className="results_progress_progressBar_fill_medium"
            style={{
              width: `${
                (RISK_SCORES_RANGE.MEDIUM_RANGE /
                  RISK_SCORES_RANGE.TOTAL_SCORE) *
                100
              }%`,
            }}
          />
          <span
            className="results_progress_progressBar_fill_high"
            style={{
              width: `${
                (RISK_SCORES_RANGE.HIGH_RANGE / RISK_SCORES_RANGE.TOTAL_SCORE) *
                100
              }%`,
            }}
          />
        </div>

        <span
          className="results_progress_progressBar_fill"
          style={{
            width: `${
              (dataResult?.riskScore / RISK_SCORES_RANGE.TOTAL_SCORE) * 100
            }%`,
          }}
        >
          {dataResult?.riskScore != null && (
            <span className="dot">
              <span className="dot_progress">
                <div className="riskScore">
                  <div className="arrow_up" />
                  {dataResult?.riskScore}
                </div>
              </span>
            </span>
          )}
        </span>
      </div>
      <div className="rating">
        <span>0</span>
        <span>5</span>
      </div>
    </Container>
  );
};

export default ResultsProgress;
