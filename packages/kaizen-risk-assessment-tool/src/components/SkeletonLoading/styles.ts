import styled from 'styled-components';

export const PieChartContainer = styled.div`
  width: 475px;
  height: 233px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 20px;
  .annotation {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 45%;
    height: 77%;
  }

  .pie {
    width: 50%;
    height: 100%;
  }
`;

export const BarChartContainer = styled.div`
  width: 98%;
  .bar-chart-row {
    width: 100%;
    height: 42px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    margin-bottom: 27px;
  }

  .left-row {
    max-width: 160px;
    width: 160px;
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    margin-right: 20px;
    align-items: center;
    .avatar {
      width: 50px;
      height: 40px;
    }
    .name {
      width: 80%;
      height: 100%;
      display: flex;
      align-items: center;
      margin-left: 10px;
    }
  }

  .progress {
    width: 75%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;