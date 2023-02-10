const getReviewerUser = ({
  assessmentCaseData,
  generalSettings,
  assignedUserId,
}: any) => {
  if (generalSettings?.is_require_manager_review) {
    if (Object.keys(assessmentCaseData)?.length > 0 && assessmentCaseData.reviewer_user) {
      return assessmentCaseData.reviewer_user;
    }
    return undefined;
  }

  return assignedUserId;
};

export default getReviewerUser;
