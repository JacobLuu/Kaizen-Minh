import React, { useState } from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import { KAIZEN_BACKGROUND_COLOR, KAIZEN_WHITE } from '../../themes/colors';

export interface IFAQItem {
  id: number;
  title: string;
  content: string;
}

export default function FAQItem(props: IFAQItem) {
  const { title, content, id } = props;
  const [isAnswersCollapsed, setIsAnswersCollapsed] = useState(true);
  return (
    <div>
      <Box
        id={`${id}`}
        className="rounded-box"
        onClick={() => setIsAnswersCollapsed((prevState) => !prevState)}
        style={
          isAnswersCollapsed
            ? { background: KAIZEN_WHITE }
            : { background: KAIZEN_BACKGROUND_COLOR }
        }
      >
        <Box>
          <Typography className="rounded-box_title">{title}</Typography>
          {!isAnswersCollapsed && (
            <Typography className="rounded-box_subtitle">{content}</Typography>
          )}
        </Box>
        <Button
          className="rounded-box_text-button"
          style={
            isAnswersCollapsed
              ? { background: KAIZEN_BACKGROUND_COLOR }
              : { background: KAIZEN_WHITE }
          }
        >
          {isAnswersCollapsed ? (
            <KeyboardArrowRightRoundedIcon
              style={{ cursor: 'pointer' }}
              onClick={(event) => {
                event.stopPropagation();
                setIsAnswersCollapsed((prevState) => !prevState);
              }}
            />
          ) : (
            <KeyboardArrowDownRoundedIcon
              style={{ cursor: 'pointer' }}
              onClick={(event) => {
                event.stopPropagation();
                setIsAnswersCollapsed((prevState) => !prevState);
              }}
            />
          )}
        </Button>
      </Box>
    </div>
  );
}
