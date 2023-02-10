import React from 'react';
import Button from '@material-ui/core/Button';
import history from '../../../../utils/history';
import CLIENT_PATH from '../../../../constants/clientPath';
import { ASSESSMENT_STATUS } from '../../../../constants/common';

const CancelButton = ({ assessmentCaseData }: any) => {
  if (assessmentCaseData?.status === ASSESSMENT_STATUS.PENDING_REVIEW) {
    return (
      <Button
        color="primary"
        variant="text"
        onClick={() =>
          history.push({
            pathname: `${CLIENT_PATH.RISK_RESULT}/${assessmentCaseData?.id}`,
          })
        }
        style={{ marginRight: '15px' }}
      >
        Cancel
      </Button>
    );
  }
};

export default CancelButton;
