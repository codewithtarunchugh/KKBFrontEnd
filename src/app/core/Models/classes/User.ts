export class User {
  userName: string;
  password?: string;
  name: string;
  constructor() {
    this.userName = '';
    this.name = '';
  }
}
export class RefreshToken {
  jwtToken: string='';
  refreshToken: string='';
}
