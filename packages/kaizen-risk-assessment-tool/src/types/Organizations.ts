export interface IAddOrganization {
  name: string;
  industry: string;
}

export interface IGetOrganizations {
  offset: number;
  limit: number;
  selectedIndustry: string;
  searchedCharacters: string;
}