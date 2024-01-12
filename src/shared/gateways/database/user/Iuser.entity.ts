export interface IUser {
  id: number;
  email: string;
  password: string;
  blocked: boolean;
  attempts: number;
}
