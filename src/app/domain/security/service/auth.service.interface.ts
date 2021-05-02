export interface AuthServiceInterface {
  login(email: string, password: string): void;
  logout(): void;
  isAuthenticated(): boolean;
}
