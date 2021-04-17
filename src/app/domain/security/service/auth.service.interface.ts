export interface AuthServiceInterface {
  login(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
  isAuthenticated(): boolean;
}
