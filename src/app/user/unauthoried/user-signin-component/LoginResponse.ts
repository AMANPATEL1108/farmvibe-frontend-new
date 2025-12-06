export interface User {
  userId: number;
  username: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
