import React from 'react';

interface IDetailAssessmentItem {
  label: string;
  content: any;
}

const DetailAssessmentItem = ({ label, content }: IDetailAssessmentItem) => {
  return (
    <div className="results_details_content">
      <p className="results_details_content_box_name">{label}</p>
      <p className="results_details_content_box_value">{content}</p>
    </div>
  );
};

export default DetailAssessmentItem;
