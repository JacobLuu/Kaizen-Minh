import { ReviewerUser, CreatedUser, AssignedUser } from './UsersList';
import { Country } from './Country';

export interface ClientType {
  full_description: string;
  id: number;
  indicator_id: number;
  is_high_risk: boolean;
  order: number;
  risk_rating: string;
  risk_score: number;
  short_description: string;
}

export interface LegalType {
  label: string;
  order: number;
  value: string;
}

export interface CorporateStatus {
  label: string;
  value: string;
}

export interface ISector {
  label: string;
  order: number;
  value: string;
}

export interface CorporateAssessment {
  assessment_id: number;
  bvd_number: string;
  client_type: ClientType;
  company_name: string;
  company_number: string;
  corporate_status: CorporateStatus;
  created_at: number;
  id: number;
  incorporation_country: Country;
  incorporation_date: number;
  internal_id: string;
  is_company_incorporated: boolean;
  is_listed: boolean;
  legal_type: LegalType;
  operation_country: Country;
  regulatory_id: number;
  updated_at: number;
}

export interface IndividualAssessment {
  legal_name: string;
  known_as_name: string;
  title: string;
  country_id: number;
  sector: string;
  legal_type: string;
  date_of_birth: number;
  assessment_id: number;
  birth_country: Country;
  residency_country: Country;
  dual_nationality_country: Country;
}

export interface IndicatorAssessment {
  id: number;
  indicator_name: string;
  indicator_id: number;
  indicator_option_id: number;
  indicator_option_risk_rating: string;
  indicator_option_risk_score: number;
  indicator_option_short_description: string;
  is_special_selection: boolean;
}

export interface AssessmentResultResponse {
  archived_at: number;
  archived_user: number;
  assessment_indicators: IndicatorAssessment[];
  assigned_user: AssignedUser;
  assigned_user_id: number;
  case_id: string;
  client_name: string;
  client_type: string;
  corporate_assessment: CorporateAssessment;
  created_at: number;
  created_user: CreatedUser;
  created_user_id: number;
  id: number;
  individual_assessment: IndividualAssessment;
  is_archived: boolean;
  is_prohibited: boolean;
  organization_id: number;
  reviewer_user: ReviewerUser;
  reviewer_user_id: number;
  risk_rating: string;
  risk_score: number;
  status: string;
  target_type: string;
  updated_at: number;
}

export interface AssessmentResultState {
  getDataRiskResultsStatus: string;
  assessmentResults: AssessmentResultResponse;
  getAssessmentsCommentsStatus: string;
  getDataAssessmentsHistoriesVersionStatus: string;
  getDataAssessmentsHistoriesStatus: string;
  getDataAssessmentsActivityLogsStatus: string;
  postAssessmentsCommentsStatus: string;
  approveAssessmentResultsStatus: string;
  specialKRIWarnings: any[];
  assessmentsActivityLogs: any[];
  assessmentsComments: any[];
  assessmentsHistoriesVersion: any[];
  assessmentsHistoriesVersionTotal: number;
}

export interface IAssessmentsCommentsState {
  content: string;
}
