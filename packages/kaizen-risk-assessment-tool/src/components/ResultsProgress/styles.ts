import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Container = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 24px 0 50px 0;

  .results_progress_progressBar {
    width: 100%;
    background-color: #e0e0e0;
    border-radius: 15px;
    position: relative;
  }

  .results_progress_progressBar_fill {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 15px;
    border-radius: 15px;
    transition: width 500ms ease-in-out;
    position: absolute;
    top: 0px;
  }

  .results_progress_progressBar_fill_colors {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .results_progress_progressBar_fill_low {
    height: 15px;
    border-radius: 15px 0 0 15px;
    background-color: #4eac5b;
    transition: width 500ms ease-in-out;
  }

  .results_progress_progressBar_fill_medium {
    height: 15px;
    background-color: #f6c142;
    transition: width 500ms ease-in-out;
  }

  .results_progress_progressBar_fill_high {
    height: 15px;
    border-radius: 0 15px 15px 0;
    background-color: #ea3223;
    transition: width 500ms ease-in-out;
  }

  .dot {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: relative;
    border: 1px solid #002678;
    left: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .dot_progress {
    width: 7px;
    height: 7px;
    background-color: #002678;
    border-radius: 50%;
    display: flex;
    justify-content: center;
  }

  .dot_low {
    width: 12px;
    height: 12px;
    background-color: #4eac5b;
    border-radius: 50%;
    display: inline-block;
    padding-left: 5px;
  }

  .dot_medium {
    width: 12px;
    height: 12px;
    background-color: #f6c142;
    border-radius: 50%;
    display: inline-block;
    padding-left: 5px;
  }

  .dot_high {
    width: 12px;
    height: 12px;
    background-color: #ea3223;
    border-radius: 50%;
    display: inline-block;
    padding-left: 5px;
  }

  .dot_false {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
  }

  .dot_na {
    width: 12px;
    height: 12px;
    background-color: #ea3223;
    border-radius: 50%;
    display: inline-block;
    padding-left: 5px;
  }

  .arrow_up {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid #002678;
    margin: 30px auto 5px auto;
  }

  .riskScore {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    color: #002678;
  }

  .rating {
    display: flex;
    justify-content: space-between;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    margin-top: 10px;
  }
`;
