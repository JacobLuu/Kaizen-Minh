import styled from 'styled-components';
import Card from '@material-ui/core/Card';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
`;

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
`;

export const Box = styled(Card)`
  width: 768px;
  height: auto;
  @media (max-width: 768px) {
    width: 100%;
  }
  box-sizing: border-box;
  margin: auto;
  padding-bottom: 50px;
`;
