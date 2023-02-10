import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { KAIZEN_BLUE, KAIZEN_WHITE } from '../../themes/colors';

export const StyledButton = styled(Button)`
  && {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    background-color: ${(props) => (props.link && 'transparent')};
    margin: ${(props) => props.margin};
    padding: ${(props) => props.padding || '15px 35px'};
    float: ${(props) => (props.right && 'right')};
    border-radius: 50px;
    height: 50px;
    box-sizing: border-box;
  }
  && .MuiButton-label{
    color: ${(props) => (props.link ? KAIZEN_BLUE : KAIZEN_WHITE)};
  }

  &&:hover {
    background-color: ${(props) => (props.link && 'transparent')};
  }
`;

export default StyledButton;
