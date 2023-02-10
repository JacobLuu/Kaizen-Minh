import React, { useMemo } from 'react';
import { Typography, Button, Box, Grid } from '@material-ui/core';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import PersonIcon from '@material-ui/icons/Person';
import { useWatch } from 'react-hook-form';
import CancelButton from '../components/CancelButton';
import {
  ASSESSMENT_CATEGORY
} from '../../../constants/common';
import { Wrapper } from './styles';

const Step1EntityType = ({ form, handleNextStep, assessmentCaseData }: any) => {
  const { isValid } = form.formState;

  const selectEntityType = (value) => {
    form.setValue('target_type', value, {
      shouldValidate: true,
    });
  };

  const getTargetType = useWatch({
    control: form.control,
    name: 'target_type',
  });

  const currentEntityType = useMemo(() => {
    switch (assessmentCaseData?.target_type) {
      case ASSESSMENT_CATEGORY.CORPORATE:
        return (
          <Grid item xs={12} sm={12} md={6}>
            <Box
              className={` ${
                getTargetType === ASSESSMENT_CATEGORY.CORPORATE
                  ? 'group_active'
                  : 'group'
              }`}
              onClick={() => selectEntityType(ASSESSMENT_CATEGORY.CORPORATE)}
            >
              <Box className="icon">
                <PeopleAltIcon />
              </Box>
              <Typography className="group_label">Corporate</Typography>
            </Box>
          </Grid>
        );

      case ASSESSMENT_CATEGORY.INDIVIDUAL:
        return (
          <Grid item xs={12} sm={12} md={6}>
            <Box
              className={` ${
                getTargetType === ASSESSMENT_CATEGORY.INDIVIDUAL
                  ? 'group_active'
                  : 'group'
              }`}
              onClick={() => selectEntityType(ASSESSMENT_CATEGORY.INDIVIDUAL)}
            >
              <Box className="icon">
                <PersonIcon />
              </Box>
              <Typography className="group_label">Individual</Typography>
            </Box>
          </Grid>
        );

      default:
        return (
          <>
            <Grid item xs={12} sm={12} md={6}>
              <Box
                className={` ${
                  getTargetType === ASSESSMENT_CATEGORY.CORPORATE
                    ? 'group_active'
                    : 'group'
                }`}
                onClick={() => selectEntityType(ASSESSMENT_CATEGORY.CORPORATE)}
              >
                <Box className="icon">
                  <PeopleAltIcon />
                </Box>
                <Typography className="group_label">Corporate</Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <Box
                className={` ${
                  getTargetType === ASSESSMENT_CATEGORY.INDIVIDUAL
                    ? 'group_active'
                    : 'group'
                }`}
                onClick={() => selectEntityType(ASSESSMENT_CATEGORY.INDIVIDUAL)}
              >
                <Box className="icon">
                  <PersonIcon />
                </Box>
                <Typography className="group_label">Individual</Typography>
              </Box>
            </Grid>
          </>
        );
    }
  }, [assessmentCaseData, getTargetType]);

  const handleSubmit = () => {
    handleNextStep();
  };

  return (
    <Wrapper>
      <Typography className="title">
        What entity is the risk assessment for?
      </Typography>
      <Box className="container">
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Grid container spacing={4}>
            {currentEntityType}
          </Grid>
          <Box className="wrapper_button">
            <CancelButton assessmentCaseData={assessmentCaseData} />
            {isValid && (
              <Button variant="contained" color="primary" type="submit">
                Next
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Wrapper>
  );
};

export default Step1EntityType;
