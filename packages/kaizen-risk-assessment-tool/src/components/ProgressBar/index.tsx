import React from 'react';
import {
  LinearProgressProps,
} from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import {
  Progress,
} from './styles';

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number },
) {
  const { value } = props;
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <Progress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography>{`${Math.round(value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export interface IProgress {
  progressValue: number;
}

const ProgressBar = (props:IProgress) => {
  const { progressValue } = props;
  return (
    <div>
      <LinearProgressWithLabel thickness={4} value={Math.round(progressValue * 100)} />
    </div>
  );
};

export default ProgressBar;