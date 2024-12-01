export interface IUser {
  email: string;
  password?: string;
  name: string;
}

export interface IUserResponse {
  id?: number;
  name?: string;
  email?: string;
  phoneNumber?: string;
  roles: string[];
  jwtToken: string;
  refreshToken: string;
}
