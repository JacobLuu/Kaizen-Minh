export interface CorporateProhibitedClients {
  limit: number;
  offset: number;
}

export interface AddCorporateProhibitedClients {
  company_name: string;
  company_number: string;
  date_of_incorporation: number;
}

export interface EditCorporateProhibitedClients {
  data: AddCorporateProhibitedClients;
  id: number;
  limit: number;
  offset: number;
}

export interface DeleteCorporateProhibitedClients {
  id: number;
}
