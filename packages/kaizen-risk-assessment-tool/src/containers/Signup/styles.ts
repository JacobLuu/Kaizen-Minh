import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { KAIZEN_BLUE_LINK } from '../../themes/colors';

export const Content = styled.div`
  opacity: 0.75;

  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  text-align: center;
  padding: 40px 100px;
  box-sizing: border-box;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
`;

export const GroupInput = styled.div`
  width: 300px;
`;

export const Submit = styled(Button)`
  && {
    background-color: ${KAIZEN_BLUE_LINK};
    padding: 10px 20px;
    text-transform: none;
  }
`;
