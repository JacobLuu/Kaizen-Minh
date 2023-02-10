export interface IGetUsers {
  offset?: number;
  limit?: number;
  selectedOrganization?: number;
  selectedRole?: string;
  searchedCharacters?: string;
  userStatus?: string
}

export interface IAddUser {
  email: string;
  role: string;
  organization_id: number;
}

export interface IEditUser {
  role: string;
  organization_id: number;
}

export interface ReviewerUser {
  id: number;
  name: string;
}

export interface CreatedUser {
  id: number;
  name: string;
}

export interface AssignedUser {
  id: number;
  name: string;
}
