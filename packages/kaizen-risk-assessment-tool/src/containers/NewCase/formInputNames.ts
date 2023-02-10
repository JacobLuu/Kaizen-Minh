export const INPUT_NAME = {
  ASSIGNED_USER: 'assigned_user_id',
  REVIEWER_USER: 'reviewer_user_id',
  REASON_FOR_CHANGE: 'reason_for_change'
};

export const CORPORATE_INPUT_NAME = {
  // STEP 2 - Company Status
  COMPANY_INCORPORATED: 'is_company_incorporated',
  COMPANY_NAME: 'company_name',
  COMPANY_NUMBER: 'company_number',
  DATE_OF_INCORPORATION: 'incorporation_date',
  POTENTIAL_CORPORATE_PROHIBITED: 'potential_corporate_prohibited',
  
  // STEP 3 - Details
  CORPORATE_CLIENT_TYPE: 'client_type_id',
  CORPORATE_STATUS: 'corporate_status',
  COUNTRY_OF_INCORPORATION: 'incorporation_country_ids',
  COUNTRY_OF_OPERATION: 'operation_country_ids',
  CORPORATE_BVD_NUMBER_STATUS: 'corporate_bvd_number_status',
  BVD_NUMBER: 'bvd_number',
  INTERNAL_ID: 'internal_id',
  REGULATORY_ID: 'regulatory_id',
  CORPORATE_INDUSTRY_STATUS: 'corporate_industry_status',
  TYPE_OF_LEGAL_ADVICE_OR_SERVICE: 'legal_type',
  LISTED: 'is_listed',
};

export const INDIVIDUAL_INPUT_NAME = {
  // STEP 2 - Company Status
  FULL_LEGAL_NAME: 'legal_name',
  COUNTRY_OF_BIRTH: 'birth_country_id',
  DATE_OF_BIRTH: 'date_of_birth',
  POTENTIAL_INDIVIDUAL_PROHIBITED: 'potential_individual_prohibited',

  // STEP 3 - Details
  KNOW_AS_NAME: 'known_as_name',
  COUNTRY_OF_RESIDENCE: 'residence_country_ids',
  TITLE_ROLE: 'title',
  PROFESSION_SECTOR: 'sector_ids',
  DUAL_NATIONALITY_STATUS: 'dual_nationality_status',
  DUAL_NATIONALITY: 'dual_nationality_country_ids',
  INDIVIDUAL_INDUSTRY_STATUS: 'individual_industry_status',
  TYPE_OF_LEGAL_ADVICE_OR_SERVICE: 'legal_type',
};
