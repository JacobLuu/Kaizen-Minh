export interface IndividualProhibitedClients {
  limit: number;
  offset: number;
}

export interface AddIndividualProhibitedClients {
  date_of_birth: number;
  full_name: string;
  identification_number: string;
}

export interface EditIndividualProhibitedClients {
  data: AddIndividualProhibitedClients;
  id: number;
  limit: number;
  offset: number;
}

export interface DeleteIndividualProhibitedClients {
  id: number;
}
