import styled from 'styled-components';
import HelpIcon from '@material-ui/icons/Help';
import Dialog from '@material-ui/core/Dialog';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import StepConnector from '@material-ui/core/StepConnector';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import DialogComponent from '../../components/Dialog';

import {
  KAIZEN_GREY,
  KAIZEN_WHITE,
  KAIZEN_BLUE_LINK,
  KAIZEN_BLUE,
  KAIZEN_BLACK,
  KAIZEN_PRIMARY_COLOR,
  KAIZEN_RED,
  KAIZEN_TEXT_GRAY,
  KAIZEN_RATING_LOW,
  KAIZEN_RATING_MEDIUM,
  KAIZEN_RATING_HIGH,
} from '../../themes/colors';

export const StepperConnector = withStyles({
  alternativeLabel: {
    top: 15,
    left: 'calc(-50% + 32px)',
    right: 'calc(50% + 32px)',
  },
  active: {
    '& $line': {
      border: `1px solid ${KAIZEN_BLUE}`,
    },
  },
  completed: {
    '& $line': {
      border: `1px solid ${KAIZEN_BLUE}`,
    },
  },
  line: {
    border: '1px dashed #E4E7ED',
  },
})(StepConnector);

export const StepIconStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    color: KAIZEN_BLUE,
  },
  active: {
    width: 32,
    height: 32,
    border: `1px solid ${KAIZEN_BLUE}`,
    borderRadius: '50%',
    color: KAIZEN_WHITE,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: KAIZEN_BLUE,
  },
  completed: {
    width: 32,
    height: 32,
    border: `1px solid ${KAIZEN_BLUE}`,
    borderRadius: '50%',
    color: KAIZEN_WHITE,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: KAIZEN_BLUE,
  },
  circle: {
    width: 32,
    height: 32,
    border: `1px solid ${KAIZEN_BLUE}`,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const Group = styled.div`
  .MuiFormGroup-root {
    flex-direction: row;
  }

  .MuiRadio-colorSecondary.Mui-checked {
    color: ${KAIZEN_BLUE_LINK};
  }

  .radio_group {
    .MuiFormControlLabel-root:last-child {
      margin-right: 0px;
    }
  }

  .radio_group_listed {
    padding: 10px 0;
    margin-left: 10px;
    box-sizing: border-box;
    .MuiFormControlLabel-root:last-child {
      margin-right: 0px;
    }
  }
`;

export const Wrapper = styled.div`
  padding: 45px 85px;
  margin-bottom: 20px;
  background-color: white;
  border-radius: 10px;
  box-sizing: border-box;
  @media only screen and (max-width: 1200px) {
    padding: 45px 25px;
  }

  .container {
    display: flex;
    flex-direction: column;
    /* align-items: center; */
  }
  .wrapper_button {
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;
  }

  .wrapper_corporation_title {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .wrapper_details {
    margin: 30px 0 10px;
  }

  .wrapper_title {
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 45px;
    padding-bottom: 30px;
    color: ${KAIZEN_PRIMARY_COLOR};
    padding-bottom: 30px;
  }

  .wrapper_stepper {
    max-width: 700px;
    margin: auto;
  }

  .wrapper_content {
    @media only screen and (max-width: 945px) {
      padding-right: 0px;
    }
    padding-right: 60px;
    box-sizing: border-box;
  }

  .wrapper_content_listed {
    display: flex;
    align-items: center;
  }

  .wrapper_content_space {
    margin-bottom: 25px;
  }

  .wrapper_content_title_assign {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    margin: 100px 0 10px 0;
    color: ${KAIZEN_BLUE};
  }

  .wrapper_content_title_reviewer {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    margin: 30px 0 10px 0;
    color: ${KAIZEN_BLUE};
  }

  .wrapper_content_title_input {
    display: flex;
    align-items: center;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.15px;
    color: ${KAIZEN_TEXT_GRAY};
    margin-bottom: 5px;
    height: 42px;
  }

  .wrapper_content_company_age {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.15px;
    color: ${KAIZEN_BLUE};
    span:first-child {
      padding: 0 5px 0 0;
    }
    span {
      font-weight: bold;
      padding: 0 5px;
    }
  }

  .wrapper_result {
    margin: 50px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .description {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.15px;
    color: rgba(0, 0, 0, 0.75);
    margin: 0;
  }

  .MuiStepIcon-root.MuiStepIcon-active {
    color: ${KAIZEN_BLUE};
  }

  .MuiStepper-root {
    padding: 0;
  }

  .MuiStepLabel-iconContainer {
    padding-right: 15px;
  }

  .MuiStepContent-root {
    margin-top: 0px;
    padding-top: 10px;
    padding-left: 30px;
    border-left: 1px solid ${KAIZEN_BLUE};
  }

  .MuiStepContent-last {
    border-left: none;
  }

  .MuiStepConnector-lineVertical {
    border-left: 1px solid ${KAIZEN_BLUE};
  }

  .MuiStepLabel-label.MuiStepLabel-completed {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.1px;
    color: ${KAIZEN_BLUE};
  }

  .MuiStepLabel-label.MuiStepLabel-active {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.1px;
    color: ${KAIZEN_BLUE};
  }

  .MuiStepConnector-vertical {
    padding: 0px;
  }
`;

export const RickIndicator = styled.div`
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  width: 1000px;
  margin: 30px auto;

  @media only screen and (max-width: 1300px) {
      width: 700px;
  }

  @media only screen and (max-width: 1000px) {
      width: 400px;
  }
  
  .MuiOutlinedInput-root {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    color: ${KAIZEN_BLUE};
  }

  .MuiOutlinedInput-root.Mui-error {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: ${KAIZEN_RED};
    svg {
      fill: ${KAIZEN_RED};
    }
  }

  .risk_rating_ {
    min-width: 125px;
  }

  .risk_rating_false {
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    text-transform: uppercase;
    letter-spacing: 0.15px;
    color: ${KAIZEN_WHITE};
    margin-left: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 50px;
    text-align: center;
    padding: 5px 10px;
    margin-top: ${({ description }) => description && '-24px'};
    border-radius: 5px;
    background-color: ${KAIZEN_GREY};
  }

  .risk_rating_low {
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    text-transform: uppercase;
    letter-spacing: 0.15px;
    color: ${KAIZEN_WHITE};
    margin-left: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 50px;
    text-align: center;
    padding: 5px 10px;
    margin-top: ${({ description }) => description && '-24px'};
    border-radius: 5px;
    background-color: ${KAIZEN_RATING_LOW};
  }

  .risk_rating_medium {
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    text-transform: uppercase;
    letter-spacing: 0.15px;
    color: ${KAIZEN_WHITE};
    margin-left: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 50px;
    text-align: center;
    padding: 5px 10px;
    margin-top: ${({ description }) => description && '-24px'};
    border-radius: 5px;
    background-color: ${KAIZEN_RATING_MEDIUM};
  }

  .risk_rating_high {
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    text-transform: uppercase;
    letter-spacing: 0.15px;
    color: ${KAIZEN_WHITE};
    margin-left: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 50px;
    text-align: center;
    padding: 5px 10px;
    margin-top: ${({ description }) => description && '-24px'};
    border-radius: 5px;
    background-color: ${KAIZEN_RATING_HIGH};
  }

  .risk_rating_na {
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    text-transform: uppercase;
    letter-spacing: 0.15px;
    color: ${KAIZEN_WHITE};
    margin-left: 25px;
    display: inline;
    width: 100px;
    height: 50px;
    text-align: center;
    padding: 5px 10px;
    margin-top: ${({ description }) => description && '-24px'};
    border-radius: 5px;
    background-color: ${KAIZEN_RED};
  }

  .empty {
    margin-left: 25px;
    display: block;
    width: 100px;
    padding: 5px 10px;
    border-radius: 5px;
    text-align: center;
    svg {
      fill: #fb0000;
    }
  }
`;

export const KeyRiskTitle = styled.div`
  display: flex;
  width: 400px;
  margin-top: ${({ description }) => description && '-24px'};
  align-items: center;
  margin-right: 20px;
  word-break: break-word;
  @media only screen and (max-width: 1300px) {
    width: 200px;
    word-break: break-word;
  }

  p {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    color: ${KAIZEN_TEXT_GRAY};
    box-sizing: border-box;
  }
`;

export const Help = styled(HelpIcon)`
  && {
    font-size: 16px;
    margin-left: 10px;
    color: ${KAIZEN_BLUE};
  }
`;

export const ModalNewCaseCorporate = styled(Dialog)`
  .wrapper {
    padding: 20px 40px;
    max-width: 735px;
    background-color: ${KAIZEN_WHITE};
  }

  .modal_content {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 19px;
    text-align: justify;
    color: #4d4d4d;
    background-color: #f3f3f3;
    padding: 0 5px;
    box-sizing: border-box;
    height: 300px;
    overflow: auto;
  }

  .hearder {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
  }

  .hearder_title {
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    display: flex;
    align-items: center;
    text-align: center;
    color: ${KAIZEN_BLACK};
  }

  .sub_text {
    padding: 10px;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    text-align: justify;
    color: #4d4d4d;
  }

  .footer {
    .button_cancel {
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 24px;
      display: flex;
      align-items: center;
      text-align: center;
      letter-spacing: 0.15px;
      color: #a3a0a0;
      width: 150px;
    }

    .button_agree {
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 24px;
      display: flex;
      align-items: center;
      text-align: center;
      letter-spacing: 0.15px;
      background-color: ${KAIZEN_BLUE_LINK};
      color: ${KAIZEN_WHITE};
      width: 150px;
    }
    .MuiButton-root {
      text-transform: none;
    }

    .button_agree.Mui-disabled {
      background-color: #a3a0a0;
    }
    display: flex;
    justify-content: space-around;
  }
`;

export const PreviewPage = styled.div`
  padding: 40px 0;

  .results {
    padding: 30px;
    margin-bottom: 20px;
    background-color: white;
    border-radius: 10px;
    box-sizing: border-box;
  }

  .result_button {
    margin-left: 10px !important;
    padding: 6px 16px !important ;
  }

  .result_title_box {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }

  .risk_results_detail_paper {
    padding: 20px;
  }

  .results_back {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
    color: #757575;
  }

  .results_back_icon {
    margin-right: 5px;
    font-weight: bold;
    color: #002678;
  }

  .results_header {
    display: flex;
    justify-content: space-between;
  }

  .results_header_button button {
    margin-left: 10px;
    background-color: transparent;
    color: #2196f3;
  }

  .results_header_button button:hover {
    background-color: transparent;
  }

  .results_title {
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 36px;
    color: #002678;
  }

  .risk_title_left {
    margin: 10px 0 10px;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 28px;
    color: #002678;
    display: flex;
  }

  .risk_title_right {
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 36px;
    width: fit-content;
    overflow-wrap: anywhere;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: 75px;
    text-align: end;
  }

  .risk_warning {
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    color: ${KAIZEN_RED};
    margin-top: 10px;
    margin-left: 10px;
  }

  .risk_value {
    letter-spacing: 1px;
    align-items: center;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 28px;
    margin-left: 10px;
    text-transform: capitalize;
  }

  .risk_value_high {
    color: #ea3b3b;
  }

  .risk_value_medium {
    color: #ffa400;
  }

  .risk_value_low {
    color: #44c662;
  }

  .results_companyName {
    font-style: normal;
    font-weight: 600;
    font-size: 22px;
    line-height: 28px;
    color: #002678;
    padding-bottom: 30px;
    border-bottom: 1px solid #e7ebf2;
  }

  .results_show_riskScore_title {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    color: #80869b;
    margin: 15px 0;
  }

  .results_show_riskScore_title span {
    text-transform: capitalize;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    padding: 0 5px;
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
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    color: #002678;
  }

  .results_show_riskScore_subtitle {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: rgba(0, 0, 0, 0.8);
    margin: 20px 0 20px;
  }

  .results_risk_assessment_title {
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 21px;
    letter-spacing: 0.1px;
    margin: 20px 0;
  }

  .results_risk_assessment {
    margin: 20px 0 40px 0;
    padding: 30px;
    border-radius: 15px;
    background: #f4f4f4;
  }

  .results_assessment {
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 21px;
    letter-spacing: 0.1px;
    color: #000000;
  }

  .results_assessment::first-letter {
    text-transform: uppercase;
  }

  .results_details {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    flex-direction: row;
  }

  .results_details_title {
    font-size: 20px;
  }

  .results_details_content {
    flex: 0 0 33.3%;
    margin: 20px 0;
  }

  .results_details_content_box_name {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    text-transform: capitalize;
    margin-bottom: 10px;
    color: #787878;
  }

  .results_details_content_box_value {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #002678;
    text-transform: capitalize;
    word-break: break-word;
  }

  .results_indicators_title {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 21px;
    letter-spacing: 0.1px;
    color: #002678;
    margin-bottom: 30px;
  }

  .results_indicators {
    display: flex;
    flex-direction: column;
  }

  .MuiAvatar-root {
    width: 60px;
    height: 60px;
  }

  .key_risk_indicators_action {
    display: flex;
    justify-content: flex-end;
    margin: 50px 0 20px 0;
  }

  .results_key_risk {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 50px;
    padding: 0 45px;
  }

  .results_key_risk:nth-of-type(even) {
    background-color: #f4f4f4;
  }

  .results_key_risk_name {
    width: 400px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: #787878;
    max-width: 400px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  .results_key_risk_option {
    box-sizing: border-box;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    padding: 0 20px;
    letter-spacing: 0.15px;
    width: 100%;
    color: #002678;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  .results_key_risk_rating {
    width: 100px;
  }

  .results_low {
    display: inline-block !important;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    text-transform: uppercase;
    line-height: 25px;
    letter-spacing: 0.15px;
    color: #ffffff;
    display: inline;
    min-width: 80px;
    text-align: center;
    border-radius: 4px;
    background-color: #44c662;
  }

  .results_medium {
    display: inline-block !important;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    text-transform: uppercase;
    line-height: 25px;
    letter-spacing: 0.15px;
    color: #ffffff;
    display: inline;
    min-width: 80px;
    text-align: center;
    border-radius: 4px;
    background-color: #ffa400;
  }

  .results_false {
    display: inline-block !important;
    text-transform: uppercase;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 25px;
    letter-spacing: 0.15px;
    color: #ffffff;
    display: inline;
    text-align: center;
    min-width: 80px;
    border-radius: 4px;
  }

  .results_na {
    display: inline-block !important;
    text-transform: uppercase;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 25px;
    letter-spacing: 0.15px;
    display: inline;
    text-align: center;
    min-width: 80px;
    border-radius: 4px;
    background-color: ${KAIZEN_GREY};
    color: ${KAIZEN_WHITE};
  }

  .results_high {
    display: inline-block !important;
    text-transform: uppercase;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 25px;
    letter-spacing: 0.15px;
    display: inline;
    text-align: center;
    min-width: 80px;
    border-radius: 4px;
    background-color: ${KAIZEN_RATING_HIGH};
    color: ${KAIZEN_WHITE};
  }

  .results_reviewer_title {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.01em;
    color: #80869b;
    padding-bottom: 10px;
  }
`;

export const ModalNewIndividual = styled(Dialog)`

  .wrapper{
    padding:20px 40px;
    max-width: 735px;
    background-color: ${KAIZEN_WHITE};
  }

  .modal_content{
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 19px;
    text-align: justify;
    color: #4D4D4D;
    background-color: #F3F3F3;
    padding:0 5px;
    box-sizing: border-box;
    height: 300px;
    overflow: auto;
  }

  .hearder{
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
  }

  .hearder_title {
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    display: flex;
    align-items: center;
    text-align: center;
    color: ${KAIZEN_BLACK}
  }

  .sub_text{
    padding:10px
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    text-align: justify;
    color: #4D4D4D;
  }

  .footer{

    .button_cancel{
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 24px;
      display: flex;
      align-items: center;
      text-align: center;
      letter-spacing: 0.15px;
      color: #A3A0A0;
      width: 150px;
    }

    .button_agree{
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 24px;
      display: flex;
      align-items: center;
      text-align: center;
      letter-spacing: 0.15px;
      background-color: ${KAIZEN_BLUE_LINK};
      color: ${KAIZEN_WHITE};
      width: 150px;
    }
    .MuiButton-root{
      text-transform: none;
    }


    .button_agree.Mui-disabled{
      background-color: #A3A0A0;
    }
    display: flex;
    justify-content: space-around;
  }
`;

export const TextWarning = styled.div`
  margin: 100px 0 130px 0;

  .preview_result_text_warning {
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;
    color: ${KAIZEN_RED};
  }
`;

export const WarningIcon = styled(ErrorOutlineIcon)`
  margin-right: 10px;
  color: ${KAIZEN_RED};
`;

export const SpecialKRIWarningBox = styled.div`
  display: flex;
  padding: 8px 20px;
  margin-right: 10px;
  border: 1px solid #ea3b3b;
  border-radius: 4px;
  width: fit-content;
  margin-top: 10px;

  .question_category_name {
    display: flex;
    align-items: center;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 15px;
    color: #ea3b3b;
  }

  .question_category_warning_icon {
    width: 22px;
    height: 22px;
    margin-left: 10px;
  }
`;

export const ConfirmSaveDraftDialog = styled(DialogComponent)`
  .action_box {
    float: right;
  }
`;
