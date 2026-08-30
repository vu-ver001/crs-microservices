// path: crs-frontend/src/types/auth.ts
// purpose: interface khop voi LoginRequestDTO/LoginResponseDTO ben auth-service (Buoi 4 & Buoi 9)
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  userId: number;
  token: string;
  username: string;
  role: 'ADMIN' | 'STUDENT';
}
