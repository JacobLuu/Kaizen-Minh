import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';
import { KAIZEN_LIGHT_GRAY } from '../../themes/colors';

// eslint-disable-next-line import/prefer-default-export
export const Container = styled(FormControl)`
  .description {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: ${KAIZEN_LIGHT_GRAY};
  }
`;
