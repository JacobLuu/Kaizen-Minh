export interface IPostDataNewCase {
  target_type: string;
  assigned_user_id: number;
  reviewer_user_id: number;
  risk_rating: string;
  corporate: {
    is_company_incorporated: boolean;
    company_name: number;
    client_type_id: number;
    incorporation_country_ids: number;
    incorporation_date: number;
    internal_id: number;
    legal_type: string;
    company_number: number;
    corporate_status: string;
    operation_country_ids: number;
    bvd_number: string;
    regulatory_id: number;
    is_listed: boolean;
  };
  risk_score: number;
  assessment_indicators: IAssessmentIndicators;
}

export interface IAssessmentIndicators {
  indicator_id: number;
  indicator_options: IIndicatorOptions
}

export interface IIndicatorOptions {
  indicator_option_id: number;
  indicator_option_risk_rating: string;
  indicator_option_risk_score: number
}