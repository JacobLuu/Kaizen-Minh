import styled from 'styled-components';
import LinearProgress from '@material-ui/core/LinearProgress';

// eslint-disable-next-line import/prefer-default-export
export const Progress = styled(LinearProgress)`
  &&.MuiLinearProgress-root {
    height: 8px;
    border-radius: 5px;

    .MuiLinearProgress-bar{
    border-radius: 5px;
  }
  }
`;
