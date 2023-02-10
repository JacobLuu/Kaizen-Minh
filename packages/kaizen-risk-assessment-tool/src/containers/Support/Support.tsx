import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Wrapper } from './styles';
import FAQ from '../FAQ/FAQ';

function Support() {
  const [isOpenFAQ, setIsOpenFAQ] = React.useState(true);
  return (
    <>
      {isOpenFAQ && <Wrapper>
        <Typography className="wrapper_title">
          SUPPORT
        </Typography>
        <Typography className="wrapper_subtitle">What can we do for you?</Typography>
        <Box className="rounded-box">
          <Box>
            <Typography className="rounded-box_title">FAQ</Typography>
            <Typography className="rounded-box_subtitle">
              What are the user roles and permissions for the Dashboard?
            </Typography>
            <Typography className="rounded-box_subtitle">
              How can I deactivate a user?
            </Typography>
          </Box>
          <Button color='primary' variant='outlined' onClick={()=>{setIsOpenFAQ(false)}}>
              View more
          </Button>
        </Box>
        <Box className="rounded-box">
          <Box>
            <Typography className="rounded-box_title">User Guide</Typography>
            <Typography className="rounded-box_subtitle">
              View for a complete guide in using Kaizen Compliance Solutions.
            </Typography>
          </Box>
          <Button color='primary' variant='outlined'>
              View PDF
          </Button>
        </Box>
        <Box className="rounded-box">
          <Box>
            <Typography className="rounded-box_title">Contact us</Typography>
            <Typography className="rounded-box_subtitle">
              support@company.com
            </Typography>
          </Box>
        </Box>
      </Wrapper>}
      {!isOpenFAQ && <FAQ
        isBackToSupport={isOpenFAQ}
        handleBackToSupport={setIsOpenFAQ}/>}
    </>
  );
}

export default React.memo(Support);
